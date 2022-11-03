import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import CryptoCard from "./CryptoCard";

test("renders content", () => {
  const crypto = {
    cryptoName: "USD Coin",
    lastEurPrice: "0.92",
    lastUsdPrice: "1.00",
    marketCap: "53033937120.01",
  };

  const component = render(<CryptoCard cryptoInfo={crypto}/>)

  component.getByText("USD Coin");
  component.getByText("0.92");

});