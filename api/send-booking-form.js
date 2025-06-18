import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, phone, service, issue } = req.body;

  if (!name || !email || !phone || !service) {
    return res.status(400).json({ message: 'Please fill out all required fields in the form' });
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
      subject: `New Booking Form Submission - Esper Creations`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService(s) Needed: ${service}\nIssue Description: ${issue}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Nodemailer error:', error);
    res.status(500).json({ message: 'Email sending failed' });
  }
}
