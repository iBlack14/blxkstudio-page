"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { MessageCircle, ShoppingCart, Users, Zap } from "lucide-react"

export function ProjectDemos() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null)

  return (
    <section className="py-20 md:py-32 px-4 md:px-6 lg:px-8 bg-background border-y border-primary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="neon-text">Demos Interactivas</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experimenta en vivo cómo funcionan nuestras soluciones premium
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Demo 1: WhatsApp Payment Gateway */}
          <Card
            className="group neon-card-rotating backdrop-blur-sm cursor-pointer p-6"
            onClick={() => setActiveDemo(activeDemo === "whatsapp" ? null : "whatsapp")}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center">
                <ShoppingCart size={24} className="text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold">WhatsApp Gateway</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Simula una compra directa por WhatsApp</p>

            {activeDemo === "whatsapp" && (
              <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/30">
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-primary">→</span>
                    <span>Cliente: "Quiero 2 unidades del producto XYZ"</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">←</span>
                    <span>Bot: "Total: $50. ¿Proceder con pago?"</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    <span className="text-green-400">Pedido procesado exitosamente</span>
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Demo 2: N8N Automation */}
          <Card
            className="group neon-card-rotating backdrop-blur-sm cursor-pointer p-6"
            onClick={() => setActiveDemo(activeDemo === "n8n" ? null : "n8n")}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-orange-500/50 flex items-center justify-center">
                <Zap size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold">N8N Automation</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Flujo automático de pedido a notificación</p>

            {activeDemo === "n8n" && (
              <div className="mt-4 p-4 bg-orange-500/10 rounded-lg border border-orange-500/30 space-y-2 text-sm">
                <div>1. Pedido en WooCommerce</div>
                <div className="text-orange-400 text-center">↓</div>
                <div>2. WhatsApp → Cliente notificado</div>
                <div className="text-orange-400 text-center">↓</div>
                <div>3. Google Sheets actualizado</div>
                <div className="text-orange-400 text-center">↓</div>
                <div>4. Dashboard Supabase sincronizado</div>
              </div>
            )}
          </Card>

          {/* Demo 3: Order Management */}
          <Card
            className="group neon-card-rotating backdrop-blur-sm cursor-pointer p-6"
            onClick={() => setActiveDemo(activeDemo === "orders" ? null : "orders")}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-500/50 flex items-center justify-center">
                <ShoppingCart size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold">Gestión de Pedidos</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Panel completo de seguimiento</p>

            {activeDemo === "orders" && (
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between p-2 bg-primary/10 rounded border border-primary/20">
                  <span>PED-001</span>
                  <span className="text-yellow-400">En preparación</span>
                </div>
                <div className="flex justify-between p-2 bg-primary/10 rounded border border-primary/20">
                  <span>PED-002</span>
                  <span className="text-blue-400">Enviado</span>
                </div>
                <div className="flex justify-between p-2 bg-primary/10 rounded border border-primary/20">
                  <span>PED-003</span>
                  <span className="text-green-400">Entregado</span>
                </div>
              </div>
            )}
          </Card>

          {/* Demo 4: Chatbot */}
          <Card
            className="group neon-card-rotating backdrop-blur-sm cursor-pointer p-6"
            onClick={() => setActiveDemo(activeDemo === "chatbot" ? null : "chatbot")}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-500/50 flex items-center justify-center">
                <MessageCircle size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold">Chatbot IA</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Respuestas inteligentes 24/7</p>

            {activeDemo === "chatbot" && (
              <div className="mt-4 p-4 bg-purple-500/10 rounded-lg border border-purple-500/30 space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span>U:</span>
                  <span>"¿Cuáles son tus horarios?"</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-purple-400">B:</span>
                  <span>"Abierto 24/7. ¿En qué más te ayudo?"</span>
                </div>
              </div>
            )}
          </Card>

          {/* Demo 5: Admin Dashboard */}
          <Card
            className="group neon-card-rotating backdrop-blur-sm cursor-pointer p-6"
            onClick={() => setActiveDemo(activeDemo === "admin" ? null : "admin")}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-500/50 flex items-center justify-center">
                <Users size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold">Panel Admin</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Control total del negocio</p>

            {activeDemo === "admin" && (
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between p-2 bg-green-500/10 rounded border border-green-500/20">
                  <span>Ingresos hoy</span>
                  <span className="text-green-400">$1,250</span>
                </div>
                <div className="flex justify-between p-2 bg-green-500/10 rounded border border-green-500/20">
                  <span>Pedidos activos</span>
                  <span className="text-green-400">12</span>
                </div>
                <div className="flex justify-between p-2 bg-green-500/10 rounded border border-green-500/20">
                  <span>Tasa conversión</span>
                  <span className="text-green-400">3.8%</span>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  )
}
