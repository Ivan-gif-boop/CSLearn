// backend/config/db.config.js
import mysql from 'mysql2/promise';

export const db = await mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',  // your MySQL password
  database: 'cslearn_db'
});

// Optional: test connection
try {
  await db.getConnection();
  console.log("✅ Connected to MySQL database.");
} catch (err) {
  console.error("❌ Database connection failed:", err);
}

export default db;
