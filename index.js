const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Contact form route
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  console.log("📩 New message received from website:");
  console.log("───────────────────────────────");
  console.log(`👤 Name: ${name}`);
  console.log(`📧 Email: ${email}`);
  console.log(`💬 Message: ${message}`);
  console.log("───────────────────────────────");

  res.json({ success: true, message: "Message received successfully (check console log)" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});




