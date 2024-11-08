const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

dotenv.config();

const PORT = process.env.PORT || 9000;

// connect db
mongoose
  .connect(process.env.MONGOOSEDB_RUL)
  .then(() => console.log("db connected"))
  .catch((err) => console.error("db connection error:", err));

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'data/image')));

// Routes
const databaseSeeder = require("./databaseSeeder");
const userRoute = require("./routes/User");
const productRoute = require("./routes/Product");
const orderRoute = require("./routes/Order");

app.use("/api/seed", databaseSeeder);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);

// PayPal config route
app.use("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
