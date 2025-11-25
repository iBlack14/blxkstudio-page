import { Resend } from "resend"
import { type NextRequest, NextResponse } from "next/server"

function isValidEmail(email: string | undefined): boolean {
  if (!email) return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const { name, email, phone, company, message } = await request.json()

    console.log("[v0] Received form submission:", name)

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ success: false, error: "Email inválido" }, { status: 400 })
    }

    const fromEmail = "admin@blxkstudio.com"
    const adminEmail = process.env.ADMIN_EMAIL || "alonsoyhc@gmail.com"

    // Send user confirmation email
    const userEmailResult = await resend.emails.send({
      from: `BLXK STUDIO <${fromEmail}>`,
      to: email,
      subject: "Hemos recibido tu solicitud - BLXK STUDIO",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #0a0a0a; }
              .container { max-width: 600px; margin: 0 auto; background: #0f0f0f; }
              .header { background: linear-gradient(135deg, #00d9ff 0%, #0099cc 100%); padding: 40px 20px; text-align: center; }
              .header h1 { margin: 0; color: #fff; font-size: 28px; font-weight: 700; letter-spacing: 1px; }
              .header p { margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px; }
              .content { padding: 40px 30px; }
              .greeting { color: #00d9ff; font-size: 18px; font-weight: 600; margin-bottom: 15px; }
              .message { color: #ccc; font-size: 15px; line-height: 1.6; margin-bottom: 30px; }
              .details-box { 
                background: linear-gradient(135deg, rgba(0, 217, 255, 0.1) 0%, rgba(255, 0, 255, 0.05) 100%);
                border: 2px solid #00d9ff;
                border-radius: 12px;
                padding: 25px;
                margin: 30px 0;
                box-shadow: 0 0 20px rgba(0, 217, 255, 0.2);
              }
              .details-box h3 { color: #00d9ff; margin: 0 0 20px 0; font-size: 16px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
              .detail-row { display: flex; margin-bottom: 15px; }
              .detail-label { color: #00d9ff; font-weight: 600; min-width: 100px; font-size: 13px; }
              .detail-value { color: #e0e0e0; flex: 1; font-size: 14px; word-break: break-word; }
              .message-content { color: #e0e0e0; font-size: 14px; line-height: 1.7; white-space: pre-wrap; word-wrap: break-word; }
              .footer { padding: 30px; text-align: center; border-top: 1px solid rgba(0, 217, 255, 0.2); }
              .footer p { margin: 8px 0; color: #888; font-size: 12px; }
              .cta-button { 
                display: inline-block;
                background: linear-gradient(135deg, #00d9ff 0%, #0099cc 100%);
                color: #000;
                padding: 12px 30px;
                border-radius: 6px;
                text-decoration: none;
                font-weight: 600;
                font-size: 14px;
                margin-top: 20px;
                box-shadow: 0 0 15px rgba(0, 217, 255, 0.4);
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>BLXK STUDIO</h1>
                <p>Solicitud de Proyecto Recibida</p>
              </div>
              
              <div class="content">
                <div class="greeting">Hola ${name},</div>
                <div class="message">Gracias por tu interés en BLXK STUDIO. Hemos recibido tu solicitud de proyecto y nuestro equipo la está revisando cuidadosamente.</div>
                
                <div class="details-box">
                  <h3>Detalles de tu Solicitud</h3>
                  <div class="detail-row">
                    <div class="detail-label">Nombre:</div>
                    <div class="detail-value">${name}</div>
                  </div>
                  <div class="detail-row">
                    <div class="detail-label">Email:</div>
                    <div class="detail-value">${email}</div>
                  </div>
                  ${phone ? `<div class="detail-row"><div class="detail-label">Teléfono:</div><div class="detail-value">${phone}</div></div>` : ""}
                  ${company ? `<div class="detail-row"><div class="detail-label">Empresa:</div><div class="detail-value">${company}</div></div>` : ""}
                  <div class="detail-row" style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(0, 217, 255, 0.2);">
                    <div class="detail-label" style="vertical-align: top;">Proyecto:</div>
                    <div class="detail-value message-content">${message}</div>
                  </div>
                </div>
                
                <div class="message">Nos pondremos en contacto contigo en breve para discutir los detalles de tu proyecto. Si tienes alguna pregunta adicional, no dudes en responder a este email.</div>
              </div>
              
              <div class="footer">
                <p>© 2025 BLXK STUDIO. Todos los derechos reservados.</p>
                <p>Soluciones digitales innovadoras para tu negocio</p>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    console.log("[v0] User email result:", userEmailResult)

    let adminEmailResult = { data: null, error: null }
    if (isValidEmail(adminEmail)) {
      adminEmailResult = await resend.emails.send({
        from: `BLXK STUDIO <${fromEmail}>`,
        to: adminEmail,
        subject: `Nueva Solicitud de Proyecto - ${name}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #0a0a0a; }
                .container { max-width: 600px; margin: 0 auto; background: #0f0f0f; }
                .header { background: linear-gradient(135deg, #ff00ff 0%, #00d9ff 100%); padding: 40px 20px; text-align: center; }
                .header h1 { margin: 0; color: #fff; font-size: 28px; font-weight: 700; letter-spacing: 1px; }
                .header p { margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px; }
                .content { padding: 40px 30px; }
                .alert-badge { 
                  display: inline-block;
                  background: #ff00ff;
                  color: #fff;
                  padding: 6px 12px;
                  border-radius: 20px;
                  font-size: 12px;
                  font-weight: 700;
                  margin-bottom: 20px;
                }
                .details-box { 
                  background: linear-gradient(135deg, rgba(255, 0, 255, 0.1) 0%, rgba(0, 217, 255, 0.05) 100%);
                  border: 2px solid #ff00ff;
                  border-radius: 12px;
                  padding: 25px;
                  margin: 20px 0;
                  box-shadow: 0 0 20px rgba(255, 0, 255, 0.2);
                }
                .details-box h3 { color: #ff00ff; margin: 0 0 20px 0; font-size: 16px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
                .detail-row { display: flex; margin-bottom: 15px; }
                .detail-label { color: #00d9ff; font-weight: 600; min-width: 100px; font-size: 13px; }
                .detail-value { color: #e0e0e0; flex: 1; font-size: 14px; word-break: break-word; }
                .message-content { color: #e0e0e0; font-size: 14px; line-height: 1.7; white-space: pre-wrap; word-wrap: break-word; background: rgba(0, 0, 0, 0.3); padding: 15px; border-radius: 6px; border-left: 3px solid #00d9ff; }
                .action-buttons { margin-top: 25px; display: flex; gap: 10px; }
                .btn { 
                  flex: 1;
                  display: inline-block;
                  padding: 12px 20px;
                  border-radius: 6px;
                  text-decoration: none;
                  font-weight: 600;
                  font-size: 14px;
                  text-align: center;
                }
                .btn-primary { 
                  background: linear-gradient(135deg, #ff00ff 0%, #ff0080 100%);
                  color: #fff;
                  box-shadow: 0 0 15px rgba(255, 0, 255, 0.4);
                }
                .btn-secondary { 
                  background: rgba(0, 217, 255, 0.2);
                  color: #00d9ff;
                  border: 1px solid #00d9ff;
                }
                .footer { padding: 30px; text-align: center; border-top: 1px solid rgba(255, 0, 255, 0.2); }
                .footer p { margin: 8px 0; color: #888; font-size: 12px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>NUEVA SOLICITUD</h1>
                  <p>Proyecto Entrante</p>
                </div>
                
                <div class="content">
                  <div class="alert-badge">ACCION REQUERIDA</div>
                  
                  <div class="details-box">
                    <h3>Informacion del Cliente</h3>
                    <div class="detail-row">
                      <div class="detail-label">Nombre:</div>
                      <div class="detail-value"><strong>${name}</strong></div>
                    </div>
                    <div class="detail-row">
                      <div class="detail-label">Email:</div>
                      <div class="detail-value"><a href="mailto:${email}" style="color: #00d9ff; text-decoration: none;">${email}</a></div>
                    </div>
                    ${phone ? `<div class="detail-row"><div class="detail-label">Teléfono:</div><div class="detail-value">${phone}</div></div>` : ""}
                    ${company ? `<div class="detail-row"><div class="detail-label">Empresa:</div><div class="detail-value">${company}</div></div>` : ""}
                  </div>
                  
                  <div class="details-box">
                    <h3>Detalles del Proyecto</h3>
                    <div class="message-content">${message}</div>
                  </div>
                  
                  <div class="action-buttons">
                    <a href="mailto:${email}" class="btn btn-primary">Responder al Cliente</a>
                    <a href="mailto:${email}?subject=Re: Tu solicitud en BLXK STUDIO" class="btn btn-secondary">Borrador</a>
                  </div>
                </div>
                
                <div class="footer">
                  <p>© 2025 BLXK STUDIO. Panel de Administración</p>
                  <p>Gestiona tus proyectos de forma eficiente</p>
                </div>
              </div>
            </body>
          </html>
        `,
      })
    }

    return Response.json({ data: null, error: null }) as any
  } catch (error) {
    console.error("[v0] Contact API error:", error)
    return Response.json({ error: (error as any).message }, { status: 500 }) as any
  }
}
