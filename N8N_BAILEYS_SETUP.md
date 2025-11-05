# Configuración N8N + Baileys para Chatbot Inteligente

## Resumen
Este guía configura N8N con Baileys (tu servidor WhatsApp Web) para un chatbot inteligente con control manual del owner.

## Requisitos Previos
- ✅ Baileys instalado en tu servidor
- ✅ N8N corriendo en tu servidor
- ✅ URL pública de N8N accesible (ngrok, servidor propio, etc.)

---

## Paso 1: Configurar Variables de Entorno en v0

En tu panel de v0 (Vars), agrega:

\`\`\`
BAILEYS_WEBHOOK_URL=https://tu-n8n.com/webhook/baileys
OWNER_PHONE=5491234567890  (tu número de WhatsApp sin +)
OWNER_EMAIL=tu@email.com
AI_MODEL=openai/gpt-4o-mini  (o el modelo que prefieras)
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_KEY=tu-supabase-key
\`\`\`

---

## Paso 2: Crear Tabla en Supabase para Sesiones de Chat

Ejecuta este SQL en tu Supabase:

\`\`\`sql
-- Tabla de conversaciones
CREATE TABLE chat_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_phone text NOT NULL,
  owner_active boolean DEFAULT false,
  last_human_message timestamp DEFAULT now(),
  context jsonb DEFAULT '[]',
  created_at timestamp DEFAULT now()
);

-- Tabla de mensajes
CREATE TABLE chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES chat_sessions(id),
  sender text NOT NULL,  -- 'user', 'bot', 'owner'
  message text NOT NULL,
  timestamp timestamp DEFAULT now()
);

CREATE INDEX idx_sessions_phone ON chat_sessions(contact_phone);
CREATE INDEX idx_messages_session ON chat_messages(session_id);
\`\`\`

---

## Paso 3: Configuración en N8N

### 3.1 Crear Flujo Base

En N8N, importa este flujo JSON o crea manualmente:

**Nodos necesarios:**

1. **Webhook (Entrada)**
   - Tipo: POST
   - URL: `/webhook/baileys`
   - Autenticación: Header Authorization Bearer

2. **Function Node (Procesar mensaje)**
   \`\`\`javascript
   // Evalúa si es mensaje o notificación
   const data = $json.body;
   
   return {
     type: data.type,  // 'message' | 'notification' | 'status'
     from: data.from,
     message: data.message,
     timestamp: Date.now()
   };
   \`\`\`

3. **HTTP Request (Enviar a tu API de v0)**
   - Método: POST
   - URL: `https://tu-app.vercel.app/api/chatbot-webhook`
   - Headers:
     \`\`\`
     Authorization: Bearer YOUR_SECRET_KEY
     Content-Type: application/json
     \`\`\`
   - Body:
     \`\`\`json
     {
       "from": "{{ $node['Procesar mensaje'].json.from }}",
       "message": "{{ $node['Procesar mensaje'].json.message }}",
       "type": "{{ $node['Procesar mensaje'].json.type }}"
     }
     \`\`\`

4. **Condicional: ¿Es mensaje de usuario?**
   - Condición: `type === 'message'`
   - SI: Ir a IA
   - NO: Terminar

5. **HTTP Request (Generar respuesta IA)**
   - Método: POST
   - URL: `https://api.vercel.ai/generate`
   - Headers con tu API KEY de OpenAI
   - Body con el mensaje y contexto

6. **HTTP Request (Enviar mensaje por Baileys)**
   - Método: POST
   - URL: `http://localhost:3001/send-message` (tu servidor Baileys)
   - Body:
     \`\`\`json
     {
       "to": "{{ $node['Procesar mensaje'].json.from }}",
       "message": "{{ $node['Generar respuesta'].json.text }}"
     }
     \`\`\`

---

## Paso 4: Habilitar Control Manual del Owner

### 4.1 Endpoint para que Owner tome control

En tu N8N, crea otro webhook:

**Webhook 2: Control Manual**
\`\`\`
POST /webhook/owner-control
Body: {
  "session_id": "...",
  "action": "take_control" | "release_control"
}
\`\`\`

Este webhook:
1. Actualiza `owner_active = true` en Supabase
2. Notifica al chatbot de v0 vía tu API
3. El bot queda silenciado esperando respuestas del owner

### 4.2 Timeout automático

Crea un nodo "Schedule" en N8N que cada minuto:
1. Revisa sesiones donde `owner_active = true`
2. Verifica si han pasado 2 minutos sin mensaje del owner
3. Si sí: activa `owner_active = false` y reactiva el bot

---

## Paso 5: Código en tu Servidor Baileys

\`\`\`javascript
// server.js (Baileys)
app.post('/send-message', async (req, res) => {
  const { to, message } = req.body;
  
  try {
    await sock.sendMessage(to + '@s.whatsapp.net', { 
      text: message 
    });
    
    // Notificar a N8N que el mensaje se envió
    await fetch('https://tu-n8n.com/webhook/baileys/sent', {
      method: 'POST',
      body: JSON.stringify({ to, message, status: 'sent' })
    });
    
    res.json({ status: 'sent' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
\`\`\`

---

## Paso 6: Flujo Completo de Conversación

\`\`\`
[Usuario escribe en WhatsApp]
         ↓
[Baileys captura mensaje]
         ↓
[POST a N8N Webhook]
         ↓
[N8N evalúa: ¿Owner activo?]
         ├─ SÍ: Esperar respuesta del owner
         └─ NO: Generar respuesta con IA
         ↓
[Enviar por Baileys]
         ↓
[Guardar en Supabase]
         ↓
[Notificar owner vía email/push]
\`\`\`

---

## Paso 7: Variables de Entorno en v0 (.env.local)

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxxx

BAILEYS_WEBHOOK_SECRET=tu-secret-key
OWNER_PHONE=5491234567890
OWNER_EMAIL=tu@email.com

N8N_WEBHOOK_URL=https://tu-n8n.com/webhook/baileys
AI_API_KEY=sk-xxx  (para OpenAI o tu proveedor)
\`\`\`

---

## Pruebas

### Test 1: Enviar mensaje de prueba
\`\`\`bash
curl -X POST http://localhost:3000/api/chatbot-webhook \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_SECRET" \
  -d '{
    "from": "5491234567890@s.whatsapp.net",
    "message": "Hola bot",
    "type": "message"
  }'
\`\`\`

### Test 2: Tomar control como owner
\`\`\`bash
curl -X POST http://localhost:3000/api/owner-control \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "xxx",
    "action": "take_control"
  }'
\`\`\`

---

## Troubleshooting

**P: El bot no responde**
- Verifica que N8N está corriendo: `curl http://localhost:5678`
- Checa logs de tu servidor Baileys
- Confirma que la URL del webhook es correcta

**P: Los mensajes no se envían**
- Valida que Baileys está conectado
- Revisa credenciales de Supabase
- Confirma que tu servidor Baileys tiene URL pública

**P: Control manual no funciona**
- Verifica que OWNER_PHONE está configurado correctamente
- Confirma que el endpoint `/owner-control` existe en N8N

---

## Flujo N8N JSON (Importable)

\`\`\`json
{
  "nodes": [
    {
      "parameters": {
        "path": "baileys",
        "responseMode": "onReceived",
        "options": {}
      },
      "name": "Webhook Baileys",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [250, 300]
    },
    {
      "parameters": {
        "functionCode": "const data = $json.body;\nreturn {\n  type: data.type || 'message',\n  from: data.from,\n  message: data.message,\n  timestamp: Date.now()\n};"
      },
      "name": "Procesar Mensaje",
      "type": "n8n-nodes-base.function",
      "typeVersion": 1,
      "position": [450, 300]
    }
  ]
}
\`\`\`

---

¡Listo! Tu chatbot Baileys + N8N + v0 está configurado.
