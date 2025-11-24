# Integración BLXK Chatbot con n8n

## Descripción
El chatbot BLXK puede conectarse con n8n para automatizar procesos y agregar funcionalidades extendidas como:
- Envío de emails
- Creación de tickets
- Integración con CRM
- Procesamiento de datos
- Webhooks personalizados

## Configuración

### 1. Crear un Webhook en n8n

1. Abre tu instancia de n8n
2. Crea un nuevo workflow
3. Agrega un nodo "Webhook" como trigger
4. Configura el webhook:
   - Método: POST
   - Copia la URL del webhook

### 2. Configurar Variables de Entorno

Agrega la siguiente variable de entorno en tu proyecto Vercel:

\`\`\`
N8N_WEBHOOK_URL=https://tu-instancia-n8n.com/webhook/blxk-chatbot
\`\`\`

### 3. Estructura del Payload

El chatbot envía datos en el siguiente formato:

\`\`\`json
{
  "message": "Mensaje del usuario",
  "conversationHistory": [
    {
      "role": "user",
      "content": "Mensaje anterior"
    },
    {
      "role": "assistant",
      "content": "Respuesta anterior"
    }
  ],
  "action": "chat|email|ticket|custom",
  "timestamp": "2025-10-26T15:30:00Z"
}
\`\`\`

### 4. Respuesta Esperada

n8n debe retornar una respuesta en el siguiente formato:

\`\`\`json
{
  "success": true,
  "response": "Respuesta del chatbot",
  "data": {
    "ticketId": "123",
    "status": "created"
  }
}
\`\`\`

## Ejemplos de Uso

### Crear un Ticket
\`\`\`
Usuario: "Necesito reportar un problema"
Acción: ticket
n8n: Crea un ticket en tu sistema
\`\`\`

### Enviar Email
\`\`\`
Usuario: "Envía un email a contacto@empresa.com"
Acción: email
n8n: Envía el email automáticamente
\`\`\`

### Consulta de Base de Datos
\`\`\`
Usuario: "¿Cuál es el estado de mi proyecto?"
Acción: query
n8n: Consulta la base de datos y retorna la información
\`\`\`

## Troubleshooting

- **Error 400**: Verifica que N8N_WEBHOOK_URL esté configurado correctamente
- **Error 500**: Revisa los logs de n8n para ver qué salió mal
- **Sin respuesta**: Asegúrate de que el webhook de n8n retorna una respuesta JSON válida
