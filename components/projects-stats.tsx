"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Card } from "@/components/ui/card"
import { TrendingUp, Users, Zap, Target } from "lucide-react"

export function ProjectsStats() {
  const impactData = [
    { name: "E-commerce", value: 45, fill: "hsl(var(--primary))" },
    { name: "Automatización", value: 30, fill: "hsl(var(--accent))" },
    { name: "Dashboard", value: 25, fill: "hsl(0 0% 45%)" },
  ]

  const growthData = [
    { month: "Ene", adopción: 20, clientes: 8 },
    { month: "Feb", adopción: 35, clientes: 12 },
    { month: "Mar", adopción: 55, clientes: 18 },
    { month: "Abr", adopción: 75, clientes: 28 },
    { month: "May", adopción: 95, clientes: 38 },
    { month: "Jun", adopción: 110, clientes: 45 },
  ]

  const stats = [
    {
      icon: TrendingUp,
      label: "Incremento de Ventas",
      value: "340%",
      description: "Promedio de clientes con nuestras soluciones",
    },
    {
      icon: Users,
      label: "Usuarios Activos",
      value: "2,500+",
      description: "Usando nuestras plataformas mensuales",
    },
    {
      icon: Zap,
      label: "Automatización",
      value: "10,000+",
      description: "Procesos automatizados por mes",
    },
    {
      icon: Target,
      label: "Tasa de Éxito",
      value: "99.8%",
      description: "Uptime y rendimiento garantizado",
    },
  ]

  return (
    <section className="py-16 md:py-24 relative">
      <div className="absolute inset-0 hero-grid-pattern opacity-20" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold neon-text text-balance">Impacto Medible</h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-2">
              Resultados concretos que generan valor real para nuestros clientes
            </p>
          </div>

          {/* Key Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, idx) => {
              const Icon = stat.icon
              return (
                <Card
                  key={idx}
                  className="p-4 md:p-6 border-primary/20 hover:border-primary/50 transition-all hover:shadow-lg group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:neon-glow transition-all">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</p>
                      <p className="font-semibold text-foreground text-sm md:text-base">{stat.label}</p>
                      <p className="text-xs md:text-sm text-muted-foreground">{stat.description}</p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Growth Chart */}
            <Card className="p-4 md:p-8 border-primary/20 overflow-hidden">
              <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-foreground">Crecimiento de Adopción</h3>
              <div className="w-full overflow-x-auto -mx-4 md:mx-0 md:px-0">
                <div className="w-full min-w-max md:min-w-0 px-4 md:px-0">
                  <ResponsiveContainer width="100%" height={250} minWidth={300}>
                    <LineChart data={growthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
                      <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--background))",
                          border: "1px solid hsl(var(--border))",
                          fontSize: 12,
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="adopción"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--primary))", r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="clientes"
                        stroke="hsl(var(--accent))"
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--accent))", r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>

            <Card className="p-4 md:p-8 border-primary/20 flex flex-col">
              <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-foreground">Distribución de Proyectos</h3>
              <div className="flex-1 flex items-center justify-center min-h-64 md:min-h-80">
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={impactData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={90}
                      paddingAngle={1}
                      dataKey="value"
                    >
                      {impactData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        fontSize: 12,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-3 md:gap-6 mt-4 text-xs md:text-sm">
                {impactData.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full" style={{ backgroundColor: item.fill }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
