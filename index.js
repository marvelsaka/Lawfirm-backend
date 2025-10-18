const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// POST route for contact form
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  console.log("📩 New message received from website:");
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Message: ${message}`);

  try {
    // Create a transporter using your Namecheap email
    const transporter = nodemailer.createTransport({
      host: "mail.privateemail.com",
      port: 465,
      secure: true, // use SSL
     auth: {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS
}

    });

    // Send the email
    await transporter.sendMail({
      from: `"${name}" <info@yourdomain.com>`, // from your firm email
      to: "info@yourdomain.com", // where you’ll receive it
      subject: `New Contact Message from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
    });

    console.log("✅ Email sent successfully!");
    res.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});



