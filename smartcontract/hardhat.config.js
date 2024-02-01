require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const PRIVATE_KEY= process.env.PRIVATE_KEY
const HARDHAT_PRIVATE_KEY = process.env.LOCAL_PRIVATE_KEY
const URL = "https://eth-sepolia.g.alchemy.com/v2/1arVfjro-LZMNxjF8xcbyxwZVYUIf11q"

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      accounts: [HARDHAT_PRIVATE_KEY],
    },
    sepolia: {
      url: URL,
      accounts: [PRIVATE_KEY],
    }
  }
};
