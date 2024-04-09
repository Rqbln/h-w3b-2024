const { expect } = require("chai");

describe("SimpleStorage", function () {
    it("Should set the value of storedData", async function () {
        const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
        const simpleStorage = await SimpleStorage.deploy(); // Pas besoin de .deployed() après

        await simpleStorage.set(42);
        expect(await simpleStorage.get()).to.equal(42);
    });
});
