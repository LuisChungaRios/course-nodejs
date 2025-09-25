const express = require("express");
const axios = require("axios");
const router = express.Router();
const Transaction = require("../models/transaction");
const niubizConf = require("../config/niubiz");


router.post("/create", async (req, res) => {
  try {
    const { v4: uuidv4 } = await import("uuid");
    // GET ACCESS TOKEN
    const PURCHASE_NUMBER = uuidv4()

    const { amount, cardholderName, cardholderLastname, email } = req.body

    const responseToken = await axios.get(niubizConf.accessTokenUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${niubizConf.username}:${niubizConf.password}`).toString("base64")}`
      }
    })

    console.log('responseToken', responseToken.data)

    const payload = {
      "channel": "web",
      "amount": amount.toFixed(2),
      "antifraud": {
        "clientIp": req.ip,
        "merchantDefineData": {
          "MDD4": "integraciones@niubiz.com.pe",
          "MDD32": "JD1892639123",
          "MDD75": "Registrado",
          "MDD77": 458
        }

      },
      "dataMap": {
        "cardholderCity": "Lima",
        "cardholderCountry": "PE",
        "cardholderAddress": "Av Jose Pardo 831",
        "cardholderPostalCode": "12345",
        "cardholderState": "LIM",
        "cardholderPhoneNumber": "987654321"
      }
    }

    console.log("PAYLOAD", payload)

    const responseSessionToken = await axios.post(niubizConf.sessionTokenUrl, payload, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${responseToken.data}`
      }
    })

    console.log('responseSessionToken', responseSessionToken.data)

    const sessionKey = responseSessionToken.data.sessionKey


    return res.json({
      checkoutScriptUrl: niubizConf.checkoutScriptUrl,
      sessionToken: sessionKey,
      merchantId: niubizConf.merchantId,
      purchaseNumber: PURCHASE_NUMBER,
      amount: amount.toFixed(2),
    });
  } catch (err) {
    console.log(err)
    console.error("Error iniciando pago:", err.response?.data || err.message);
    return res.status(500).json({ error: "Error iniciando pago" });
  }
});

// Ruta de callback/redirect tras pago
router.post("/callback", async (req, res) => {
  const body = req.body;
  console.log("Callback Niubiz:", body);

  const query = req.query;
  console.log("Query Niubiz:", query);

  return res.redirect("/payment-success.html");
});

module.exports = router;
