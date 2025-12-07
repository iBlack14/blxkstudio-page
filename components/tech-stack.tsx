export function TechStack() {
  const techCategories = [
    {
      category: "Backend",
      technologies: [
        { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
        { name: "Spring Boot", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
        { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "Express", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
        { name: "FastAPI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
      ],
    },
    {
      category: "Frontend",
      technologies: [
        { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
        { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "Angular", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg" },
        {
          name: "TailwindCSS",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
        },
      ],
    },
    {
      category: "Bases de Datos",
      technologies: [
        {
          name: "PostgreSQL",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
        },
        { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
        { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      ],
    },
    {
      category: "DevOps & Cloud",
      technologies: [
        { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
        { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      ],
    },
    {
      category: "Automatización & AI",
      technologies: [
        { name: "n8n", logo: "/n8n-automation-logo.jpg" },
        { name: "OpenAI", logo: "/openai-logo-inspired-abstract.png" },
        { name: "Webhooks", logo: "/webhook-api-icon.jpg" },
      ],
    },
  ]

  return (
    <section id="tech" className="py-24 relative bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold neon-text-sm">Stack Tecnológico</h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-loose">Herramientas de vanguardia para soluciones de clase mundial</p>
          </div>

          <div className="space-y-12">
            {techCategories.map((category, index) => (
              <div key={index} className="space-y-8">
                <h3 className="text-2xl font-bold text-primary text-center">{category.category}</h3>
                <div className="flex flex-wrap items-center justify-center gap-10">
                  {category.technologies.map((tech, techIndex) => (
                    <div key={techIndex} className="flex flex-col items-center gap-4 group">
                      <div className="w-18 h-18 rounded-lg neon-logo-rotating p-3 flex items-center justify-center relative z-10">
                        <img
                          src={tech.logo || "/placeholder.svg"}
                          alt={tech.name}
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform relative z-10"
                        />
                      </div>
                      <span className="text-base text-muted-foreground group-hover:text-primary transition-colors text-center">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
