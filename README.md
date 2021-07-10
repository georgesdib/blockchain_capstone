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