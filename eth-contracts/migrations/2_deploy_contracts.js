let SolnSquareVerifier = artifacts.require("./SolnSquareVerifier");
let CapstoneERC721Token = artifacts.require("CapstoneERC721Token");
let Verifier = artifacts.require("Verifier");

module.exports = function(deployer) {
  deployer.deploy(CapstoneERC721Token);
  deployer.deploy(Verifier).then(() => {
    deployer.deploy(SolnSquareVerifier, Verifier.address);
  })
};
