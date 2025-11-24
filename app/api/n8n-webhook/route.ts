export async function POST(request: Request) {
  try {
    const { message, conversationHistory, action } = await request.json()

    // Get n8n webhook URL from environment variables
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL

    if (!n8nWebhookUrl) {
      console.warn("[v0] N8N_WEBHOOK_URL not configured")
      return Response.json({ error: "N8N integration not configured", success: false }, { status: 400 })
    }

    // Send data to n8n webhook
    const response = await fetch(n8nWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        conversationHistory,
        action,
        timestamp: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      throw new Error(`N8N webhook returned status ${response.status}`)
    }

    const data = await response.json()

    return Response.json({
      success: true,
      data,
    })
  } catch (error) {
    console.error("[v0] N8N webhook error:", error)
    return Response.json({ error: "Failed to process n8n request", success: false }, { status: 500 })
  }
}
