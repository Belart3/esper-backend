import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // ✅ Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // or use 'http://localhost:3000' for stricter control
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // ✅ Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { fullName, email, phone } = req.body;

  if (!fullName || !email || !phone) {
    return res.status(400).json({ message: 'Please fill out all fields' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const emailRecipients = process.env.EMAIL_DESTINATION.split(',');

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: emailRecipients,
      subject: `New Hero Form Submission - Esper Creations`,
      text: `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Nodemailer error:', error);
    res.status(500).json({ message: 'Email sending failed' });
  }
}
