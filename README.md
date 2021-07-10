[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/georgesdib/blockchain_capstone)

# Udacity Blockchain Capstone

The capstone will build upon the knowledge you have gained in the course in order to build a decentralized housing product. The idea is, you need to submit a proof of a ZK problem via Zokrates (this is a proxy for submitting a proof that you actually own the house), if the proof is valid (and is unique), you are allowed to mint an ERC721 token (which is the main standard for NFTs). This token can then be sold via opensea (or any other NFT platform for that matter).

Potential improvements could be, once someone buys the token, how does the actual delivery of the house happens, this would need some extra work, and have some connections to the housing registry. One way would be to lock the funds received by the seller, until a notary checks that everything is in place, and then funds are released via some sort of a multi-sig mechanism.

# Installing
I have updated all the tooling to the latest including Solidity. This meant I had to hack a bit the Zokrates generated file as well, one notable thing, in the new solidity version, SafeMath is always on, and underflows generate an exception, however one piece of code actually underflows, but the code subsequently never accesses that variable, so I had to wrap that piece of code with the "unchecked" directive.

I used the following versions:
* Truffle v5.3.14 (core: 5.3.14)
* Solidity v0.5.16 (solc-js)
* Node v16.4.2
* Web3.js v1.4.0

Once you have the above installed, you need to install all needed dependencies, this is done by running:

`npm install`


# Zokrates setup
Please follow the instructions as per the course. I have also ran the instructions as per the tutorial on:

https://zokrates.github.io/examples/sha256example.html

But I chose to keep it simple and not publish that code as the user interaction is exactly the same as the square one.

# Testing and deploying
As for any truffle project, testing is done via:

`truffle test`

Deploying the contract is also done like for any truffle project:

`truffle migrate`

Please note you need to navigate to eth-contracts before you run the above commands

# UI
I have created a very basic UI to be able to mint the tokens on the Rinkeby network. I manually amended line 68 of the App.js file from index 0 to index 9 to mint all 10 tokens.

# Tokens
Please find below the 10 transaction hashes that were used to mint the 10 tokes:

0x1fbfc6cc6ce0f8d720ee02ef74e49ac549b8c8aa3d709654028d0dc53dc2a713
0x38a8ca85556b096eef50d59755504e44e52c367f532096261cbbe63de1c4e30e
0x2b3d8694f9a6dee7f2cf9f9a881f516230459ab9f2212ac877671aecfbfbc07b
0x4bca67804b383c680c07a27dae0a0bb21a6f9cbe326c1d9574be99c0ac0ae230
0xb428897ac8079702a9b23b695c73cac34b8edd6c02cf179d8c0526694ada740d
0x8c79d525b2a32392fe62a26d473265eb94e20f32501382d3ac24dd6b7f46ee33
0x11468707afabefbfc3a833bda3f438f912032354b7bb87448db0e100ccd77fd8
0x96c0b0fed905e7bd3d7534efcd92bd6ad77aad651d379f929f4f16620f410edb
0x36772332a4efb0479fb5eaaf830839b510670af0ab02e3910a924175c5f6f41a
0x9cb3a5748477b9658866f1d4742586671c0d8848f9132a3f988d9d6129ff2e52

# OpenSea
I have created a collection in OpenSea

https://testnets.opensea.io/collection/capstone-real-estate-georges

I also listed the 10 tokens for sale. The minting address was: 0x5358C4EB20077EE984Ca1e1a9A9E3F55cb5433c0

Account address: 0x490060e6Cc80C60217972b8D836D4c4eDB6Be625 then bought 5 of the items. Transactions hashes for these transactions are:

0x5d16ea766a2ad68d874c487603da1b6e2fb7bc3c4dd1aa3e3c2588fcf5315a36
0x173759eff2e3387723f398f1c5c9f47a911dbdb1ca7c8aafa42ae4016ef6f081
0x936b83605a7510f49f346a237704d6ef70106bba8e485808a59ff6991994ed36

The other 2 were bidding, the bidding transactions are:
0x65aac7cdf95c9a29f7a071f401c95edc248dfdc5e2ffe990506e80e73ec7d790
0x3c9ea9284666d396ffc5e01c026664e71d8bd1a2932976e8d4193f03b7827881

And the accepting transactions are:
0x48ad2d715e98f4cdf6ad9dcb0d664697dbff060d1b117eebcc6b8b0d7f64b858
0x986aff304c83bd212a37e74f2ceed6f5f37cc0c2475d7276b34e22af90d01d07

# Rinkeby network
To connect and deploy the contract to Rinkeby, please do the follow (from eth-contracts):

`truffle console --network rinkeby`
`compile`
`migrate`

This will deploy the contracts on the Rinkeby network, please find the contract addresses below:

| Contract Name       | Contract Address                           |
| ------------------- | ------------------------------------------ |
| Migrations          | 0x619Cf31B40e68c254A6eEFACb5FBcA16dCDF79B9 |
| CapstoneERC721Token | 0x25080e997A1C6dF834e1649b9cb7b63DcD5fFe64 |
| Verifier            | 0x0197571E9e521E3D05edFbC7B9cB397bF2c39061 |
| SolnSquareVerifier  | 0x066E7E86E0C9029B9cFfDf7e5b84AEe435f808A1 |

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)

# Projection commentary
I have used openzeppelin for the ERC721 related boilerplate code. I have also implemented my own code under ERC721MintableNoOpenZeppelin.sol, but I don't actually use it.

Please note that ERC721Metadata was merged into ERC721 in the latest versions of OpenZeppelin, I am therefore removing it in my code.