import { createTransporter, escapeHtml } from './utils/email.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  try {
    const { name, email, phone, classInterest, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !classInterest) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    // Create transporter
    const transporter = createTransporter();

    // Email content for school
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL || 'dawnbudsmodelschool@gmail.com',
      subject: `New Admission Inquiry - ${escapeHtml(name)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8B1538; border-bottom: 2px solid #8B1538; padding-bottom: 10px;">
            New Admission Inquiry
          </h2>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p><strong>Parent's Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
            <p><strong>Class Interested:</strong> ${escapeHtml(classInterest)}</p>
            ${message ? `<p><strong>Message:</strong> ${escapeHtml(message)}</p>` : ''}
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This inquiry was submitted through the Dawn Buds Model School website.
          </p>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Optional: Send confirmation email to the parent
    const confirmationMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for your interest in Dawn Buds Model School',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8B1538; border-bottom: 2px solid #8B1538; padding-bottom: 10px;">
            Thank You, ${escapeHtml(name)}!
          </h2>
          <p>We have received your admission inquiry for <strong>${escapeHtml(classInterest)}</strong>.</p>
          <p>Our admissions team will review your inquiry and contact you shortly at <strong>${escapeHtml(phone)}</strong> or <strong>${escapeHtml(email)}</strong>.</p>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p><strong>Your Inquiry Details:</strong></p>
            <ul>
              <li>Class Interested: ${escapeHtml(classInterest)}</li>
              ${message ? `<li>Your Message: ${escapeHtml(message)}</li>` : ''}
            </ul>
          </div>
          <p style="margin-top: 20px;">If you have any urgent questions, please feel free to contact us at:</p>
          <p>
            <strong>Email:</strong> dawnbudsmodelschool@gmail.com<br/>
            <strong>Phone:</strong> +91 98765 43210
          </p>
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            Best regards,<br/>
            Dawn Buds Model School<br/>
            Begumpet, Hyderabad
          </p>
        </div>
      `,
    };

    // Send confirmation email (optional, can be removed if not needed)
    try {
      await transporter.sendMail(confirmationMailOptions);
    } catch (confirmationError) {
      console.error('Confirmation email failed:', confirmationError);
      // Don't fail the request if confirmation email fails
    }

    res.status(200).json({
      success: true,
      message: 'Inquiry submitted successfully',
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit inquiry. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
}
