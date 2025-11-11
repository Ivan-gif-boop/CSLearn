// backend/routes/auth.js
import express from "express";
import db from '../config/config/db.config.js';



const router = express.Router();

// Test route: get all users
router.get("/users", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database query failed" });
  }
});

export default router;
