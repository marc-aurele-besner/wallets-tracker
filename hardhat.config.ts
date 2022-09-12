import * as dotenv from 'dotenv'

import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'

dotenv.config({ path: __dirname + '/.env.development' })

const {
  DUMMY_PRIVATE_KEY,
  RPC_ETHEREUM,
  RPC_POLYGON,
  RPC_BINANCE,
  RPC_OPTIMISM,
  RPC_AVALANCHE,
  RPC_ROPSTEIN,
  RPC_RINKEBY,
  RPC_GOERLI,
  RPC_KOVAN,
  RPC_MUMBAI,
  RPC_BINANCE_TESTNET,
  RPC_OPTIMISM_TESTNET
} = process.env

/** @type import('hardhat/config').HardhatUserConfig */
const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.16",
      },
    ],
  },
  networks: DUMMY_PRIVATE_KEY ? {
    hardhat: {
    },
    ethereum: {
      chainId: 1,
      url: `${RPC_ETHEREUM}`,
      accounts: [DUMMY_PRIVATE_KEY]
    },
    polygon: {
      chainId: 137,
      url: `${RPC_POLYGON}`,
      accounts: [`${DUMMY_PRIVATE_KEY}`]
    },
    bsc: {
      chainId: 56,
      url: `${RPC_BINANCE}`,
      accounts: [`${DUMMY_PRIVATE_KEY}`]
    },
    optimism: {
      chainId: 10,
      url: `${RPC_OPTIMISM}`,
      accounts: [`${DUMMY_PRIVATE_KEY}`]
    },
    avalanche: {
      chainId: 43114,
      url: `${RPC_AVALANCHE}`,
      accounts: [`${DUMMY_PRIVATE_KEY}`]
    },
    // Testnet
    ropstein: {
      chainId: 3,
      url: RPC_ROPSTEIN,
      accounts: [DUMMY_PRIVATE_KEY]
    },
    rinkeby: {
      chainId: 4,
      url: RPC_RINKEBY,
      accounts: [DUMMY_PRIVATE_KEY]
    },
    goerli: {
      chainId: 5,
      url: RPC_GOERLI,
      accounts: [DUMMY_PRIVATE_KEY]
    },
    kovan: {
      chainId: 42,
      url: RPC_KOVAN,
      accounts: [DUMMY_PRIVATE_KEY]
    },
    mumbai: {
      chainId: 80001,
      url: RPC_MUMBAI,
      accounts: [DUMMY_PRIVATE_KEY]
    },
    bscTest: {
      chainId: 97,
      url: `${RPC_BINANCE_TESTNET}`,
      accounts: [`${DUMMY_PRIVATE_KEY}`]
    },
    optimismTest: {
      chainId: 69,
      url: `${RPC_OPTIMISM_TESTNET}`,
      accounts: [`${DUMMY_PRIVATE_KEY}`]
    }
  } : {},
};

export default config