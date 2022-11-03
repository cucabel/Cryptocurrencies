import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { act } from "react-dom/test-utils";

import data from "../../allCryptos";
import apiCryptos from "../../top10Cryptos";
import dbCryptos from "../../dbCryptos";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";
let mock;

beforeAll(() => {
  mock = new MockAdapter(axios);
});

afterEach(() => {
  mock.reset();
});

test("should_get_the_USD_rate", async () => {
  mock
    .onGet("https://openexchangerates.org/api/latest.json?app_id=485c2cbe730248d2bd9cbc69c8920dd1")
    .reply(200, {
      rates: {
        EUR: 0.914892,
      },
    });

  mock
    .onGet("https://api.coincap.io/v2/assets")
    .reply(200, {
      data
    });

  mock
    .onPost("http://localhost:5000/api/cryptos").reply(200, apiCryptos) // es esto lo que esta fallando
  
  mock
   .onGet("http://localhost:5000/api/cryptos")
   .reply(200, dbCryptos );
   
   await act(async () => {
     render(<Dashboard />);
    });
    
    expect(await screen.findByText("Bitcoin")).toBeInTheDocument();
    expect(await screen.findByText("35644.42")).toBeInTheDocument();
    expect(await screen.findByText("38968.04")).toBeInTheDocument();
    expect(await screen.findByText("739458281816.03")).toBeInTheDocument();
});
