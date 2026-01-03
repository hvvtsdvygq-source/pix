import express from "express"
import fetch from "node-fetch"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

const EVOPAY_API_KEY = process.env.EVOPAY_API_KEY
const EVOPAY_PIX_URL = "https://pix.evopay.cash/v1/pix"

app.post("/pix", async (req, res) => {
  try {
    const { amount } = req.body

    const response = await fetch(EVOPAY_PIX_URL, {
      method: "POST",
      headers: {
        "API-Key": EVOPAY_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: Number(amount),
        payerName: "Cliente",
        payerDocument: "00000000000"
      })
    })

    const data = await response.json()
    res.json(data)

  } catch (err) {
    res.status(500).json({ error: "Erro ao gerar PIX" })
  }
})

app.listen(3000, () => {
  console.log("PIX BACKEND ONLINE")
})
