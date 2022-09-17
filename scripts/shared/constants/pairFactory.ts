export interface IPairFactory {
  network: string
  address: string
  contractName: string
  contractType: string
}

const pairFactory: IPairFactory[] = [
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

export default pairFactory
