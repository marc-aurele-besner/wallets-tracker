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
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    symbol: 'USDC'
  },
  {
    network: 'ethereum',
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    symbol: 'USDT'
  },
  {
    network: 'ethereum',
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    symbol: 'WETH'
  },
  {
    network: 'polygon',
    address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    symbol: 'USDC'
  },
  {
    network: 'polygon',
    address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    symbol: 'WMATIC'
  },
  {
    network: 'polygon',
    address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    symbol: 'WETH'
  },
  {
    network: 'bsc',
    address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
    symbol: 'USDC'
  },
  {
    network: 'bsc',
    address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    symbol: 'BUSD'
  },
  {
    network: 'bsc',
    address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    symbol: 'WBNB'
  },
  {
    network: 'optimism',
    address: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
    symbol: 'USDC'
  },
  {
    network: 'optimism',
    address: '0x4200000000000000000000000000000000000006',
    symbol: 'WETH'
  },
  {
    network: 'avalanche',
    address: '',
    symbol: 'USDC'
  },
  // Testnet
  {
    network: 'ropstein',
    address: '',
    symbol: 'USDC'
  },
  {
    network: 'ropstein',
    address: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
    symbol: 'WETH'
  },
  {
    network: 'rinkeby',
    address: '',
    symbol: 'USDC'
  },
  {
    network: 'rinkeby',
    address: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
    symbol: 'WETH'
  },
  {
    network: 'goerli',
    address: '',
    symbol: 'USDC'
  },
  {
    network: 'goerli',
    address: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    symbol: 'WETH'
  },
  {
    network: 'kovan',
    address: '',
    symbol: 'USDC'
  },
  {
    network: 'kovan',
    address: '0xd0A1E359811322d97991E03f863a0C30C2cF029C',
    symbol: 'WETH'
  },
  {
    network: 'mumbai',
    address: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
    symbol: 'WETH'
  },
  {
    network: 'bscTest',
    address: '',
    symbol: 'USDC'
  },
  {
    network: 'optimismTest',
    address: '',
    symbol: 'USDC'
  },
  {
    network: 'optimismTest',
    address: '0x4200000000000000000000000000000000000006',
    symbol: 'WETH'
  }
]

export const pairFactory: IPairFactory[] = [
  // Public Mainnet
  {
    // Uniswap
    network: 'ethereum',
    address: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    contractName: 'UniswapV2Factory'
  },
  {
    // SushiSwap
    network: 'ethereum',
    address: '0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac',
    contractName: 'UniswapV2Factory'
  },
  {
    network: 'polygon',
    address: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
    contractName: 'UniswapV2Factory'
  },
  {
    network: 'bsc',
    address: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
    contractName: 'IPancakeFactory'
  },
  // Testnet
  {
    network: 'ropstein',
    address: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    contractName: 'UniswapV2Factory'
  },
  {
    network: 'rinkeby',
    address: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    contractName: 'UniswapV2Factory'
  },
  {
    network: 'goerli',
    address: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    contractName: 'UniswapV2Factory'
  },
  {
    network: 'kovan',
    address: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    contractName: 'UniswapV2Factory'
  },
  {
    network: 'mumbai',
    address: '',
    contractName: 'UniswapV2Factory'
  },
  {
    network: 'bscTest',
    address: '',
    contractName: 'UniswapV2Factory'
  },
  {
    network: 'optimismTest',
    address: '',
    contractName: 'UniswapV2Factory'
  }
]

export default nativeCurrency
