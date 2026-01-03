import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

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
        payerName: "Cliente",
        payerDocument: "00000000000"
      })
    });

    const data = await response.json();
    res.json(data);

  } catch (e) {
    res.status(500).json({ error: "Erro PIX" });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("PIX BACKEND ONLINE");
});
