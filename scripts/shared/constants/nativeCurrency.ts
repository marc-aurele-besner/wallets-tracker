type TMainnet =  "mainnet"
type TTestnet = "testnet"
type TUnknown = "unknown"

export type TNetworkType = TMainnet | TTestnet | TUnknown

export interface INativeCurrency {
  network: string
  symbol: string
  type: TNetworkType
}

const nativeCurrency: INativeCurrency[] = [
  // Public Mainnet
  {
    network: 'ethereum',
    symbol: 'ETH',
    type: "mainnet"
  },
  {
    network: 'polygon',
    symbol: 'MATIC',
    type: "mainnet"
  },
  {
    network: 'bsc',
    symbol: 'BNB',
    type: "mainnet"
  },
  {
    network: 'optimism',
    symbol: 'ETH',
    type: "mainnet"
  },
  {
    network: 'avalanche',
    symbol: 'AVAX',
    type: "mainnet"
  },
  {
    network: 'arbitrum',
    symbol: 'ETH',
    type: "mainnet"
  },
  {
    network: 'cronos',
    symbol: 'CRO',
    type: "mainnet"
  },
  {
    network: 'fantom',
    symbol: 'FTM',
    type: "mainnet"
  },
  {
    network: 'klaytn',
    symbol: 'KLAY',
    type: "mainnet"
  },
  {
    network: 'kava',
    symbol: 'KAVA',
    type: "mainnet"
  },
  {
    network: 'gnosis',
    symbol: 'xDAI',
    type: "mainnet"
  },
  {
    network: 'aurora',
    symbol: 'ETH',
    type: "mainnet"
  },
  {
    network: 'fusion',
    symbol: 'FSN',
    type: "mainnet"
  },
  {
    network: 'celo',
    symbol: 'CELO',
    type: "mainnet"
  },
  {
    network: 'huobi',
    symbol: 'HT',
    type: "mainnet"
  },
  {
    network: 'moonriver',
    symbol: 'MOVR',
    type: "mainnet"
  },
  {
    network: 'moonbeam',
    symbol: 'GLMR',
    type: "mainnet"
  },
  {
    network: 'rsk',
    symbol: 'RBTC',
    type: "mainnet"
  },
  {
    network: 'metis',
    symbol: 'METIS',
    type: "mainnet"
  },
  // Testnet
  {
    network: 'ropstein',
    symbol: 'ETH',
    type: "testnet"
  },
  {
    network: 'rinkeby',
    symbol: 'ETH',
    type: "testnet"
  },
  {
    network: 'goerli',
    symbol: 'ETH',
    type: "testnet"
  },
  {
    network: 'kovan',
    symbol: 'ETH',
    type: "testnet"
  },
  {
    network: 'mumbai',
    symbol: 'MATIC',
    type: "testnet"
  },
  {
    network: 'bscTest',
    symbol: 'BNB',
    type: "testnet"
  },
  {
    network: 'optimismKovan',
    symbol: 'ETH',
    type: "testnet"
  },
  {
    network: 'optimismGoerli',
    symbol: 'ETH',
    type: "testnet"
  }
]

export default nativeCurrency