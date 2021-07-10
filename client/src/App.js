import React, { Component } from "react";
import SolnSquareVerifier from "./contracts/SolnSquareVerifier.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { loaded:false };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();
    
      this.contract = new this.web3.eth.Contract(
        SolnSquareVerifier.abi,
        "0x066E7E86E0C9029B9cFfDf7e5b84AEe435f808A1",
      );

      this.proof = {
        "proof": {
          "a": [
            "0x279c6598b09df5a6f0f1dffd5f8a6191265fd00cf7a7ff8d0f6c30894cc1e724",
            "0x0fb06a2a7a408f6c15c20a2b44e30ed2da87836628c31239df8995bd823f08a0"
          ],
          "b": [
            [
              "0x13db4b9d8ff8520811b7adbba31bbb982ad752c4566f926902f8f29c20a2d135",
              "0x2bed3a5c6c43cb6966bdc29c32f09130a247735379a9e299db67da9b3322c796"
            ],
            [
              "0x19ddc65154000c2ee1a53755efc184147e9c93cbc61637c9cc67b6532029c018",
              "0x07584eccedc3894ea11474828c123f18b7bb9331cf2004faf49ceecde44b7699"
            ]
          ],
          "c": [
            "0x117772bc3e6b4fa1b7ca6b837a786b85bd3483f161136b35e682eb83d590cad8",
            "0x1c4bf423bd047d59cb68237f858f381e5108f5b1acc7e81853d2ea59d54406cf"
          ]
        },
        "inputs": [
          "0x0000000000000000000000000000000000000000000000000000000000000009",
          "0x0000000000000000000000000000000000000000000000000000000000000001"
        ]
      };

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({loaded:true});
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  mintNewToken = async () => {
    await this.contract.methods.mintVerify({
        a: this.proof['proof']['a'],
        b: this.proof['proof']['b'],
        c: this.proof['proof']['c']},
        this.proof['inputs'],
        9,
      ).send({from: this.accounts[0]});
  }

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Capstone Real Estate</h1>
        <p>Mint your tokens</p>
        <button type="button" onClick={this.mintNewToken}>Mint token</button>
      </div>
    );
  }
}

export default App;
