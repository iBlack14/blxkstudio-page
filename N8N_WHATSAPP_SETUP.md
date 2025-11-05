# Guía Configuración: N8N + WhatsApp Business API + Chatbot Inteligente

## 📋 Tabla de Contenidos
1. [Obtener Credenciales WhatsApp](#obtener-credenciales-whatsapp)
2. [Configurar N8N](#configurar-n8n)
3. [Configurar Variables en v0](#configurar-variables-en-v0)
4. [Crear Flujo en N8N](#crear-flujo-en-n8n)
5. [Probar Integración](#probar-integración)

---

## 1️⃣ Obtener Credenciales WhatsApp

### Paso 1.1: Acceder a Facebook Developers

1. Ve a [Facebook Developers](https://developers.facebook.com)
2. Inicia sesión con tu cuenta de Meta
3. Click en **"Mis Aplicaciones"** → **"Crear aplicación"**
4. Selecciona tipo: **"Comercio"** (o "Negocio")
5. Nombre: `blxk-studio-whatsapp`

### Paso 1.2: Configurar WhatsApp

1. En tu nueva aplicación, ve a **"Productos"**
2. Busca **"WhatsApp Business API"** y haz click en **"Configurar"**
3. Verás una sección **"Comenzar"** → click en **"Crear cuenta de prueba"**

### Paso 1.3: Obtener Credenciales

Después de crear la cuenta de prueba, encontrarás:

**Opción A: Desde el Dashboard**
- Ve a **"Configuración"** → **"Números de Teléfono"**
- Busca tu número asignado (ejemplo: +1234567890)
- Haz click en él para ver:
  - **Phone Number ID**: `123456789` (necesario)
  - **Business Account ID**: `987654321` (necesario)

**Opción B: Obtener Access Token**
- Ve a **"Configuración"** → **"Tokens de acceso a la aplicación"**
- Selecciona **"Generar token"**
- Copia el token (empieza con `EAACCC...`)
- **⚠️ Guarda este token en un lugar seguro**

### Credenciales que necesitas:
\`\`\`
WHATSAPP_TOKEN = EAACCC...
WHATSAPP_PHONE_ID = 123456789
WHATSAPP_BUSINESS_ID = 987654321
ADMIN_PHONE = +1234567890 (tu número personal para recibir notificaciones)
\`\`\`

---

## 2️⃣ Configurar Variables en v0

En el panel de v0 (sidebar izquierdo), sección **"Vars"**:

1. Haz click en **"Connect"**
2. Busca **"Environment Variables"** o ve a sección **"Vars"**
3. Agrega estas variables:

\`\`\`
WHATSAPP_TOKEN=EAACCC_tu_token_completo_aqui
WHATSAPP_PHONE_ID=123456789
WHATSAPP_BUSINESS_ID=987654321
ADMIN_PHONE=+1234567890
NEXT_PUBLIC_APP_URL=https://tu-dominio.com (o http://localhost:3000 en desarrollo)
\`\`\`

**Importante:** Solo `NEXT_PUBLIC_APP_URL` puede ser usado en el cliente. Los demás son solo servidor.

---

## 3️⃣ Configurar N8N

### Paso 3.1: Crear Cuenta N8N

1. Ve a [N8N Cloud](https://app.n8n.cloud)
2. Crea cuenta o inicia sesión
3. Click en **"New Workflow"**

### Paso 3.2: Configurar Webhook para Recibir Mensajes

En N8N, los nodos básicos son:

\`\`\`
┌─────────────────────┐
│  Webhook (Entrada)  │  ← Recibe mensajes de WhatsApp
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│  Function Node      │  ← Procesa/extrae datos
└──────────┬──────────┘
           │
┌──────────▼──────────────────┐
│  HTTP Request (a tu Next.js) │  ← Envía a tu backend
└──────────┬──────────────────┘
           │
┌──────────▼──────────┐
│  WhatsApp API       │  ← Responde al usuario
└─────────────────────┘
\`\`\`

### Paso 3.3: Crear el Flujo Paso a Paso

**NODO 1: Webhook (Entrada)**
- Click en "+" → busca "Webhook"
- Configura:
  - **HTTP Method**: POST
  - **Path**: `/webhook/whatsapp-messages`
  - **Authentication**: None
- Copia la URL generada (ejemplo: `https://n8n-instance.com/webhook/whatsapp-messages`)

**NODO 2: Function (Procesar datos)**
- Click en "+" → busca "Function"
- Nombre: "Parse WhatsApp Message"
- En el código:

\`\`\`javascript
// Extrae información del webhook de WhatsApp
const entry = $input.all()[0].body.entry[0];
const changes = entry.changes[0];
const messages = changes.value.messages;
const message = messages[0];

const from = message.from;
const body = message.text.body;
const messageId = message.id;
const timestamp = message.timestamp;

return [{
  from,
  body,
  messageId,
  timestamp,
  event: "user_message"
}];
\`\`\`

**NODO 3: HTTP Request (Llamar tu API)**
- Click en "+" → busca "HTTP Request"
- Configura:
  - **URL**: `https://tu-dominio.com/api/chatbot-webhook` (o `http://localhost:3000` en desarrollo)
  - **Method**: POST
  - **Headers**: 
    - `Content-Type`: `application/json`
  - **Body**:
    \`\`\`json
    {
      "event": "user_message",
      "userId": "{{$node['Parse WhatsApp Message'].json.from}}",
      "conversationId": "conv_{{$node['Parse WhatsApp Message'].json.from}}",
      "message": "{{$node['Parse WhatsApp Message'].json.body}}",
      "timestamp": "{{$node['Parse WhatsApp Message'].json.timestamp}}"
    }
    \`\`\`

**NODO 4: WhatsApp API (Responder)**
- Click en "+" → busca "WhatsApp Business Cloud API"
- Configura credenciales:
  - **Access Token**: Tu token de WhatsApp
  - **Phone Number ID**: Tu Phone ID
- Configura el nodo:
  - **To**: `{{$node['Parse WhatsApp Message'].json.from}}`
  - **Message Type**: `text`
  - **Body**: `{{$node['HTTP Request'].json.message}}` (respuesta de tu API)

### Paso 3.4: Configurar Webhook de WhatsApp en Facebook

1. Regresa a [Facebook Developers](https://developers.facebook.com)
2. En tu aplicación WhatsApp, ve a **"Configuración"** → **"Webhook"**
3. En **"Callback URL"** pega la URL de N8N (del Nodo 1)
4. En **"Verify Token"** escribe: `secure_webhook_token_blxk_2025`
5. Suscribete a eventos:
   - ☑ `messages`
   - ☑ `message_template_status_update`
6. Click en **"Verificar y Guardar"**

---

## 4️⃣ Crear Flujo en N8N

### Flujo Completo: Usuario → Bot → Owner → Bot Retoma

\`\`\`
Usuario envía mensaje a WhatsApp
           ↓
    N8N recibe por Webhook
           ↓
    Envía a tu API en Next.js
           ↓
    API verifica: ¿Bot activo?
      /                    \
   SÍ                       NO
    │                        │
    ├─→ Generar respuesta   ├─→ Notificar owner
    │   con IA              │
    │   (OpenAI/Claude)     │
    │                        │
    └────────┬───────────────┘
             ↓
    Respuesta se envía
    al usuario por WhatsApp
             ↓
    Owner recibe notificación
    (email/SMS/push)
             ↓
    ¿Owner quiere intervenir?
      /                    \
   SÍ                       NO
    │                        │
    ├─→ Owner responde   ├─→ Bot sigue respondiendo
    │                        automáticamente
    │
    └─→ Bot se pausa
        ↓
    ¿Owner inactivo por 2 min?
      /           \
   SÍ              NO
    │              │
    └─ Bot retoma  Owner sigue
       control     respondiendo
\`\`\`

---

## 5️⃣ Probar Integración

### Test 1: Enviar Mensaje de Prueba

\`\`\`bash
curl -X POST https://n8n-instance.com/webhook/whatsapp-messages \
  -H "Content-Type: application/json" \
  -d '{
    "object": "whatsapp_business_account",
    "entry": [{
      "id": "123456",
      "changes": [{
        "value": {
          "messages": [{
            "from": "+1234567890",
            "id": "msg123",
            "timestamp": "1635900000",
            "text": {
              "body": "Hola, necesito ayuda con mi pedido"
            }
          }],
          "metadata": {
            "display_phone_number": "1234567890",
            "phone_number_id": "123456789"
          }
        }
      }]
    }]
  }'
\`\`\`

### Test 2: Verificar en Logs

**En N8N:**
- Ve a tu workflow
- Click en "Executions" para ver el historial
- Deberías ver la ejecución exitosa

**En v0:**
- Abre la consola del navegador (F12)
- Revisa los logs de tu API en el servidor

### Test 3: Recibir Mensaje en WhatsApp

1. Envía un mensaje desde WhatsApp AL número asignado
2. Deberías recibir una respuesta automática

---

## 6️⃣ Implementar Control Manual del Owner

### Crear Dashboard de Control (en v0)

Archivo: `app/owner-dashboard/page.tsx`

\`\`\`typescript
"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

interface Conversation {
  conversationId: string
  userId: string
  lastMessage: string
  botActive: boolean
  createdAt: string
}

export default function OwnerDashboard() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConv, setSelectedConv] = useState<string | null>(null)
  const [message, setMessage] = useState("")

  // Obtener conversaciones activas
  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch("/api/conversations")
      const data = await res.json()
      setConversations(data)
    }, 5000) // Actualizar cada 5 segundos

    return () => clearInterval(interval)
  }, [])

  // Owner toma control
  const takeControl = async (conversationId: string) => {
    await fetch("/api/chatbot-webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "owner_response",
        conversationId,
        message: "Owner asumió control de la conversación",
        ownerName: "Carlos"
      })
    })

    setSelectedConv(conversationId)
  }

  // Owner envía mensaje
  const sendMessage = async () => {
    if (!selectedConv || !message) return

    await fetch("/api/chatbot-webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "owner_response",
        conversationId: selectedConv,
        message,
        ownerName: "Carlos"
      })
    })

    setMessage("")
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Panel de Control - Owner</h1>

      <div className="grid grid-cols-3 gap-8">
        {/* Lista de Conversaciones */}
        <div className="col-span-1">
          <h2 className="text-xl font-bold mb-4">Conversaciones Activas</h2>
          {conversations.map((conv) => (
            <button
              key={conv.conversationId}
              onClick={() => takeControl(conv.conversationId)}
              className={`w-full p-4 rounded-lg mb-2 text-left ${
                selectedConv === conv.conversationId
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary"
              }`}
            >
              <div className="font-bold">{conv.userId}</div>
              <div className="text-sm truncate">{conv.lastMessage}</div>
              <div className="text-xs">
                {conv.botActive ? "🤖 Bot Activo" : "👤 Tú Respondiendo"}
              </div>
            </button>
          ))}
        </div>

        {/* Chat */}
        <div className="col-span-2">
          {selectedConv ? (
            <div className="border rounded-lg p-4 h-96 flex flex-col">
              <div className="flex-1 overflow-auto mb-4">
                {/* Mensajes aquí */}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escribe tu respuesta..."
                  className="flex-1 px-4 py-2 border rounded-lg"
                />
                <Button onClick={sendMessage}>Enviar</Button>
              </div>
            </div>
          ) : (
            <div className="text-muted-foreground">Selecciona una conversación</div>
          )}
        </div>
      </div>
    </div>
  )
}
\`\`\`

---

## 7️⃣ Checklist de Configuración

- [ ] Cuenta en Facebook Developers creada
- [ ] WhatsApp Business API agregada
- [ ] Credenciales obtenidas (Token, Phone ID, Business ID)
- [ ] Variables agregadas en v0 (Vars)
- [ ] Cuenta N8N creada
- [ ] Flujo N8N creado con 4 nodos
- [ ] Webhook de N8N configurado en Facebook
- [ ] Test exitoso (mensaje recibido)
- [ ] Dashboard de owner funcional
- [ ] Integración con IA (OpenAI/Claude)

---

## 🆘 Troubleshooting

### "Webhook no recibe mensajes"
- Verifica que la URL de N8N sea correcta en Facebook
- Asegúrate que el Webhook está "Activo" en N8N
- Revisa que el Verify Token coincida

### "No puedo obtener el Access Token"
- Verifica que tu aplicación tenga rol de "Admin"
- Intenta crear un nuevo token de aplicación

### "Respuestas no se envían"
- Verifica que el WhatsApp Business Account esté en modo "Prueba"
- Comprueba que tu número teléfono esté verificado

### "Owner no recibe notificaciones"
- Configura notificaciones vía email/Resend en tu API
- Agrega un nodo "Send Email" en N8N

---

**Soporte:** contact@blxkstudio.com
**Última actualización:** Noviembre 2025
