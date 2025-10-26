import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: "You are a helpful AI assistant." },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();

    // 🔍 Log full response for debugging
    console.log("Groq API response:", JSON.stringify(data, null, 2));

    if (!response.ok) {
      // If Groq returned an error (like invalid key)
      return res.status(response.status).json({
        error: data.error?.message || "Groq API returned an error.",
      });
    }

    // ✅ Send the reply back
    res.json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: error.message || "Server error occurred" });
  }
});

app.listen(3000, () =>
  console.log("✅ Server running on http://localhost:3000")
);
