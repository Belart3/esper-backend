// nodemailer-backend/index.js
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.post('/send-hero-email', async (req, res) => {
  const { fullName, email, phone } = req.body;

  if (!fullName || !email || !phone) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or other SMTP provider
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: 'enochbelawu8@gmail.com',
      subject: 'New Hero Form Submission',
      text: `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Nodemailer error:', error);
    res.status(500).json({ message: 'Email sending failed' });
  }
});

app.post('/send-booking-email', async (req, res) => {
  const { name, email, phone, service, issue } = req.body;

  if (!name || !email || !phone || !service || !issue) {
    return res.status(400).json({ message: 'Missing fields' });
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
      to: 'enochbelawu8@gmail.com',
      subject: 'New Booking Form Submission',
      text: `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Nodemailer error:', error);
    res.status(500).json({ message: 'Email sending failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Nodemailer backend listening on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Nodemailer backend is running!');
  console.log('Nodemailer backend is running!');
});