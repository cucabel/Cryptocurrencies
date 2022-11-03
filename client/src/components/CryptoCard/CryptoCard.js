import React from "react";
import "./CryptoCard.css";

const CryptoCard = (props) => {
  const { cryptoName, marketCap, lastUsdPrice, lastEurPrice } = props.cryptoInfo;

  return (
      <tr>
        <td>{cryptoName}</td>
        <td className="d-none d-md-block">{marketCap}</td>
        <td>{lastUsdPrice}</td>
        <td>{lastEurPrice}</td>
      </tr>
  );
};

export default CryptoCard;
