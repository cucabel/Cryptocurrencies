const express = require("express");
const router = express.Router();

const Crypto = require("../models/crypto.model");

// POST '/api/cryptos'
router.post("/cryptos", (req, res, next) => {
  console.log('request body', req.body);

  Crypto.insertMany(req.body)
    .then((createdCrypto) => {
      console.log('createdcrypto', createdCrypto)
      res.status(201).json(createdCrypto);
    })
    .catch((err) => {
      console.log('if the json is invalid', err);
      res.status(400).json(err);
    });
});

// GET '/api/cryptos'
router.get("/cryptos", async (req, res, next) => {
  
  Crypto.find()
    .sort({ timestamp: -1, marketCap: -1 })
    .collation({ locale: "en_US", numericOrdering: true })
    .limit(10)
    .then((top10Cryptos) => {
      console.log('if the promise is resolved');
      res.status(200).json(top10Cryptos);
    })
    .catch((err) => {
      console.log('if the promise is rejected', err);
      res.status(500).json(err);
    });
});

module.exports = router;
