import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();
    console.log("📩 Received form submission:", { name, email, message });

    console.log(process.env.EMAIL_USER, "evafdsf");

    // Transporter setup
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Use App Password, not regular password
      },
    });

    // Verify the transporter
    await transporter.verify();
    console.log("✅ Transporter verified");

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECIPIENT,
      subject: `New Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 24px; background-color: #f9f9f9; border-radius: 10px; border: 1px solid #e0e0e0; max-width: 600px; margin: auto;">
    <h2 style="color: #4f46e5; margin-bottom: 20px;">📬 New Message from MonkeyMadness Contact Form</h2>
    
    <table style="width: 100%; font-size: 16px; color: #333;">
      <tr>
        <td style="padding: 8px 0;"><strong>👤 Name:</strong></td>
        <td style="padding: 8px 0;">${name}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0;"><strong>📧 Email:</strong></td>
        <td style="padding: 8px 0;">${email}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; vertical-align: top;"><strong>📝 Message:</strong></td>
        <td style="padding: 8px 0;">
          <div style="background-color: #fff; padding: 12px; border-radius: 6px; border: 1px solid #ddd;">
            ${message}
          </div>
        </td>
      </tr>
    </table>
  </div>
`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("📧 Email sent:", info.response);

    return NextResponse.json(
      { success: true, message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Email Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email",
        error: error.message, // temp: send error for debugging
      },
      { status: 500 }
    );
  }
}
