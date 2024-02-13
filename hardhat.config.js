require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
const INFURA_API_KEY = "397f557e35e54f8b94a498d039d0127c";
const SEPOLIA_PRIVATE_KEY =
  "29b658b029c3f4834473fcc1c4e9b99ebccf627674bcb5d416a47dd6f795aef4";

module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
};
