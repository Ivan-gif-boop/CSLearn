// backend/routes/auth.js
import express from "express";
import bcrypt from "bcrypt";
import db from '../config/db.config.js'; 

const router = express.Router();

// Register endpoint
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    // Check if user already exists
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const [result] = await db.query(
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
      [fullName, email, hashedPassword, role]
    );

    res.status(201).json({
      message: "Registration successful",
      user: {
        id: result.insertId,
        username: fullName,
        email: email,
        role: role
      }
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// Login endpoint
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const [users] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = users[0];

    // Compare password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Return user data (excluding password)
    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

// Test route: get all users (for debugging - remove in production)
router.get("/users", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT id, username, email, role, created_at FROM users");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database query failed" });
  }
});

export default router;