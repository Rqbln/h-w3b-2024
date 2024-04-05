const { expect } = require("chai");
const { ethers } = require("hardhat");
// Ajouter les import manquants
const { BigNumber } = require("ethers");
const { time, loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Lock Contract", function () {
  // Ajouter un commentaire ESLint pour ignorer l'erreur
  // eslint-disable-next-line no-unused-vars
  async function deployOneYearLockFixture() {
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const lockedAmount = BigNumber.from("1000000000000000000"); // 1 ether en wei
    const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

    const [owner, otherAccount] = await ethers.getSigners();
    const Lock = await ethers.getContractFactory("Lock");
    const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

    return { lock, unlockTime, lockedAmount, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right unlockTime", async function () {
      const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);
      expect((await lock.unlockTime()).toString()).to.equal(unlockTime.toString());
    });

    it("Should set the right owner", async function () {
      const { lock, owner } = await loadFixture(deployOneYearLockFixture);
      expect(await lock.owner()).to.equal(owner.address);
    });

    it("Should receive and store the funds to lock", async function () {
      const { lock, lockedAmount } = await loadFixture(deployOneYearLockFixture);
      expect(await ethers.provider.getBalance(lock.address)).to.equal(lockedAmount);
    });

    it("Should fail if the unlockTime is not in the future", async function () {
      const now = await time.latest();
      const Lock = await ethers.getContractFactory("Lock");
      // Vérifie que le déploiement échoue si le unlockTime est dans le passé.
      await expect(await Lock.deploy(now)).to.be.revertedWith("Unlock time should be in the future");
    });
  });

  describe("Withdrawals", function () {
    describe("Validations", function () {
      it("Should revert with the right error if called too soon", async function () {
        const { lock } = await loadFixture(deployOneYearLockFixture);
        // Vérifie que le retrait échoue si appelé trop tôt.
        await expect(lock.withdraw()).to.be.revertedWith("You can't withdraw yet");
      });

      it("Should revert with the right error if called from another account", async function () {
        const { lock, unlockTime, otherAccount } = await loadFixture(deployOneYearLockFixture);
        await time.increaseTo(unlockTime + 1);
        // Vérifie que le retrait échoue si appelé par un autre compte.
        await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith("You aren't the owner");
      });

      it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
        const { lock, unlockTime, owner } = await loadFixture(deployOneYearLockFixture);
        await time.increaseTo(unlockTime + 1);
        // Vérifie que le retrait réussit une fois le unlockTime passé.
        await expect(lock.withdraw()).not.to.be.reverted;
      });
    });

    describe("Events", function () {
      it("Should emit an event on withdrawals", async function () {
        const { lock, unlockTime, lockedAmount, owner } = await loadFixture(deployOneYearLockFixture);
        await time.increaseTo(unlockTime + 1);
        // Vérifie que l'événement Withdrawal est émis avec les bons arguments.
        await expect(lock.withdraw())
            .to.emit(lock, "Withdrawal")
            .withArgs(owner.address, lockedAmount);
      });
    });

    describe("Transfers", function () {
      it("Should transfer the funds to the owner", async function () {
        const { lock, unlockTime, lockedAmount, owner } = await loadFixture(deployOneYearLockFixture);
        await time.increaseTo(unlockTime + 1);
        // Vérifie que les balances en ether sont correctement mises à jour après le retrait.
        await expect(() => lock.withdraw()).to.changeEtherBalances([lock, owner], [-lockedAmount, lockedAmount]);
      });
    });
  });
});
