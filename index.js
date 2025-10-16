const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000; // <-- use Render's port if available

// Middleware
app.use(cors());
app.use(express.json());

// POST route for contact form
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  console.log("📩 New message received:");
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Message: ${message}`);
  res.json({ success: true, message: "Message received successfully!" });
});

// ✅ Only one server listener
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});


