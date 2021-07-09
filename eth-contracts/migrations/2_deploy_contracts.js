// migrating the appropriate contracts
//var SquareVerifier = artifacts.require("./SquareVerifier.sol");
//var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
let CapstoneERC721Token = artifacts.require("CapstoneERC721Token");

module.exports = function(deployer) {
  deployer.deploy(CapstoneERC721Token);
//  deployer.deploy(SquareVerifier);
//  deployer.deploy(SolnSquareVerifier);
};
