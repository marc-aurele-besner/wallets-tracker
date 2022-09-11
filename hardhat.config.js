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
    },
    ethereum: {
      chainId: 1,
      url: process.env.RPC_ETHEREUM,
      accounts: [process.env.DUMMY_PRIVATE_KEY]
    },
    polygon: {
      chainId: 137,
      url: `${process.env.RPC_POLYGON}`,
      accounts: [`${process.env.DUMMY_PRIVATE_KEY}`]
    },
    bsc: {
      chainId: 56,
      url: `${process.env.RPC_BINANCE}`,
      accounts: [`${process.env.DUMMY_PRIVATE_KEY}`]
    },
    optimism: {
      chainId: 10,
      url: `${process.env.RPC_OPTIMISM}`,
      accounts: [`${process.env.DUMMY_PRIVATE_KEY}`]
    },
    avalanche: {
      chainId: 43114,
      url: `${process.env.RPC_AVALANCHE}`,
      accounts: [`${process.env.DUMMY_PRIVATE_KEY}`]
    },
    // Testnet
    ropstein: {
      chainId: 3,
      url: process.env.RPC_ROPSTEIN,
      accounts: [process.env.DUMMY_PRIVATE_KEY]
    },
    rinkeby: {
      chainId: 4,
      url: process.env.RPC_RINKEBY,
      accounts: [process.env.DUMMY_PRIVATE_KEY]
    },
    goerli: {
      chainId: 5,
      url: process.env.RPC_GOERLI,
      accounts: [process.env.DUMMY_PRIVATE_KEY]
    },
    kovan: {
      chainId: 42,
      url: process.env.RPC_KOVAN,
      accounts: [process.env.DUMMY_PRIVATE_KEY]
    },
    mumbai: {
      chainId: 80001,
      url: process.env.RPC_MUMBAI,
      accounts: [process.env.DUMMY_PRIVATE_KEY]
    },
    bscTest: {
      chainId: 97,
      url: `${process.env.RPC_BINANCE_TESTNET}`,
      accounts: [`${process.env.DUMMY_PRIVATE_KEY}`]
    },
    optimismTest: {
      chainId: 69,
      url: `${process.env.RPC_OPTIMISM_TESTNET}`,
      accounts: [`${process.env.DUMMY_PRIVATE_KEY}`]
    }
  },
};
