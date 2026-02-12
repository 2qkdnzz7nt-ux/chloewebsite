import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const order = await prisma.order.update({
      where: { id },
      data: body,
    });

    // Send email if status is changed to SHIPPED
    if (body.status === "SHIPPED" && order.customerEmail) {
      try {
        console.log(`Sending shipping email to ${order.customerEmail}...`);
        
        await resend.emails.send({
          from: 'Chloe Website <onboarding@resend.dev>',
          to: order.customerEmail,
          subject: `Order Shipped #${order.id}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h1>Your Order Has Shipped!</h1>
              <p>Great news! Your order is on its way.</p>
              <p>Order ID: <strong>${order.id}</strong></p>
              <p>Tracking Number: <strong>${order.trackingNumber || "Not provided"}</strong></p>
              <p style="margin-top: 20px;">You can track your package using the courier's website.</p>
            </div>
          `
        });
        
        console.log(`Shipping email sent to ${order.customerEmail}`);
      } catch (emailError) {
        console.error("Error sending shipping email:", emailError);
      }
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { error: "Error updating order" },
      { status: 500 }
    );
  }
}
