"use client"

import React from "react"
import { Card3DHover } from "./3d-card-hover"
import { Server, Code, Package, CreditCard } from "lucide-react"

export function ProductsShowcase() {
    const products = [
        {
            icon: Server,
            title: "Hosting Reseller",
            description: "Planes Emprendedor, Empresa y Premium con cPanel, WHM y SSL. Ideal para revender hosting.",
        },
        {
            icon: Package,
            title: "Plantillas Elementor",
            description: "Plantillas profesionales listas para usar, optimizadas para conversiones.",
        },
        {
            icon: CreditCard,
            title: "Integración de Pagos",
            description: "Implementación de Yape, Plin, Izipay QR y otras pasarelas de pago.",
        },
        {
            icon: Code,
            title: "Automatizaciones Pre‑configuradas",
            description: "Flujos n8n listos para conectar WhatsApp, CRM y notificaciones.",
        },
    ]

    return (
        <section id="products" className="py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-6xl mx-auto space-y-12">
                    <div className="text-center space-y-4 animate-in fade-in duration-1000">
                        <h2 className="text-4xl md:text-5xl font-bold neon-text-sm">Productos Digitales BLXK</h2>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
                            Soluciones listas para impulsar tu negocio: hosting, plantillas, pagos y automatizaciones.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product, index) => (
                            <Card3DHover key={index} delay={index * 100}>
                                <div className="neon-card-rotating p-6 rounded-lg space-y-4 group h-full text-center">
                                    <div className="w-14 h-14 mx-auto rounded-lg bg-primary/10 flex items-center justify-center group-hover:neon-glow transition-all duration-300">
                                        <product.icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform" />
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground text-balance group-hover:text-primary transition-colors">
                                        {product.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
                                        {product.description}
                                    </p>
                                </div>
                            </Card3DHover>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
