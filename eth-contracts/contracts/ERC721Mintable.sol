//SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

//import 'openzeppelin-solidity/contracts/utils/Address.sol';
//import 'openzeppelin-solidity/contracts/utils/Counters.sol';
//import 'openzeppelin-solidity/contracts/utils/introspection/ERC165.sol';
import 'openzeppelin-solidity/contracts/access/Ownable.sol';
//import 'openzeppelin-solidity/contracts/token/ERC721/ERC721.sol';
import 'openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import 'openzeppelin-solidity/contracts/security/Pausable.sol';
//import 'openzeppelin-solidity/contracts/token/ERC721/IERC721Receiver.sol';
import "./Oraclize.sol";

contract CapstoneERC721Token is ERC721Enumerable, Ownable, Pausable, usingOraclize {

    // private mapping of tokenId's to token uri's
    mapping(uint256 => string) private _tokenURIs;
    
    constructor()
        ERC721("Capstone", "CAP") {}

    /**
     * @dev overrides ERC721 _baseURI which is meant to be overriden
     */
    function _baseURI() internal pure override returns (string memory) {
        return "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";
    }

    /**
     * @dev overrides ERC721 tokenURI to use _tokenURIs to be able to use oraclize
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId));
        return _tokenURIs[tokenId];
    }

    /**
     * @dev overrides ERC721 approve to allow for contract owner to approve
     */
    function approve(address to, uint256 tokenId) public override {
        address _owner = ownerOf(tokenId);
        require(to != _owner, "Should not be the owner of the token");

        require(msg.sender == owner() || isApprovedForAll(_owner, to),
            "Sender has to be owner or to approved for spend all the tokens");

        _approve(to, tokenId);

        emit Approval(_owner, to, tokenId);
    }

    function setTokenURI(uint256 tokenId) internal {
        require(_exists(tokenId), "Token does not exist");

        string memory uri = strConcat(_baseURI(), uint2str(tokenId));
        _tokenURIs[tokenId] = uri;
    }

    /**
     * @dev function mint
     * @param to address to give the newly minted token to
     * @param tokenId the ID of the new token to mint
     * @return boolean to indicate success
     */
    function mint(address to, uint256 tokenId) public onlyOwner returns(bool) {
        _mint(to, tokenId);
        return true;
    }

    function _mint(address to, uint256 tokenId) internal override {
        super._mint(to, tokenId);
        setTokenURI(tokenId);
    }
}

