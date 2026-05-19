import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

interface OrderItem {
  title: string;
  format: string;
  price: number;
  quantity: number;
}

interface OrderEmailData {
  customerName: string;
  email: string;
  orderId: string;
  items: OrderItem[];
  totalAmount: number;
  orderType: 'pdf' | 'printed' | 'mixed';
  downloadUrl?: string;
}

export async function sendOrderConfirmation(data: OrderEmailData) {
  const itemRows = data.items
    .map(
      (item) =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;">${item.title}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;">${item.format}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;">${item.quantity}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;">₹${(item.price / 100).toFixed(2)}</td>
        </tr>`
    )
    .join('');

  const downloadSection =
    data.orderType === 'pdf' || data.orderType === 'mixed'
      ? `<div style="background:#FFF3E0;padding:16px;border-radius:8px;margin:16px 0;text-align:center;">
          <p style="margin:0 0 8px;font-weight:600;color:#E65100;">📥 Download Your PDF Notes</p>
          <a href="${data.downloadUrl}" style="display:inline-block;background:#FF9933;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;">
            Download Now
          </a>
          <p style="margin:8px 0 0;font-size:12px;color:#666;">Link expires in 24 hours. Max 3 downloads.</p>
        </div>`
      : '';

  const deliverySection =
    data.orderType === 'printed' || data.orderType === 'mixed'
      ? `<div style="background:#E8F5E9;padding:16px;border-radius:8px;margin:16px 0;">
          <p style="margin:0;font-weight:600;color:#2E7D32;">🚚 Estimated Delivery: 4-7 business days</p>
          <p style="margin:4px 0 0;font-size:13px;color:#666;">Track your order at ${process.env.NEXT_PUBLIC_APP_URL}/track-order</p>
        </div>`
      : '';

  const html = `
    <div style="max-width:600px;margin:0 auto;font-family:'DM Sans',Arial,sans-serif;color:#333;">
      <div style="background:#0B0C10;padding:24px;text-align:center;">
        <h1 style="margin:0;color:#FF9933;font-size:24px;">Pariksha<span style="font-weight:300;color:#F4F1EB">Notes</span></h1>
      </div>
      <div style="padding:24px;">
        <h2 style="color:#0B0C10;margin:0 0 8px;">Order Confirmed! ✅</h2>
        <p style="color:#666;margin:0 0 20px;">Hi ${data.customerName}, your order has been placed successfully.</p>
        
        <div style="background:#f9f9f9;padding:12px;border-radius:8px;margin-bottom:16px;">
          <p style="margin:0;font-weight:600;">Order ID: <span style="color:#FF9933;">${data.orderId}</span></p>
        </div>

        <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
          <thead>
            <tr style="background:#f5f5f5;">
              <th style="padding:8px 12px;text-align:left;">Item</th>
              <th style="padding:8px 12px;text-align:left;">Format</th>
              <th style="padding:8px 12px;text-align:left;">Qty</th>
              <th style="padding:8px 12px;text-align:left;">Price</th>
            </tr>
          </thead>
          <tbody>${itemRows}</tbody>
        </table>

        <div style="text-align:right;padding:12px;background:#f9f9f9;border-radius:8px;">
          <p style="margin:0;font-size:18px;font-weight:700;color:#0B0C10;">Total: ₹${(data.totalAmount / 100).toFixed(2)}</p>
        </div>

        ${downloadSection}
        ${deliverySection}

        <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
        <p style="font-size:12px;color:#999;text-align:center;margin:0;">
          © ${new Date().getFullYear()} ParikshaNotes — Padhlo. Paaso. Prove Karo.
        </p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: data.email,
    subject: `Order Confirmed — ${data.orderId} | ParikshaNotes`,
    html,
  });
}

export async function sendDownloadLink(email: string, customerName: string, orderId: string, downloadUrl: string) {
  const html = `
    <div style="max-width:600px;margin:0 auto;font-family:'DM Sans',Arial,sans-serif;color:#333;">
      <div style="background:#0B0C10;padding:24px;text-align:center;">
        <h1 style="margin:0;color:#FF9933;font-size:24px;">Pariksha<span style="font-weight:300;color:#F4F1EB">Notes</span></h1>
      </div>
      <div style="padding:24px;text-align:center;">
        <h2 style="color:#0B0C10;">Your Download Link</h2>
        <p>Hi ${customerName}, here's your download link for order <strong>${orderId}</strong>:</p>
        <a href="${downloadUrl}" style="display:inline-block;background:#FF9933;color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:600;margin:16px 0;">
          Download PDF Notes
        </a>
        <p style="font-size:12px;color:#666;">Link expires in 24 hours. Max 3 downloads.</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: `Download Your Notes — ${orderId} | ParikshaNotes`,
    html,
  });
}
