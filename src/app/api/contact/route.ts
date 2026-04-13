import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend conditionally.
// If RESEND_API_KEY is missing or explicitly set to 'mock', it will run in fallback simulation mode.
const apiKey = process.env.RESEND_API_KEY;
const isMockMode = !apiKey || apiKey.toLowerCase() === 'mock';
const resend = isMockMode ? null : new Resend(apiKey);
const recipient = process.env.CONTACT_EMAIL_RECIPIENT || 'concierge@grupozakher.com';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, language, type, dates, guests, message, property } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    const emailSubject = `[Zakher Website] ${type || 'Inquiry'} from ${name}`;
    
    // Construct HTML Email payload
    const htmlBody = `
      <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
        <h2 style="color: #000; border-bottom: 2px solid #ddd; padding-bottom: 10px;">New Inquiry: ${property || 'Grupo Zakher'}</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr style="background: #f9f9f9;"><td style="padding: 10px; font-weight: bold; width: 30%;">Name</td><td style="padding: 10px;">${name}</td></tr>
          <tr><td style="padding: 10px; font-weight: bold;">Email</td><td style="padding: 10px;"><a href="mailto:${email}">${email}</a></td></tr>
          <tr style="background: #f9f9f9;"><td style="padding: 10px; font-weight: bold;">Phone</td><td style="padding: 10px;">${phone || 'N/A'}</td></tr>
          <tr><td style="padding: 10px; font-weight: bold;">Language Preference</td><td style="padding: 10px;">${language || 'N/A'}</td></tr>
          <tr style="background: #f9f9f9;"><td style="padding: 10px; font-weight: bold;">Inquiry Type</td><td style="padding: 10px;">${type || 'General'}</td></tr>
          <tr><td style="padding: 10px; font-weight: bold;">Requested Dates</td><td style="padding: 10px;">${dates || 'N/A'}</td></tr>
          <tr style="background: #f9f9f9;"><td style="padding: 10px; font-weight: bold;">Guests</td><td style="padding: 10px;">${guests || 'N/A'}</td></tr>
        </table>
        
        <h3 style="margin-top: 30px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Message</h3>
        <p style="white-space: pre-wrap; line-height: 1.5; background: #fdfdfd; padding: 15px; border-left: 4px solid #ccc;">${message}</p>
        
        <div style="margin-top: 40px; font-size: 12px; color: #888; text-align: center;">
          <p>This message was securely routed via the Agility Multi-Tenant Platform.</p>
        </div>
      </div>
    `;

    if (isMockMode) {
      // Simulate API latency
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.log('\n[MOCK EMAIL MODE] Contact Form Submitted');
      console.log(`To: ${recipient}`);
      console.log(`Subject: ${emailSubject}`);
      console.log(`Payload:`, { name, email, phone, language, type, dates, guests, property });
      console.log(`Message: ${message}\n`);
      
      return NextResponse.json({ success: true, mocked: true });
    }

    // Live Mode Delivery (Requires Verified Domain in Resend Account)
    const { data, error } = await resend!.emails.send({
      from: 'Grupo Zakher Concierge <noreply@agility-systems.com>', // MUST be verified in sender's Resend account
      to: recipient,
      replyTo: email,
      subject: emailSubject,
      html: htmlBody,
    });

    if (error) {
      console.error('[Resend Error]', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });

  } catch (err: any) {
    console.error('[API/Contact Error]', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred processing your request.' },
      { status: 500 }
    );
  }
}
