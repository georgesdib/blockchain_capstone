let CapstoneERC721Token = artifacts.require('CapstoneERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await CapstoneERC721Token.new({from: account_one});

            // TODO: mint multiple tokens
            assert(await this.contract.mint(account_one, 0, {from: account_one}), "Failed to mint token one");
            assert(await this.contract.mint(account_two, 1, {from: account_one}), "Failed to mint token two");
            assert(await this.contract.mint(account_two, 2, {from: account_one}), "Failed to mint token two");
            assert(await this.contract.mint(account_three, 3, {from: account_one}), "Failed to mint token two");
        })

        it('should return total supply', async function () { 
            let nb_tokens = await this.contract.totalSupply();
            assert.equal(nb_tokens.toNumber(), 4, "There are 2 tokens minted");
        })

        it('should get token balance', async function () { 
            let balance = await this.contract.balanceOf(account_two);
            assert.equal(balance, 2, "Should have 2 tokens");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let tokenURI = await this.contract.tokenURI(1);
            assert.equal(tokenURI, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1",
                "Wrong tokenURI");
        })

        it('should transfer token from one owner to another', async function () { 
            let should_fail = false;
            try {
                await this.contract.safeTransferFrom(account_two, account_three, 1, {from: account_one});
            } catch (e) {
                should_fail = true;
            }
            assert(should_fail, "Not owner of token, should not be able to transfer");

            await this.contract.safeTransferFrom(account_two, account_three, 1, {from: account_two});
            let new_owner = await this.contract.ownerOf(1);
            assert.equal(new_owner, account_three, "Transfer did not work");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await CapstoneERC721Token.new({from: account_one});

            assert(await this.contract.mint(account_two, 1, {from: account_one}), "Failed to mint token two");
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let should_fail = false;
            try {
                await this.contract.mint(account_one, 0, {from: account_two});
            } catch (e) {
                should_fail = true;
            }
            assert(should_fail, "Only the owner can mint tokens");
        })

        it('should fail if not approved to transfer', async function () { 
            let should_fail = false;
            try {
                await this.contract.safeTransferFrom(account_two, account_three, 1, {from: account_three});
            } catch (e) {
                should_fail = true;
            }
            assert(should_fail, "Need to be approved to transfer");

            await this.contract.approve(account_three, 1, {from: account_one});
            await this.contract.safeTransferFrom(account_two, account_three, 1, {from: account_three});
            let new_owner = await this.contract.ownerOf(1);
            assert.equal(new_owner, account_three, "Transfer did not work");
        })

        it('should return contract owner', async function () { 
            let owner = await this.contract.getOwner();
            assert.equal(owner, account_one, "This is not the contract owner");
        })

    });
})