import * as dotenv from 'dotenv'

import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'

dotenv.config({ path: __dirname + '/.env.development' })

const {
  // Mainnet
  DUMMY_PRIVATE_KEY,
  RPC_ETHEREUM,
  RPC_POLYGON,
  RPC_BINANCE,
  RPC_OPTIMISM,
  RPC_AVALANCHE,
  RPC_ARBITRUM,
  RPC_CHRONOS,
  RPC_FANTOM,
  RPC_KLAYTN,
  RPC_KAVA,
  RPC_GNOSIS,
  RPC_AURORA,
  // Testnet
  RPC_ROPSTEIN,
  RPC_RINKEBY,
  RPC_GOERLI,
  RPC_KOVAN,
  RPC_MUMBAI,
  RPC_BINANCE_TESTNET,
  RPC_OPTIMISM_TESTNET,
  RPC_OPTIMISM_GOERLI
} = process.env
if (!DUMMY_PRIVATE_KEY) throw new Error('DUMMY_PRIVATE_KEY is not defined')

const accounts = [`${DUMMY_PRIVATE_KEY}`]
const networks = {
  // Mainnet
  ethereum: {
    chainId: 1,
    url: `${RPC_ETHEREUM}`,
    accounts
  },
  polygon: {
    chainId: 137,
    url: `${RPC_POLYGON}`,
    accounts
  },
  bsc: {
    chainId: 56,
    url: `${RPC_BINANCE}`,
    accounts
  },
  optimism: {
    chainId: 10,
    url: `${RPC_OPTIMISM}`,
    accounts
  },
  avalanche: {
    chainId: 43114,
    url: `${RPC_AVALANCHE}`,
    accounts
  },
  arbitrum: {
    chainId: 42161,
    url: `${RPC_ARBITRUM}`,
    accounts
  },
  cronos: {
    chainId: 25,
    url: `${RPC_CHRONOS}`,
    accounts
  },
  fantom: {
    chainId: 250,
    url: `${RPC_FANTOM}`,
    accounts
  },
  klaytn: {
    chainId: 8217,
    url: `${RPC_KLAYTN}`,
    accounts
  },
  kava: {
    chainId: 2222,
    url: `${RPC_KAVA}`,
    accounts
  },
  gnosis: {
    chainId: 100,
    url: `${RPC_GNOSIS}`,
    accounts
  },
  aurora: {
    chainId: 1313161554,
    url: `${RPC_AURORA}`,
    accounts
  },
  // Testnet
  hardhat: {},
  ropstein: {
    chainId: 3,
    url: `${RPC_ROPSTEIN}`,
    accounts
  },
  rinkeby: {
    chainId: 4,
    url: `${RPC_RINKEBY}`,
    accounts
  },
  goerli: {
    chainId: 5,
    url: `${RPC_GOERLI}`,
    accounts
  },
  kovan: {
    chainId: 42,
    url: `${RPC_KOVAN}`,
    accounts
  },
  mumbai: {
    chainId: 80001,
    url: `${RPC_MUMBAI}`,
    accounts
  },
  bscTest: {
    chainId: 97,
    url: `${RPC_BINANCE_TESTNET}`,
    accounts
  },
  optimismKovan: {
    chainId: 69,
    url: `${RPC_OPTIMISM_TESTNET}`,
    accounts
  },
  optimismGoerli: {
    chainId: 420,
    url: `${RPC_OPTIMISM_GOERLI}`,
    accounts
  }
}

/** @type import('hardhat/config').HardhatUserConfig */
const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.16'
      },
      {
        version: '0.5.16',
        settings: {}
      },
      {
        version: '0.4.18',
        settings: {}
      }
    ]
  },
  networks,
}

export default config
