"use client";
/// <reference types="react" />

import React from "react";
import { Globe, Bot, MessageSquare, Plug, Cloud, Palette } from "lucide-react";
import { Card3DHover } from "./3d-card-hover";

export function Services3D() {
  const services = [
    {
      icon: Globe,
      title: "Desarrollo Web y Soluciones Empresariales",
      description:
        "WordPress, Elementor, Next.js, plugins personalizados, sistemas empresariales (inventarios, ventas, facturación) e integraciones con APIs.",
    },
    {
      icon: Bot,
      title: "Automatización e Inteligencia Artificial",
      description:
        "Flujos inteligentes con n8n, Gemini/GPT, bots que automatizan atención al cliente, marketing y procesos internos críticos.",
    },
    {
      icon: MessageSquare,
      title: "WhatsApp Business y Chatbots",
      description:
        "Configuración avanzada de WhatsApp API, chatbots con detección inteligente y sistemas híbridos (bot + humano).",
    },
    {
      icon: Plug,
      title: "Infraestructura y DevOps",
      description:
        "VPS Linux (Azure, EasyPanel, cPanel, WHM), despliegues Node, Next.js, PHP, SSL, Nixpacks y Docker.",
    },
    {
      icon: Cloud,
      title: "Hosting & Reseller",
      description:
        "Planes Emprendedor, Empresa y Premium con cPanel, WHM y SSL.",
    },
    {
      icon: Palette,
      title: "Productos Digitales",
      description:
        "Plantillas profesionales para Elementor, automatizaciones listas, plugins personalizados e integración de pagos (Yape, Plin, Izipay QR).",
    },
  ];

  return (
    <section id="services" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4 animate-in fade-in duration-1000">
            <h2 className="text-4xl md:text-5xl font-bold neon-text-sm">
              Servicios Principales
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
              Soluciones end-to-end desde la conceptualización hasta la implementación
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div key={index}>
                <Card3DHover delay={index * 100}>
                  <div className="neon-card-rotating p-6 rounded-lg space-y-4 group h-full">
                    <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center group-hover:neon-glow transition-all duration-300">
                      <service.icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground text-balance group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
                      {service.description}
                    </p>
                  </div>
                </Card3DHover>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
