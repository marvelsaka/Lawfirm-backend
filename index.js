 const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());


const nodemailer = require("nodemailer");



app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  console.log("📩 New message received:");
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Message: ${message}`);

  // Use Brevo (Sendinblue) SMTP
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // use true for port 465
    auth: {
      user: "marvellousisaac05@gmail.com", // usually your Brevo email
      pass: "9906ba001@smtp-brevo.com" // the SMTP key you copied
    }
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: "info@yourlawfirm.com", // wherever you want to receive it
    subject: "📩 New Contact Form Message",
    text: `From: ${name} (${email})\n\nMessage:\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "✅ Email sent successfully!" });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ success: false, message: "Email failed to send." });
  }
});



// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
