import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const EVOPAY_PIX_URL = "https://pix.evopay.cash/v1/pix";

app.post("/pix", async (req, res) => {
  try {
    const { valor, produto } = req.body;

    if (!valor || valor <= 0) {
      return res.status(400).json({ error: "Valor inválido" });
    }

    const payload = {
      amount: valor,
      payerName: "Cliente Site",
      payerDocument: "00000000000"
    };

    const response = await fetch(EVOPAY_PIX_URL, {
      method: "POST",
      headers: {
        "API-Key": process.env.EVOPAY_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!data.qrCodeText) {
      return res.status(500).json({ error: "Erro ao gerar PIX" });
    }

    res.json({
      produto,
      valor,
      pixCode: data.qrCodeText,
      qrCodeBase64: data.qrCodeBase64
    });

  } catch (err) {
    res.status(500).json({ error: "Erro interno" });
  }
});

app.listen(3000, () => {
  console.log("Backend PIX rodando");
});
