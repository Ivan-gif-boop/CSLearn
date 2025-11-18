// backend/controllers/authController.js
import bcrypt from 'bcrypt';
import { db } from '../../config/db.config.js';

export const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const [result] = await db.execute(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, role || 'student']
    );
    res.status(201).json({ message: 'User registered', userId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Incorrect password' });

    res.json({ message: 'Login successful', userId: user.id, role: user.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
