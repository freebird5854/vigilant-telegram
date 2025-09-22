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
  stripe = Stripe(process.env.
