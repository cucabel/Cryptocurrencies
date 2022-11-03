const supertest = require("supertest");
const mockingoose = require('mockingoose');
const app = require("./app");
const Crypto = require("./models/crypto.model");
const mongoose = require("mongoose");

const api = supertest(app);

test("should_save_cryptos_in_the_database", async () => {
  mockingoose(Crypto).toReturn([
    {
      cryptoName: "Bitcoin",
      marketCap: "20758319489.99",
      lastUsdPrice: "84.27",
      lastEurPrice: "75.90",
      timestamp:
        "Fri Mar 04 2022 14:11:11 GMT+0100 (Central European Standard Time)",
    },
    {
      cryptoName: "Avalanche",
      marketCap: "20758319489.99",
      lastUsdPrice: "84.27",
      lastEurPrice: "75.90",
      timestamp:
        "Fri Mar 04 2022 14:11:11 GMT+0100 (Central European Standard Time)",
    },
    {
      cryptoName: "BNB",
      marketCap: "20758319489.99",
      lastUsdPrice: "84.27",
      lastEurPrice: "75.90",
      timestamp:
        "Fri Mar 04 2022 14:11:11 GMT+0100 (Central European Standard Time)",
    },
  ], 'insertMany');

  const cryptos = [
    {
      cryptoName: "Bitcoin",
      marketCap: "20758319489.99",
      lastUsdPrice: "84.27",
      lastEurPrice: "75.90",
      timestamp:
        "Fri Mar 04 2022 14:11:11 GMT+0100 (Central European Standard Time)",
    },
  ];

  const response = await api
    .post("/api/cryptos")
    .send(cryptos)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const contents = response.body.map((crypto) => crypto.cryptoName);

  //expect(response.statusCode).toBe(201);
  expect(response.body).toHaveLength(3);
  expect(contents).toContain("BNB");
});

test('should_catch_the_error_that_is_thrown_when_the_json_is_invalid', async () => {
  mockingoose(Crypto).toReturn(
    new Error('Crypto validation failed: cryptoName: Path `cryptoName` is required.'), 'insertMany');

  const cryptos = [
    {
      lastEurPrice: "35644.42",
      lastUsdPrice: "38968.04",
      marketCap: "739458281816.03",
      timestamp:
        "Sun Mar 06 2022 20:00:48 GMT+0100 (Central European Standard Time)",
    },
  ]

  const response = await api
    .post("/api/cryptos")
    .send(cryptos)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  expect(response.body._message).toContain("Crypto validation failed");
});

test('should_retrieve_cryptos_from_the_database', async () => {
  mockingoose(Crypto).toReturn([
    {
      cryptoName: "Bitcoin",
      marketCap: "20758319489.99",
      lastUsdPrice: "84.27",
      lastEurPrice: "75.90",
      timestamp:
        "Fri Mar 04 2022 14:11:11 GMT+0100 (Central European Standard Time)",
    },
    {
      cryptoName: "Avalanche",
      marketCap: "20758319489.99",
      lastUsdPrice: "84.27",
      lastEurPrice: "75.90",
      timestamp:
        "Fri Mar 04 2022 14:11:11 GMT+0100 (Central European Standard Time)",
    },
  ], 'find');

  const response = await api.get("/api/cryptos");
  expect(response.body).toHaveLength(2);
})

test('should_catch_the_error_that_is_thrown_when_the_promise_is_rejected', async () => {
  mockingoose(Crypto).toReturn(
    new Error('Error: cannot GET /api/cryptos (500)'), 'find');

  const response = await api.get("/api/cryptos")
    .expect(500);

  expect(response.res.statusMessage).toContain("Internal Server Error");
})

afterAll(() => {
  mongoose.connection.close();
});
