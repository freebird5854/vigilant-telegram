import express from "express";
import Stripe from "stripe";
import cors from "cors";

const app = express();

// ✅ Use your Stripe key from Render Environment Variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

// Endpoint to create a checkout session
app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Rental Application Fee" },
            unit_amount: 5000, // $50
          },
          quantity: 1,
        },
      ],
      success_url: "https://mile-highrentals.com/thankyou.html",
      cancel_url: "https://mile-highrentals.com/cancel.html",
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe session error:", err);
    res.status(500).json({ error: "Unable to create checkout session" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
