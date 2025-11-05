# Variables de Entorno para Baileys + N8N

Agrega estas variables en la sección **Vars** de v0:

## Configuración de Baileys

\`\`\`
BAILEYS_SERVER_URL=http://localhost:3001
BAILEYS_API_KEY=tu-secret-key-opcional
\`\`\`

## Configuración de Notificaciones

\`\`\`
ADMIN_EMAIL=tu@email.com
RESEND_API_KEY=tu-resend-api-key
\`\`\`

## Configuración de IA

\`\`\`
NEXT_PUBLIC_APP_URL=https://tu-app.vercel.app
\`\`\`

## Cómo Configurar tu Servidor Baileys

Tu servidor Baileys debe tener un endpoint `/send-message`:

\`\`\`javascript
// server.js (Baileys)
app.post('/send-message', async (req, res) => {
  const { to, message } = req.body;
  
  try {
    await sock.sendMessage(to, { text: message });
    res.json({ status: 'sent', message: 'Mensaje enviado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
\`\`\`

## Flujo Completo

1. **Usuario escribe en WhatsApp** → Baileys captura
2. **Baileys envía webhook a N8N** → `/webhook/baileys`
3. **N8N procesa** → Envía POST a `/api/chatbot-webhook` de v0
4. **v0 genera respuesta IA** → Envía POST a Baileys (`/send-message`)
5. **Baileys envía por WhatsApp** → Usuario recibe

## Test

\`\`\`bash
# Simular mensaje de usuario
curl -X POST http://localhost:3000/api/chatbot-webhook \
  -H "Content-Type: application/json" \
  -d '{
    "from": "5491234567890@s.whatsapp.net",
    "message": "Hola bot",
    "type": "message"
  }'
