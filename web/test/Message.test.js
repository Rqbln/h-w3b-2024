const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Message Contract", function () {
    it("Should return the message", async function () {
        const Message = await ethers.getContractFactory("Message");
        const message = await Message.deploy();

        // eslint-disable-next-line jest/valid-expect
        expect(await message.getMessage()).to.equal("jus de solana");
    });
});
