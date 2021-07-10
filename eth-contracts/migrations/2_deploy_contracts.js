// migrating the appropriate contracts
//var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
let CapstoneERC721Token = artifacts.require("CapstoneERC721Token");
let Verifier = artifacts.require("Verifier");

module.exports = function(deployer) {
  deployer.deploy(CapstoneERC721Token);
  deployer.deploy(Verifier);
//  deployer.deploy(SolnSquareVerifier);
};
