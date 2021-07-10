let Verifier = artifacts.require('Verifier');

contract('Verifier', accounts => {

    const owner = accounts[0];

    describe('Test zokrates verifier', function () {
        beforeEach(async function () {
            this.contract = await Verifier.new({from: owner});

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
        })

        it('should succeed to verify using zokrates', async function () {
            let result = await this.contract.verifyTx(
                this.proof['proof']['a'],
                this.proof['proof']['b'],
                this.proof['proof']['c'],
                this.proof['inputs']);
            assert(result, "Verifier failed");
        })
    })
})