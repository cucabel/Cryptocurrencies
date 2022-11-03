import React, { Component } from "react";
import axios from "axios";
import { Container, Table } from "react-bootstrap";
import CryptoCard from "../../components/CryptoCard/CryptoCard";

import "./Dashboard.css";

class Dashboard extends Component {
  state = {
    rateUsd: 0,
    apiCryptos: [],
    dbCryptos: [],
  };

  getRateUsd = axios
    .get("https://openexchangerates.org/api/latest.json?app_id=485c2cbe730248d2bd9cbc69c8920dd1");

  getCryptos = axios
    .get("https://api.coincap.io/v2/assets");

  persistCryptos(cryptos) {
    return axios
      .post("http://localhost:5000/api/cryptos", cryptos);
  }

  readCryptos = axios
    .get("http://localhost:5000/api/cryptos");

  componentDidMount() {
    const main = async () => {
      try {
        const rates = await this.getRateUsd;
        console.log(rates)
        this.setState({ rateUsd: rates.data.rates.EUR });

        const cryptos = await this.getCryptos;
        const top10Cryptos = cryptos.data.data.slice(0, 10);
        const top10Timestamp = new Date(cryptos.data.timestamp);
        top10Cryptos.forEach(({ name, marketCapUsd, priceUsd }) => {
          const crypto = {};
          crypto.cryptoName = name;
          crypto.marketCap = Number(marketCapUsd).toFixed(2);
          crypto.lastUsdPrice = Number(priceUsd).toFixed(2);
          crypto.lastEurPrice = (priceUsd * this.state.rateUsd).toFixed(2);
          crypto.timestamp = top10Timestamp.toString();
          this.setState({ apiCryptos: [...this.state.apiCryptos, crypto] });
        });

        await this.persistCryptos(this.state.apiCryptos);

        const readCryptos = await this.readCryptos;
        console.log('retrieved cryptos', readCryptos)
        this.setState({ dbCryptos: readCryptos.data })
        console.log("retrieved cryptos saved in dbCryptos", this.state.dbCryptos);

      } catch (error) {
        console.log('something went wrong', error);
      }
    }
    main()

  }

  render() {
    const { dbCryptos } = this.state;

    return (
      <Container className="container">
        <Table responsive="md" className="table-border">
          <thead>
            <tr>
              <th>Name</th>
              <th className="d-none d-md-block">Market Cap</th>
              <th>$Price</th>
              <th>€Price</th>
            </tr>
          </thead>
          <tbody>
            {dbCryptos.map((crypto) =>
              <CryptoCard key={crypto._id} cryptoInfo={crypto} />
            )}
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default Dashboard;
