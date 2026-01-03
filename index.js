import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

/* 🔓 LIBERAR CORS TOTAL */
app.use(cors({
  origin: "*",
  methods: ["POST", "GET", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

/* 🔁 ROTA PIX */
app.post("/pix", async (req, res) => {
  try {
    const { amount } = req.body;

    const response = await fetch("https://pix.evopay.cash/v1/pix", {
      method: "POST",
      headers: {
        "API-Key": process.env.EVOPAY_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: Number(amount),
        payerName: "Cliente Flash Contas",
        payerDocument: "00000000000"
      })
    });

    const data = await response.json();
    res.json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao gerar PIX" });
  }
});

/* 🚀 START */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("API PIX ONLINE"));
