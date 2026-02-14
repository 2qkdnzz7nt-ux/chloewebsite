import { NextResponse } from "next/server";
import { Resend } from 'resend';

// Use a dummy key if env var is missing to prevent build errors
const resend = new Resend(process.env.RESEND_API_KEY || 're_123456789');

export async function POST(req: Request) {
  try {
    const { email, orderId, items, total } = await req.json();

    const htmlContent = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>Order Confirmation</h1>
          <p>Thank you for your order!</p>
          <p>Order ID: <strong>${orderId}</strong></p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <thead>
              <tr style="border-bottom: 1px solid #ddd; text-align: left;">
                <th style="padding: 10px;">Item</th>
                <th style="padding: 10px;">Qty</th>
                <th style="padding: 10px;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${items
                .map(
                  (item: any) => `
                <tr style="border-bottom: 1px solid #eee;">
                  <td style="padding: 10px;">${item.name}</td>
                  <td style="padding: 10px;">${item.quantity}</td>
                  <td style="padding: 10px;">$${(
                    item.price * item.quantity
                  ).toFixed(2)}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold;">Total:</td>
                <td style="padding: 10px; font-weight: bold;">$${total.toFixed(
                  2
                )}</td>
              </tr>
            </tfoot>
          </table>
          
          <p style="margin-top: 20px;">We will notify you when your order ships.</p>
        </div>
      `;

    try {
      await resend.emails.send({
        from: 'Chloe Website <onboarding@resend.dev>',
        to: email,
        subject: `Order Confirmation #${orderId}`,
        html: htmlContent
      });
    } catch (emailError) {
      console.error("Error sending confirmation email:", emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing email request:", error);
    return NextResponse.json(
      { error: "Error processing email request" },
      { status: 500 }
    );
  }
}
