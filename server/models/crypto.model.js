const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const cryptoSchema = new Schema({
  cryptoName: {type: String, required: true},
  marketCap: {type: String, required: true},
  lastUsdPrice: {type: String, required: true},
  lastEurPrice: {type: String, required: true},
  timestamp: {type: String, required: true},
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;
