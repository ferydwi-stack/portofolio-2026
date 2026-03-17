export function Skills() {
  const categories = [
    {
      title: "Frontend Development",
      skills: [
        { name: "React", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "TypeScript", level: 80 },
        { name: "Tailwind CSS", level: 95 },
        { name: "Flutter", level: 75 },
      ]
    },
    {
      title: "Backend Development",
      skills: [
        { name: "Node.js", level: 85 },
        { name: "PHP", level: 80 },
        { name: "Express", level: 85 },
        { name: "MySQL", level: 80 },
        { name: "PostgreSQL", level: 70 },
      ]
    }
  ];

  return (
    <section id="skills" className="py-24 bg-white dark:bg-[#09090b]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white inline-flex flex-col items-center">
            Keahlian Teknis
            <div className="w-20 h-1.5 bg-blue-600 mt-4 rounded-full" />
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Gambaran komprehensif tentang keahlian teknis dan tingkat kemahiran saya di berbagai teknologi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {categories.map((category) => (
            <div key={category.title} className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
                {category.title}
              </h3>
              <div className="space-y-6">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        {skill.name}
                      </span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
