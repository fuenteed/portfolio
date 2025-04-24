// Serverless function for Vercel to handle contact form submissions
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  // Validate inputs
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Log environment variables for debugging
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('RECIPIENT_EMAIL:', process.env.RECIPIENT_EMAIL);
    console.log('EMAIL_SERVICE:', process.env.EMAIL_SERVICE);

    // Determine email provider and configure transporter accordingly
    let transporterConfig;
    
    const emailService = process.env.EMAIL_SERVICE || 'outlook';
    
    if (emailService === 'gmail') {
      transporterConfig = {
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      };
    } else if (emailService === 'outlook' || emailService === 'hotmail') {
      transporterConfig = {
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      };
    } else {
      // Default to a generic SMTP configuration
      transporterConfig = {
        host: process.env.EMAIL_HOST || 'smtp.office365.com',
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      };
    }
    
    const transporter = nodemailer.createTransport(transporterConfig);

    // Test connection
    await transporter.verify();
    console.log('SMTP connection verified successfully');

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL, // Your email where you want to receive messages
      subject: `Portfolio Contact Form: Message from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
      html: `
        <h3>New message from your portfolio contact form</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Failed to send message', error: error.message });
  }
} 