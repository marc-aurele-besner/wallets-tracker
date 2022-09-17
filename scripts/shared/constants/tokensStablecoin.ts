export interface ITokenStablecoin {
  network: string
  address: string
  symbol: string
}

const tokensStablecoin: ITokenStablecoin[] = [
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
    address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    symbol: 'DAI'
  },
  {
    network: 'polygon',
    address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    symbol: 'USDT'
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
    network: 'mumbai',
    address: '0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F',
    symbol: 'DAI'
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
    address: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
    symbol: 'DAI'
  },
  {
    network: 'optimismKovan',
    address: '0xbC6F6b680bc61e30dB47721c6D1c5cde19C1300d',
    symbol: 'WETH'
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

export default tokensStablecoin
