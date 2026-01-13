import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to escape HTML
const escapeHtml = (text) => {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Use App Password for Gmail
    },
  });
};

// Admission Inquiry endpoint
app.post('/api/admission-inquiry', async (req, res) => {
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

    res.json({
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
});

// Career Application endpoint
app.post('/api/career-application', async (req, res) => {
  try {
    const { name, email, phone, position, experience, resumeLink, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !position) {
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
      subject: `New Career Application - ${escapeHtml(name)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8B1538; border-bottom: 2px solid #8B1538; padding-bottom: 10px;">
            New Career Application
          </h2>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p><strong>Applicant Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
            <p><strong>Position Applied For:</strong> ${escapeHtml(position)}</p>
            ${experience ? `<p><strong>Experience:</strong> ${escapeHtml(experience)}</p>` : ''}
            ${resumeLink ? `<p><strong>Resume Link:</strong> <a href="${escapeHtml(resumeLink)}" target="_blank">${escapeHtml(resumeLink)}</a></p>` : ''}
            ${message ? `<p><strong>Cover Letter / Message:</strong><br/>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>` : ''}
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This application was submitted through the Dawn Buds Model School website.
          </p>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Optional: Send confirmation email to the applicant
    const confirmationMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for your interest in joining Dawn Buds Model School',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8B1538; border-bottom: 2px solid #8B1538; padding-bottom: 10px;">
            Thank You, ${escapeHtml(name)}!
          </h2>
          <p>We have received your application for the position of <strong>${escapeHtml(position)}</strong>.</p>
          <p>Our HR team will review your application and contact you shortly at <strong>${escapeHtml(phone)}</strong> or <strong>${escapeHtml(email)}</strong>.</p>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p><strong>Your Application Details:</strong></p>
            <ul>
              <li>Position: ${escapeHtml(position)}</li>
              ${experience ? `<li>Experience: ${escapeHtml(experience)}</li>` : ''}
              ${resumeLink ? `<li>Resume Link: <a href="${escapeHtml(resumeLink)}" target="_blank">View Resume</a></li>` : ''}
            </ul>
          </div>
          <p style="margin-top: 20px;">If you have any questions, please feel free to contact us at:</p>
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

    res.json({
      success: true,
      message: 'Application submitted successfully',
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit application. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
