const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const Stripe = require("stripe");

// Load env vars
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Stripe setup (only if key exists)
let stripe;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = Stripe(process.env.STRIPE_SECRET_KEY);
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, "public")));

// Example API route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server running" });
});

// Example Stripe route
app.post("/api/checkout", async (req, res) => {
  if (!stripe) {
    return res.status(500).json({ error: "Stripe not configured" });
  }
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: req.body.items,
      mode: "payment",
      success_url: "https://mile-highrentals.com/success",
      cancel_url: "https://mile-highrentals.com/cancel",
    });
    res.json({ id: session.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Catch-all → serve index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
