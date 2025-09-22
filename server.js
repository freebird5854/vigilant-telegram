import express from "express";
import Stripe from "stripe";
import cors from "cors";

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Mile High Rentals backend is live"));

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { unit } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{
        price_data: {
          currency: "usd",
          product_data: { name: `Rental Application Fee — Unit ${unit}` },
          unit_amount: 5000
        },
        quantity: 1
      }],
      mode: "payment",
      success_url: "https://mile-highrentals.com/?success=true",
      cancel_url: "https://mile-highrentals.com/?canceled=true"
    });
    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
