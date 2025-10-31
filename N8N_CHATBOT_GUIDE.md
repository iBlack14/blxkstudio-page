# Guía Completa: Chatbot Inteligente con Control Manual en N8N

## Resumen

Este flujo automatizado permite que un chatbot responda mensajes de usuarios automáticamente. Cuando el dueño (owner) del negocio decide intervenir, toma control y el bot se pausa. Si el owner no responde en 2 minutos, el bot retoma automáticamente el control, manteniendo todo el contexto de la conversación.

## Requisitos Previos

- Cuenta activa en N8N (cloud o self-hosted)
- URL de tu aplicación Next.js (ejemplo: `https://blxkstudio.com`)
- Acceso a WhatsApp Business API (opcional pero recomendado)
- Variables de entorno configuradas

## Paso 1: Importar el Flujo en N8N

1. **Abre N8N Dashboard**
   - Accede a https://app.n8n.cloud (o tu instancia local)

2. **Crea un Nuevo Flujo**
   - Click en "+ New" o "Create New Workflow"

3. **Importar Configuración**
   - Click en el menú (≡) → "Import"
   - Pega el contenido del archivo `n8n-chatbot-config.json`
   - Click en "Import"

4. **El flujo se importará con estos nodos:**
   - Webhook Entrada (recibe mensajes)
   - Extraer Variables (prepara datos)
   - Condicionales (Es Mensaje de Usuario? / Es Respuesta Owner? / Es Timeout?)
   - HTTP Requests (procesan cada tipo de evento)
   - Esperar 2 minutos (timeout automático)
   - Webhook Salida (devuelve respuesta)

## Paso 2: Configurar Variables de Entorno

En la sección de **Variables** en N8N:

\`\`\`
NEXT_PUBLIC_APP_URL = https://tu-dominio.com
WHATSAPP_API_URL = https://api.whatsapp.com/v1
WHATSAPP_TOKEN = tu_token_aqui
OWNER_WHATSAPP = +1234567890
\`\`\`

O desde tu aplicación Next.js, en la sección **Vars** del sidebar:

\`\`\`
NEXT_PUBLIC_APP_URL=https://blxkstudio.com
WHATSAPP_TOKEN=tu_token_whatsapp
\`\`\`

## Paso 3: Entender el Flujo

### 1. Webhook Entrada
- **Recibe** mensajes en formato JSON
- **Estructura esperada:**
\`\`\`json
{
  "event": "user_message|owner_response|timeout",
  "userId": "user123",
  "conversationId": "conv456",
  "message": "Hola, necesito ayuda",
  "timestamp": "2025-10-31T10:30:00Z"
}
\`\`\`

### 2. Extraer Variables
- **Obtiene** los valores: event, conversationId, userId, message
- **Prepara** los datos para los nodos siguientes

### 3. Condicionales
El flujo se divide en 3 caminos según el `event`:

#### Camino A: user_message
- Usuario escribe → Bot responde automáticamente
- Owner recibe notificación
- Si owner no interviene → Bot sigue respondiendo

#### Camino B: owner_response
- Owner toma control → Bot se pausa
- Espera 2 minutos de inactividad del owner
- Si owner no responde en 2 min → Bot retoma control

#### Camino C: timeout
- Owner pasó 2 minutos sin responder
- Bot se reactiva automáticamente
- Mantiene contexto de conversación anterior

### 4. HTTP Requests
Cada request envía los datos a tu backend:
\`\`\`
POST /api/chatbot-webhook
\`\`\`

Tu ruta en Next.js (`app/api/chatbot-webhook/route.ts`) procesa:
- Guardar mensajes en base de datos (Supabase/Neon)
- Generar respuestas automáticas con IA
- Enviar mensajes por WhatsApp API
- Gestionar estado de conversaciones

## Paso 4: Conectar con WhatsApp API

### Opción A: WhatsApp Business Cloud API

En tu ruta `/api/chatbot-webhook`, agrega:

\`\`\`typescript
import axios from 'axios'

async function sendWhatsAppMessage(to: string, message: string) {
  const response = await axios.post(
    `https://graph.instagram.com/v18.0/${process.env.WHATSAPP_PHONE_ID}/messages`,
    {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: to,
      type: 'text',
      text: { body: message }
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`
      }
    }
  )
  return response.data
}
\`\`\`

### Opción B: WhatsApp Webhook Entrante

En N8N, agrega un webhook adicional para recibir mensajes de WhatsApp:

1. Crea nuevo webhook en el inicio del flujo
2. Configura en tu WhatsApp Business Account el webhook URL:
   \`\`\`
   https://n8n-instance.com/webhook/whatsapp-incoming
   \`\`\`

## Paso 5: Conexión con Supabase (Base de Datos)

Para persistencia de conversaciones, agrega en tu flujo N8N:

1. **Nodo: Supabase**
   - Configura conexión a tu proyecto Supabase
   - Tabla: `conversations`
   - Campos:
     \`\`\`
     - id (uuid primary key)
     - conversation_id (text)
     - user_id (text)
     - bot_active (boolean)
     - owner_active (boolean)
     - last_message (timestamp)
     - message_history (jsonb)
     - created_at (timestamp)
     \`\`\`

2. **SQL para crear tabla:**
\`\`\`sql
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id TEXT NOT NULL UNIQUE,
  user_id TEXT NOT NULL,
  bot_active BOOLEAN DEFAULT true,
  owner_active BOOLEAN DEFAULT false,
  last_owner_message TIMESTAMP,
  message_history JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_conversation_id ON conversations(conversation_id);
CREATE INDEX idx_user_id ON conversations(user_id);
\`\`\`

## Paso 6: Pruebas

### Test del Webhook

1. **En N8N**, haz click en "Execute Workflow"
2. **Test 1: Mensaje de usuario**
\`\`\`bash
curl -X POST http://localhost:3000/api/chatbot-webhook \
  -H "Content-Type: application/json" \
  -d '{
    "event": "user_message",
    "userId": "user123",
    "conversationId": "conv456",
    "message": "Hola, necesito ayuda con mi pedido",
    "timestamp": "2025-10-31T10:30:00Z"
  }'
\`\`\`

3. **Test 2: Owner responde**
\`\`\`bash
curl -X POST http://localhost:3000/api/chatbot-webhook \
  -H "Content-Type: application/json" \
  -d '{
    "event": "owner_response",
    "userId": "user123",
    "conversationId": "conv456",
    "message": "Claro, aquí está tu información de envío",
    "timestamp": "2025-10-31T10:31:00Z"
  }'
\`\`\`

4. **Test 3: Timeout (después de 2 minutos)**
\`\`\`bash
curl -X POST http://localhost:3000/api/chatbot-webhook \
  -H "Content-Type: application/json" \
  -d '{
    "event": "timeout",
    "conversationId": "conv456",
    "timestamp": "2025-10-31T10:33:00Z"
  }'
\`\`\`

## Paso 7: Integración con IA

Enhance el bot con modelos de IA usando Vercel AI SDK:

\`\`\`typescript
import { generateText } from "ai"

async function generateBotResponse(message: string, history: Array<any>) {
  const { text } = await generateText({
    model: "openai/gpt-4-mini",
    prompt: `Eres un asistente de atención al cliente amable y profesional.
    Contexto: Estás ayudando a un cliente con su pedido.
    Historial: ${JSON.stringify(history)}
    Mensaje del cliente: ${message}
    Responde en máximo 2 líneas.`,
    system: "Eres un asistente de atención al cliente de una tienda en línea."
  })
  return text
}
\`\`\`

## Paso 8: Monitoreo y Logs

- **En N8N**: Pestaña "Execution" para ver historial de activaciones
- **En Next.js**: Revisa logs del servidor (console.log)
- **En Supabase**: Query tabla `conversations` para ver estado de conversaciones

\`\`\`sql
SELECT * FROM conversations 
WHERE updated_at > NOW() - INTERVAL '1 hour'
ORDER BY updated_at DESC
\`\`\`

## Diagrama de Flujo

\`\`\`
┌─ Usuario envía mensaje ─────────────────┐
│                                          ↓
│                              ¿Bot está activo?
│                              /           \
│                         Sí /             \ No
│                          /                 \
│    Bot responde     Owner recibe      Owner respondió
│    automáticamente  notificación      Gatillo nuevo flujo
│         │                │                  │
│         └─────┬──────────┴──────────────────┘
│               ↓
│    ¿Owner responde en 2 min?
│           /            \
│        Sí /              \ No
│        /                  \
│   Owner en      Bot retoma control
│   control       con contexto
│      │                 │
│      └────────┬────────┘
│               ↓
│    Respuesta enviada al usuario
\`\`\`

## Troubleshooting

### "Webhook not triggering"
- Verifica que la URL en N8N sea correcta
- Asegúrate que el webhook esté "Activo" (toggle en N8N)
- Revisa logs en la consola del navegador

### "Timeout no funciona"
- El nodo "Esperar 2 minutos" debe estar en el flujo
- Verifica que el HTTP Request después del timeout sea correcto

### "Mensajes no se guardan"
- Verifica credenciales de Supabase
- Asegúrate que la tabla `conversations` exista
- Revisa permisos de Row Level Security (RLS)

## Recursos Adicionales

- [Documentación N8N](https://docs.n8n.io)
- [WhatsApp Business API Docs](https://developers.facebook.com/docs/whatsapp)
- [Vercel AI SDK](https://sdk.vercel.ai)
- [Supabase Docs](https://supabase.com/docs)

---

**Última actualización**: Octubre 2025
**Versión**: 1.0
**Soporte**: contact@blxkstudio.com
