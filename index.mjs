import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
const emailRecipients = process.env.EMAIL_DESTINATION.split(',');

dotenv.config();
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.post('/send-hero-form', async (req, res) => {
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
});

app.post('/send-booking-form', async (req, res) => {
  const { name, email, phone, service, issue } = req.body;

  if (!name || !email || !phone || !service ) {
    return res.status(400).json({ message: 'Please fill all required fields in the form' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

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
});

app.listen(port, () => {
  console.log(`Nodemailer backend listening on port ${port}`);
});