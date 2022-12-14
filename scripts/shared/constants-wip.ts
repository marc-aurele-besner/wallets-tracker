type Mainnet = 'mainnet'
type Testnet = 'testnet'

type NetworkType = Testnet | Mainnet
export interface INativeCurrency {
  network: string
  symbol: string
  type: NetworkType
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
  contractType: string
}

const nativeCurrency: INativeCurrency[] = [
  // Public Mainnet
  {
    network: 'ethereum',
    symbol: 'ETH',
    type: 'mainnet'
  },
  {
    network: 'polygon',
    symbol: 'MATIC',
    type: 'mainnet'
  },
  {
    network: 'bsc',
    symbol: 'BNB',
    type: 'mainnet'
  },
  {
    network: 'optimism',
    symbol: 'ETH',
    type: 'mainnet'
  },
  {
    network: 'avalanche',
    symbol: 'AVAX',
    type: 'mainnet'
  },
  {
    network: 'arbitrum',
    symbol: 'ETH',
    type: 'mainnet'
  },
  {
    network: 'cronos',
    symbol: 'CRO',
    type: 'mainnet'
  },
  {
    network: 'fantom',
    symbol: 'FTM',
    type: 'mainnet'
  },
  {
    network: 'klaytn',
    symbol: 'KLAY',
    type: 'mainnet'
  },
  {
    network: 'kava',
    symbol: 'KAVA',
    type: 'mainnet'
  },
  // Testnet
  {
    network: 'ropstein',
    symbol: 'ETH',
    type: 'testnet'
  },
  {
    network: 'rinkeby',
    symbol: 'ETH',
    type: 'testnet'
  },
  {
    network: 'goerli',
    symbol: 'ETH',
    type: 'testnet'
  },
  {
    network: 'kovan',
    symbol: 'ETH',
    type: 'testnet'
  },
  {
    network: 'mumbai',
    symbol: 'MATIC',
    type: 'testnet'
  },
  {
    network: 'bscTest',
    symbol: 'BNB',
    type: 'testnet'
  },
  {
    network: 'optimismKovan',
    symbol: 'ETH',
    type: 'testnet'
  },
  {
    network: 'optimismGoerli',
    symbol: 'ETH',
    type: 'testnet'
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
  {
    network: 'arbitrum',
    address: '',
    symbol: 'USDC'
  },
  {
    network: 'cronos',
    address: '',
    symbol: 'USDC'
  },
  {
    network: 'fantom',
    address: '',
    symbol: 'USDC'
  },
  {
    network: 'klaytn',
    address: '',
    symbol: 'USDC'
  },
  {
    network: 'kava',
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
    network: 'optimismKovan',
    address: '',
    symbol: 'USDC'
  },
  {
    network: 'optimismKovan',
    address: '0x4200000000000000000000000000000000000006',
    symbol: 'WETH'
  },
  {
    network: 'optimismGoerli',
    address: '',
    symbol: 'USDC'
  }
]

export const pairFactory: IPairFactory[] = [
  // Public Mainnet
  {
    // Uniswap
    network: 'ethereum',
    address: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    contractName: 'UniswapV2Factory',
    contractType: 'V2Factory'
  },
  {
    // SushiSwap
    network: 'ethereum',
    address: '0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac',
    contractName: 'UniswapV2Factory',
    contractType: 'V2Factory'
  },
  {
    // SushiSwap
    network: 'polygon',
    address: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
    contractName: 'UniswapV2Factory',
    contractType: 'V2Factory'
  },
  {
    // QuickSwap
    network: 'polygon',
    address: '0x62052b489Cb5bC72a9DC8EEAE4B24FD50639921a',
    contractName: 'UniswapV2Factory',
    contractType: 'V2Factory'
  },
  {
    // PancakeSwap
    network: 'bsc',
    address: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
    contractName: 'PancakeFactory',
    contractType: 'V2Factory'
  },
  {
    network: 'optimism',
    address: '',
    contractName: 'UniswapV2Factory',
    contractType: 'V2Factory'
  },
  {
    network: 'avalanche',
    address: '',
    contractName: 'UniswapV2Factory',
    contractType: 'V2Factory'
  },
  {
    network: 'arbitrum',
    address: '',
    contractName: 'UniswapV2Factory',
    contractType: 'V2Factory'
  },
  {
    network: 'cronos',
    address: '',
    contractName: 'UniswapV2Factory',
    contractType: 'V2Factory'
  },
  {
    network: 'fantom',
    address: '',
    contractName: 'UniswapV2Factory',
    contractType: 'V2Factory'
  },
  {
    network: 'klaytn',
    address: '',
    contractName: 'UniswapV2Factory',
    contractType: 'V2Factory'
  },
  {
    network: 'kava',
    address: '',
    contractName: 'UniswapV2Factory',
    contractType: 'V2Factory'
  },
  // Testnet
  {
    // Uniswap
    network: 'ropstein',
    address: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    contractName: 'UniswapV2Factory',
    contractType: 'V2Factory'
  },
  {
    // Uniswap
    network: 'rinkeby',
    address: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    contractName: 'UniswapV2Factory',
    contractType: 'V2Factory'
  },
  {
    // Uniswap
    network: 'goerli',
    address: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    contractName: 'UniswapV2Factory',
    contractType: 'V2Factory'
  },
  {
    // Uniswap
    network: 'kovan',
    address: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    contractName: 'UniswapV2Factory',
    contractType: 'V2Factory'
  },
  {
    network: 'mumbai',
    address: '',
    contractName: 'UniswapV2Factory',
    contractType: 'V2Factory'
  },
  {
    network: 'bscTest',
    address: '',
    contractName: 'UniswapV2Factory',
    contractType: 'V2Factory'
  },
  {
    network: 'optimismKovan',
    address: '',
    contractName: 'UniswapV2Factory',
    contractType: 'V2Factory'
  },
  {
    network: 'optimismGoerli',
    address: '',
    contractName: 'UniswapV2Factory',
    contractType: 'V2Factory'
  }
]

export default nativeCurrency
