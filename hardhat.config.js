require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
    },
    polygon: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/u4-BHWwR8tev4zsf0XypUuEBvmViPAGX",
      accounts: ["0x794b463d0ebe901f423b5cf33ca56ec94ad5a8c98c33e4ebd7e356055d16478d"]
    }
  },
  paths: {
    artifacts: "./src/backend/artifacts",
    sources: "./src/backend/contracts",
    cache: "./src/backend/cache",
    tests: "./src/backend/test"
  },
};
