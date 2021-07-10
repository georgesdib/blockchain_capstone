//SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

import "./ERC721Mintable.sol";
import "./SquareVerifier.sol";

contract SolnSquareVerifier is CapstoneERC721Token {
    Verifier private verifierContract;
    uint256 private index;

    struct Proof {
        uint[2] a;
        uint[2][2] b;
        uint[2] c;
    }
    struct Solution {
        Proof _proof;
        uint[2] _input;
        address _submitter;
        uint256 _index;
    }

    mapping(bytes32 => bool) solutions;

    event SolutionAdded(address indexed submitter, uint256 index, bytes32 hash);

    constructor(address _verifierContract) {
        verifierContract = Verifier(_verifierContract);
    }

    function submitProof(Proof memory proof_, uint[2] memory input_) internal {
        Solution memory solution = Solution ({
            _proof: proof_,
            _input: input_,
            _submitter: msg.sender,
            _index: index
        });

        bytes32 hash = keccak256(abi.encode(solution));

        // Does the solution exist already?
        require(!solutions[hash], "Solution exists already");

        // Verify the proof
        require(verifierContract.verifyTx(proof_.a, proof_.b, proof_.c, input_),
            "Solution not valid");

        // Proof is valid so add it to the array
        solutions[hash] = true;

        emit SolutionAdded(msg.sender, index++, hash);
    }

    /**
     * @notice This function mints a new token after verifying that the sender
     * has indeed solved the key and that the solution is unique
     * @param proof_ the proof being submitted
     * @param input_ the input to the proof
     * @param tokenId the Id of the token to be minted
     */
    function mintVerify(Proof memory proof_, uint[2] memory input_, uint256 tokenId) external {
        submitProof(proof_, input_);
        super._mint(msg.sender, tokenId);
    }
}