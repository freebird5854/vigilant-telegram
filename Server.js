import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(express.json());

// Example route - replace or expand with your real endpoints
app.get("/", (req, res) => {
  res.send("Mile High Rentals API is running 🚀");
});

// Example checkout route
app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Rental Item" },
            unit_amount: 5000 // $50.00
          },
          quantity: 1
        }
      ],
      success_url: "https://yourdomain.com/success",
      cancel_url: "https://yourdomain.com/cancel"
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
