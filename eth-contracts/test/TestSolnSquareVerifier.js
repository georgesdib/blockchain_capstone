let SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
let Verifier = artifacts.require('Verifier');

contract('SolnSquareVerifier', accounts => {
    const owner = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];

    describe('Test zokrates verifier', function () {
        beforeEach(async function () {
            let verifierContract = await Verifier.new({from: owner});
            this.contract = await SolnSquareVerifier.new(verifierContract.address, {from: owner});

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

        it('should be able to mint a new token when solution is valid', async function () {
            await this.contract.mintVerify({
                a: this.proof['proof']['a'],
                b: this.proof['proof']['b'],
                c: this.proof['proof']['c']},
                this.proof['inputs'],
                0,
                {from: account_two});

            let nb_tokens = await this.contract.totalSupply();
            assert.equal(nb_tokens.toNumber(), 1, "There is 1 token minted");

            let balance = await this.contract.balanceOf(account_two);
            assert.equal(balance, 1, "Should have 1 token");
        })

        it('should be able to mint 2 news tokens when both solutions are valid', async function () {
            await this.contract.mintVerify({
                a: this.proof['proof']['a'],
                b: this.proof['proof']['b'],
                c: this.proof['proof']['c']},
                this.proof['inputs'],
                0,
                {from: account_two});

                await this.contract.mintVerify({
                    a: this.proof['proof']['a'],
                    b: this.proof['proof']['b'],
                    c: this.proof['proof']['c']},
                    this.proof['inputs'],
                    1,
                    {from: account_three});

            let nb_tokens = await this.contract.totalSupply();
            assert.equal(nb_tokens.toNumber(), 2, "There are 2 tokens minted");

            let balance = await this.contract.balanceOf(account_two);
            assert.equal(balance, 1, "Should have 1 token");

            balance = await this.contract.balanceOf(account_three);
            assert.equal(balance, 1, "Should have 1 token");
        })

        it('should not be able to mint a new token when solution is not valid', async function () {
            let should_fail = false;
            try {
                await this.contract.mintVerify({
                    a: this.proof['proof']['a'],
                    b: this.proof['proof']['b'],
                    c: this.proof['proof']['c']},
                    [
                        "0x0000000000000000000000000000000000000000000000000000000000000009",
                        "0x0000000000000000000000000000000000000000000000000000000000000000"
                    ],
                    0,
                    {from: account_two});
            } catch (e) {
                should_fail = true;
            }

            assert(should_fail, "Should not be able to mint when solution is not valid");
        })

        it('should not be able to mint a new token when solution is not unique', async function () {
            await this.contract.mintVerify({
                a: this.proof['proof']['a'],
                b: this.proof['proof']['b'],
                c: this.proof['proof']['c']},
                this.proof['inputs'],
                0,
                {from: account_two});

            let should_fail = false;
            try {
                await this.contract.mintVerify({
                    a: this.proof['proof']['a'],
                    b: this.proof['proof']['b'],
                    c: this.proof['proof']['c']},
                    this.proof['inputs'],
                    0,
                    {from: account_two});
            } catch (e) {
                should_fail = true;
            }

            assert(should_fail, "Should not be able to mint when solution is not unique");
        })
    })
})
// Test if a new solution can be added for contract - SolnSquareVerifier

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier
