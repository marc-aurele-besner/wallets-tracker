export interface INativeCurrency {
  network: string
  symbol: string
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

export default nativeCurrency
