require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

const { PRIVATE_KEY_1, PRIVATE_KEY_2, PRIVATE_KEY_3 } = process.env;

module.exports = {
  solidity: "0.8.24",
  networks: {
    neonlabs: {
      url: "https://proxy.devnet.neonlabs.org/solana",
      chainId: 245022934,
      accounts: [
        PRIVATE_KEY_1,
        PRIVATE_KEY_2,
        PRIVATE_KEY_3
      ].filter((key) => key !== undefined),
      gasPrice: 1000000000
    }
  }
};
