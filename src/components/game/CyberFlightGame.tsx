"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";
import {
  Play,
  RotateCcw,
  Trophy,
  Shield,
  Zap,
  Gamepad2,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  playCyberClick,
  playHoverTick,
  playGemCollectSound,
  playCrashSound,
  playGameOverSound,
  toggleMuteSound,
  getIsMuted,
} from "@/lib/sound/cyberSound";

interface GameObject {
  id: number;
  x: number;
  y: number;
  z: number;
  type: "gem" | "obstacle";
  scale: number;
  rotSpeed: number;
  collected?: boolean;
}

/** 3D Player Stealth Craft */
function PlayerShip({
  targetPos,
  shield,
}: {
  targetPos: { x: number; y: number };
  shield: number;
}) {
  const shipRef = useRef<THREE.Group>(null);
  const thrusterRef = useRef<THREE.PointLight>(null);

  useFrame((state, delta) => {
    if (!shipRef.current) return;

    // Smooth inertia lerp toward target cursor
    shipRef.current.position.x = THREE.MathUtils.damp(
      shipRef.current.position.x,
      targetPos.x,
      12,
      delta
    );
    shipRef.current.position.y = THREE.MathUtils.damp(
      shipRef.current.position.y,
      targetPos.y,
      12,
      delta
    );

    // Realistic banking roll when turning
    const deltaX = targetPos.x - shipRef.current.position.x;
    shipRef.current.rotation.z = THREE.MathUtils.damp(
      shipRef.current.rotation.z,
      -deltaX * 0.8,
      10,
      delta
    );
    shipRef.current.rotation.x = THREE.MathUtils.damp(
      shipRef.current.rotation.x,
      (targetPos.y - shipRef.current.position.y) * 0.4,
      10,
      delta
    );

    // Engine thruster pulse
    if (thrusterRef.current) {
      thrusterRef.current.intensity = 2 + Math.sin(state.clock.elapsedTime * 20) * 1;
    }
  });

  return (
    <group ref={shipRef} position={[0, 0, 0]}>
      {/* Ship Main Hull (Stealth Dart) */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.55, 1.6, 4]} />
        <meshStandardMaterial
          color="#0F172A"
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Cockpit Canopy */}
      <mesh position={[0, 0.15, -0.1]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.22, 0.8, 4]} />
        <meshStandardMaterial
          color="#38BDF8"
          emissive="#38BDF8"
          emissiveIntensity={0.8}
          roughness={0.1}
        />
      </mesh>

      {/* Neon Wing Trim Left */}
      <mesh position={[-0.45, 0, 0.3]} rotation={[0, 0, -0.4]}>
        <boxGeometry args={[0.08, 0.04, 0.9]} />
        <meshBasicMaterial color="#4FD1C5" />
      </mesh>

      {/* Neon Wing Trim Right */}
      <mesh position={[0.45, 0, 0.3]} rotation={[0, 0, 0.4]}>
        <boxGeometry args={[0.08, 0.04, 0.9]} />
        <meshBasicMaterial color="#4FD1C5" />
      </mesh>

      {/* Engine Plasma Thruster */}
      <mesh position={[0, 0, 0.85]}>
        <cylinderGeometry args={[0.15, 0.22, 0.25, 16]} />
        <meshBasicMaterial color="#4FD1C5" />
      </mesh>

      {/* Engine Light */}
      <pointLight
        ref={thrusterRef}
        position={[0, 0, 1.1]}
        color="#4FD1C5"
        intensity={3}
        distance={4}
      />

      {/* Shield Dome Aura */}
      {shield > 1 && (
        <mesh scale={1.2}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial
            color="#4FD1C5"
            wireframe
            transparent
            opacity={shield === 3 ? 0.2 : 0.1}
          />
        </mesh>
      )}
    </group>
  );
}

/** 3D Tunnel Grid Rings */
function TunnelRings({ speed }: { speed: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const ringCount = 14;

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child) => {
      child.position.z += speed * delta;
      if (child.position.z > 5) {
        child.position.z -= ringCount * 4;
      }
      child.rotation.z += delta * 0.1;
    });
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: ringCount }).map((_, i) => (
        <mesh key={i} position={[0, 0, -i * 4]}>
          <torusGeometry args={[3.8, 0.025, 8, 32]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? "#4FD1C5" : "#1E293B"}
            transparent
            opacity={0.35}
          />
        </mesh>
      ))}
    </group>
  );
}

const GAME_SPEED = 14;

/** Interactive World with Collision Detection */
function GameWorld({
  gameState,
  onCollectGem,
  onHitObstacle,
  playerPos,
  shield,
}: {
  gameState: "idle" | "playing" | "gameover";
  onCollectGem: () => void;
  onHitObstacle: () => void;
  playerPos: { x: number; y: number };
  shield: number;
}) {
  const [objects, setObjects] = useState<GameObject[]>([]);
  const nextId = useRef(1);
  const lastSpawnTime = useRef(0);

  // Reset or run spawn loop
  useFrame((state, delta) => {
    if (gameState !== "playing") return;

    const t = state.clock.getElapsedTime();

    // Spawn new obstacles & gems every 0.65s
    if (t - lastSpawnTime.current > 0.65) {
      lastSpawnTime.current = t;
      const isGem = Math.random() > 0.45;
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 2.2 + 0.4;

      const newObj: GameObject = {
        id: nextId.current++,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius * 0.7,
        z: -42,
        type: isGem ? "gem" : "obstacle",
        scale: isGem ? 0.35 : 0.5,
        rotSpeed: Math.random() * 2 + 1,
      };

      setObjects((prev) => [...prev.slice(-25), newObj]);
    }

    // Move objects forward and check collisions
    setObjects((prev) => {
      const remaining: GameObject[] = [];

      for (const obj of prev) {
        const nextZ = obj.z + GAME_SPEED * delta;

        // Collision check near player (Z around 0)
        if (!obj.collected && Math.abs(nextZ) < 0.8) {
          const dist = Math.hypot(obj.x - playerPos.x, obj.y - playerPos.y);

          if (obj.type === "gem" && dist < 0.9) {
            onCollectGem();
            obj.collected = true;
            continue;
          } else if (obj.type === "obstacle" && dist < 0.85) {
            onHitObstacle();
            obj.collected = true;
            continue;
          }
        }

        if (nextZ < 5 && !obj.collected) {
          remaining.push({ ...obj, z: nextZ });
        }
      }

      return remaining;
    });
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[0, 10, 5]} intensity={1.5} color="#FFFFFF" />

      {/* Tunnel Wireframe */}
      <TunnelRings speed={gameState === "playing" ? GAME_SPEED : 3} />

      {/* Player Ship */}
      <PlayerShip targetPos={playerPos} shield={shield} />

      {/* Spawned Objects */}
      {objects.map((obj) => (
        <group key={obj.id} position={[obj.x, obj.y, obj.z]}>
          {obj.type === "gem" ? (
            <mesh rotation={[obj.z * 0.1, obj.z * 0.1, 0]} scale={obj.scale}>
              <octahedronGeometry args={[1, 0]} />
              <meshStandardMaterial
                color="#4FD1C5"
                emissive="#4FD1C5"
                emissiveIntensity={1.8}
                roughness={0.1}
                metalness={0.9}
              />
            </mesh>
          ) : (
            <mesh rotation={[obj.z * 0.15, obj.z * 0.1, 0]} scale={obj.scale}>
              <icosahedronGeometry args={[1, 0]} />
              <meshStandardMaterial
                color="#EF4444"
                emissive="#EF4444"
                emissiveIntensity={1.2}
                wireframe
              />
            </mesh>
          )}
        </group>
      ))}

      {/* Cyber Warp Stars */}
      <Sparkles
        count={80}
        scale={10}
        size={3.5}
        speed={gameState === "playing" ? 3 : 0.8}
        color="#38BDF8"
      />
    </>
  );
}

export function CyberFlightGame() {
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">("idle");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    if (typeof window === "undefined") return 0;
    try {
      const saved = localStorage.getItem("fdr_cyber_flight_highscore");
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });
  const [shield, setShield] = useState(3);
  const [distance, setDistance] = useState(0);
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [isMutedState, setIsMutedState] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return getIsMuted();
    } catch {
      return false;
    }
  });
  const containerRef = useRef<HTMLDivElement>(null);

  // Distance ticker
  useEffect(() => {
    if (gameState !== "playing") return;
    const interval = setInterval(() => {
      setDistance((d) => d + 12);
      setScore((s) => s + 5);
    }, 100);
    return () => clearInterval(interval);
  }, [gameState]);

  // Pointer move handler (mouse or touch)
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 4.8;
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 3.6;
    setPlayerPos({
      x: Math.max(-2.4, Math.min(2.4, x)),
      y: Math.max(-1.8, Math.min(1.8, y)),
    });
  };

  // Keyboard navigation
  useEffect(() => {
    if (gameState !== "playing") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const step = 0.4;
      if (e.key === "ArrowLeft" || e.key === "a") {
        setPlayerPos((p) => ({ ...p, x: Math.max(-2.4, p.x - step) }));
      } else if (e.key === "ArrowRight" || e.key === "d") {
        setPlayerPos((p) => ({ ...p, x: Math.min(2.4, p.x + step) }));
      } else if (e.key === "ArrowUp" || e.key === "w") {
        setPlayerPos((p) => ({ ...p, y: Math.min(1.8, p.y + step) }));
      } else if (e.key === "ArrowDown" || e.key === "s") {
        setPlayerPos((p) => ({ ...p, y: Math.max(-1.8, p.y - step) }));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState]);

  const startGame = () => {
    playCyberClick();
    setScore(0);
    setShield(3);
    setDistance(0);
    setGameState("playing");
  };

  const handleCollectGem = useCallback(() => {
    playGemCollectSound();
    setScore((s) => s + 100);
  }, []);

  const handleHitObstacle = useCallback(() => {
    playCrashSound();
    setShield((prev) => {
      const next = prev - 1;
      if (next <= 0) {
        playGameOverSound();
        setGameState("gameover");
        setScore((finalScore) => {
          if (finalScore > highScore) {
            setHighScore(finalScore);
            localStorage.setItem("fdr_cyber_flight_highscore", finalScore.toString());
          }
          return finalScore;
        });
        return 0;
      }
      return next;
    });
  }, [highScore]);

  const handleToggleSound = () => {
    const muted = toggleMuteSound();
    setIsMutedState(muted);
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      className="relative w-full h-[520px] sm:h-[600px] rounded-3xl bg-[#080D18] border border-cyan-500/30 overflow-hidden select-none shadow-[0_0_60px_rgba(79,209,197,0.18)]"
    >
      {/* 3D Canvas Layer */}
      <Canvas
        camera={{ position: [0, 1.2, 4.2], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        style={{ background: "#080D18" }}
      >
        <GameWorld
          gameState={gameState}
          onCollectGem={handleCollectGem}
          onHitObstacle={handleHitObstacle}
          playerPos={playerPos}
          shield={shield}
        />
      </Canvas>

      {/* Top HUD Telemetry Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between font-mono text-xs pointer-events-none">
        {/* Shield Integrity */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/85 border border-cyan-500/30 text-cyan-300 backdrop-blur-md">
          <Shield className="w-4 h-4 text-cyan-400" />
          <span>SHIELD:</span>
          <div className="flex gap-1">
            {[1, 2, 3].map((val) => (
              <span
                key={val}
                className={`w-3 h-3 rounded-full transition-all ${
                  val <= shield
                    ? "bg-cyan-400 shadow-[0_0_8px_#4FD1C5]"
                    : "bg-slate-800 border border-slate-700"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Live Score & High Score */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-950/85 border border-cyan-500/30 text-white font-bold backdrop-blur-md">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>SCORE: {score}</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/85 border border-slate-800 text-slate-400 backdrop-blur-md">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span>HI: {highScore}</span>
          </div>

          {/* Audio toggle button */}
          <button
            onClick={handleToggleSound}
            onMouseEnter={playHoverTick}
            className="pointer-events-auto p-2 rounded-xl bg-slate-950/85 border border-slate-700 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
            title="Toggle Audio"
          >
            {isMutedState ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>
        </div>
      </div>

      {/* Cyber Corner HUD Brackets */}
      <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-cyan-400 pointer-events-none z-10" />
      <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-cyan-400 pointer-events-none z-10" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-cyan-400 pointer-events-none z-10" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-cyan-400 pointer-events-none z-10" />

      {/* Bottom Controls Legend */}
      {gameState === "playing" && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 font-mono text-[10px] text-slate-400 bg-slate-950/80 px-4 py-1 rounded-full border border-slate-800 pointer-events-none whitespace-nowrap">
          KONTROL: GESER MOUSE / SENTUH ATAU TOMBOL PANAH / W-A-S-D UNTUK MENGEMUDIKAN PESAWAT
        </div>
      )}

      {/* START SCREEN OVERLAY */}
      {gameState === "idle" && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-md p-6 text-center font-mono">
          <div className="w-16 h-16 rounded-2xl bg-cyan-950/60 border border-cyan-400/40 flex items-center justify-center text-cyan-400 mb-4 shadow-[0_0_30px_rgba(79,209,197,0.3)]">
            <Gamepad2 className="w-8 h-8 animate-pulse" />
          </div>

          <span className="text-xs text-cyan-400 font-bold uppercase tracking-[0.25em] mb-1">
            LABORATORIUM 3D REKAYASA // THREE.JS WEBGL
          </span>

          <h3 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight mb-2">
            QUANTUM WARP // CYBER RUNNER
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 max-w-md mb-6 leading-relaxed">
            Uji kendali drone sibernetik Anda melintasi lorong kuantum kompilasi. Kumpulkan data tokens <span className="text-cyan-400 font-bold">(hijau/cyan)</span> dan hindari syntax anomaly spikes <span className="text-red-400 font-bold">(merah)</span>!
          </p>

          <button
            onClick={startGame}
            onMouseEnter={playHoverTick}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-400 to-sky-400 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-black text-sm uppercase tracking-wider flex items-center gap-3 transition-all shadow-[0_0_35px_rgba(79,209,197,0.5)] hover:shadow-[0_0_50px_rgba(79,209,197,0.7)] cursor-pointer transform active:scale-95"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>MULAI MISI // LAUNCH FLIGHT</span>
          </button>
        </div>
      )}

      {/* GAME OVER SCREEN OVERLAY */}
      {gameState === "gameover" && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-md p-6 text-center font-mono animate-fadeIn">
          <div className="w-16 h-16 rounded-2xl bg-red-950/60 border border-red-500/40 flex items-center justify-center text-red-400 mb-4 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
            <RotateCcw className="w-8 h-8" />
          </div>

          <span className="text-xs text-red-400 font-bold uppercase tracking-[0.2em] mb-1">
            SISTEM TERGANGGU // MISSION TERMINATED
          </span>

          <h3 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-4">
            SKOR AKHIR: <span className="text-cyan-400">{score}</span>
          </h3>

          <div className="flex items-center gap-4 mb-6 text-xs text-slate-300">
            <span>JARAK: {distance} METER</span>
            <span>&bull;</span>
            <span className="text-amber-400 font-bold">REKOR TERTINGGI: {highScore}</span>
          </div>

          <button
            onClick={startGame}
            onMouseEnter={playHoverTick}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-teal-400 hover:to-cyan-500 text-slate-950 font-black text-sm uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_0_30px_rgba(79,209,197,0.4)] cursor-pointer transform active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>COBA LAGI // RECOMPILE</span>
          </button>
        </div>
      )}
    </div>
  );
}
