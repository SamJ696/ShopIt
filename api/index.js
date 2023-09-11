const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

const app = express();
dotenv.config();
const port = 8000;
const cors = require("cors");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.listen(port, () => {
  console.log("Server is running on port 8000");
});

const User = require("./models/user");
const Order = require("./models/order");

// Function to send verification email to the new user.
const sendVerificationEmail = async (email, verificationToken) => {
  // Create a nodemailer transport
  const transporter = nodemailer.createTransport({
    // Configure the email service.
    service: "gmail",
    auth: {
      user: "jsam696@gmail.com",
      pass: "zdddfbhvnwuzmgkz",
    },
  });

  // Compose the Email message
  const mailOptions = {
    from: "no-reply_shopper.com",
    to: email,
    subject: "Email Verification",
    text: `Please click the link below to verify your email : http://localhost:8000/verify/${verificationToken}`,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error sending verify email", error);
  }
};

// Endpoint to Register into the application.
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if already registered.
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create a new user.
    const newUser = new User({ name, email, password });

    // Generate and store the verification token.
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    // Save the user to the database.
    await newUser.save();

    // Send verification email to the user.
    sendVerificationEmail(newUser.email, newUser.verificationToken);

    res.status(200).json({ message: "Registration Successful." });
  } catch (error) {
    console.log("Error Registering User", error);
    res.status(500).json({ message: "Registration Failed sjdfhsf" });
  }
});

// Endpoint to verify the email.
app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    // Find the user with the gven verification token.
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }

    // Mark the user as verified.
    user.verified = true;
    user.verificationToken = undefined;

    await user.save();

    res.status(200).json({ message: "Email verified successfully." });
  } catch (error) {
    res.status(500).json({ message: "Email Verification Failed." });
  }
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");

  return secretKey;
};

const secretKey = generateSecretKey();

// Endpoint to login the user.
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists.
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid Email or Password." });
    }

    // Check if the password is right or not.
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    // Generate a Token.
    const token = jwt.sign({ userId: user._id }, secretKey);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login Failed." });
  }
});

// Endpoint to store a new address to backend.
app.post("/addresses", async (req, res) => {
  try {
    const { userId, address } = req.body;

    // Find the user by userId.
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User Not Found" });
    }

    // Add the new address to the user's adresses array.
    user.addresses.push(address);

    // Save the updated user in the backend.
    await user.save();

    res.status(200).json({ message: "Address created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding address" });
  }
});

// Endpoint to get all the addressses of a particular user.
app.get("/addresses/:userId", async (req, res) => {
  try {
    // Access user id for addresses.
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const addresses = user.addresses;
    res.status(200).json({ addresses });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving addresses" });
  }
});

// Endpoint to store all the orders.
app.post("/orders", async (req, res) => {
  try {
    const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } =
      req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    // Create an array of product objects from the cart items.
    const products = cartItems.map((item) => ({
      name: item.title,
      quantity: item.quantity,
      price: item.price,
      image: item.image,
    }));

    // Create a new order.
    const order = new Order({
      user: userId,
      products: products,
      totalPrice: totalPrice,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
    });

    await order.save();

    res.status(200).json({ message: "Order created successfully." });
  } catch (error) {
    console.log("Error creating orders", error);
    res.status(500).json({ message: "Error creating orders" });
  }
});

// Get the user profile.
app.get("/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user Profile" });
  }
});

// Order in profile
app.get("/orders/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const orders = await Order.find({ user: userId }).populate("user");

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Error in order for profile" });
  }
});
