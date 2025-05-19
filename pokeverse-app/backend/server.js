const express = require("express");
const cors = require("cors");
const supabase = require("./supabase");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Sample Endpoint
app.get("/api/health", (req, res) => {
  res.json({ message: "API is running!" });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
