import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, company, message } = body

    console.log("[v0] Received form submission:", { name, email, phone, company, message })

    // In a real implementation, you would use a service like:
    // - Resend (resend.com)
    // - SendGrid
    // - Nodemailer with SMTP
    // - AWS SES

    // For now, we'll simulate the email sending
    // You would replace this with actual email sending logic

    const emailContent = `
      Nueva solicitud de proyecto de BLXK Studio
      
      Nombre: ${name}
      Email: ${email}
      Teléfono: ${phone || "No proporcionado"}
      Empresa: ${company || "No proporcionado"}
      
      Mensaje:
      ${message}
    `

    console.log("[v0] Email content to send to admin@blxkstudio.com:", emailContent)

    // Simulate successful email send
    // In production, you would actually send the email here

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    })
  } catch (error) {
    console.error("[v0] Error in send-email API:", error)
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 })
  }
}
