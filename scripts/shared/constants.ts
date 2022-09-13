export interface INativeCurrency {
  network: string
  symbol: string
}

export interface ITokenStablecoin {
  network: string
  address: string
  symbol: string
}

export interface IPairFactory {
  network: string
  address: string
  contractName: string
}

const nativeCurrency: INativeCurrency[] = [
  // Public Mainnet
  {
    network: 'ethereum',
    symbol: 'ETH'
  },
  {
    network: 'polygon',
    symbol: 'MATIC'
  },
  {
    network: 'bsc',
    symbol: 'BNB'
  },
  {
    network: 'optimism',
    symbol: 'ETH'
  },
  {
    network: 'avalanche',
    symbol: 'AVAX'
  },
  // Testnet
  {
    network: 'ropstein',
    symbol: 'ETH'
  },
  {
    network: 'rinkeby',
    symbol: 'ETH'
  },
  {
    network: 'goerli',
    symbol: 'ETH'
  },
  {
    network: 'kovan',
    symbol: 'ETH'
  },
  {
    network: 'mumbai',
    symbol: 'MATIC'
  },
  {
    network: 'bscTest',
    symbol: 'BNB'
  },
  {
    network: 'optimismTest',
    symbol: 'ETH'
  }
]

export const tokensStablecoin: ITokenStablecoin[] = [
  // Public Mainnet
  {
    network: 'ethereum',
    address: '',
    symbol: 'USDC'
  },
  {
    network: 'polygon',
    address: '',
    symbol: 'USDC'
  },
  {
    network: 'bsc',
    address: '',
    symbol: 'USDC'
  }
]

export const pairFactory: IPairFactory[] = [
  // Public Mainnet
  {
    network: 'ethereum',
    address: '',
    contractName: 'IPancakeFactory'
  },
  {
    network: 'polygon',
    address: '',
    contractName: 'IPancakeFactory'
  },
  {
    network: 'bsc',
    address: '',
    contractName: 'IPancakeFactory'
  }
]

export default nativeCurrency
