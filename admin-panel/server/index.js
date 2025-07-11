import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const app = express();
app.use(express.json());

app.post("/api/groq/talk", (req, res) => {
  const messages = req.body.messages || [];
  const lastUserMessage = messages.reverse().find(m => m.role === "user");
  res.json({
    choices: [
      { message: { role: "assistant", content: `Echo: ${lastUserMessage ? lastUserMessage.content : "No message"}` } }
    ]
  });
});

app.post("/api/groq", async (req, res) => {
  try {
    const API_KEY = process.env.VITE_GROQ_API_KEY;
    const API_URL = process.env.VITE_GROQ_API_URL;
    if (!API_KEY || !API_URL) {
      return res.status(500).json({ error: "Groq API key or URL is not set in environment variables." });
    }
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: req.body.messages,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || "API request failed" });
    }
    res.json(data);
  } catch (error) {
    console.error("Groq API error:", error);
    res.status(500).json({ error: error.message || "Unknown error" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
