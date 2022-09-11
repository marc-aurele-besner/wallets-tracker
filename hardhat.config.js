require('dotenv').config({path:__dirname+'/.env.development'});
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.16",
      },
    ],
  },
  networks: {
    hardhat: {
      forking: {
        url: `${process.env.RPC_BINANCE_RPC}`,
      },
      gas: 12000000,
    },
    bsc: {
      url: `${process.env.RPC_BINANCE_RPC}`,
      accounts: [`${process.env.DUMMY_PRIVATE_KEY}`],
      chainId: 56,
      gas: 12000000,
    },
    bscTest: {
      url: `${process.env.RPC_BINANCE_TESTNET_RPC}`,
      accounts: [`${process.env.DUMMY_PRIVATE_KEY}`],
      chainId: 97,
      gas: 12000000,
    }
  },
};
