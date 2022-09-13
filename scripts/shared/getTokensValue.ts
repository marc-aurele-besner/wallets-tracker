import { ethers } from 'hardhat'

export interface ITokenValue {
  value: string
  symbol: string
}

export interface ITokenStablecoinOfNetwork {
  address: string
  symbol: string
}

export interface IPairFactoryOfNetwork {
  address: string
  contractName: string
}

const { DUMMY_PRIVATE_KEY } = process.env

const getTokensValue = async (tokenA: string, tokenB: ITokenStablecoinOfNetwork[], pairFactory: IPairFactoryOfNetwork[], rpcUrl: string) => {
  let tokenValue: ITokenValue = {
    value: 'TBD',
    symbol: '$'
  }
  if (DUMMY_PRIVATE_KEY) {
    try {
      // Get provider
      const provider = new ethers.providers.JsonRpcProvider(rpcUrl)
      // Get wallet
      const owner = new ethers.Wallet(DUMMY_PRIVATE_KEY, provider)
      // Get ERC20 Factory
      let PairFactory
      let pairId = 0
      try {
        PairFactory = await ethers.getContractFactory(pairFactory[0].contractName)
      } catch (error) {
        if (pairFactory.length > 1) {
          try {
            PairFactory = await ethers.getContractFactory(pairFactory[1].contractName)
            pairId = 1
          } catch (error) {
            console.log('No contract found')
          }
        } else {
          console.log('No contract found')
        }
      }
      if (PairFactory) {
        const ERC20Contract = await new ethers.Contract(pairFactory[pairId].address, PairFactory.interface, owner)
        // Get pair from LP factory
        let pair
        let tokenBid = 0
        let tokenBAddress = tokenB[0].address
        try {
          pair = await ERC20Contract.getPair(tokenA, tokenB[0].address)
        } catch (error) {
          if (tokenB.length > 1) {
            try {
              pair = await ERC20Contract.getPair(tokenA, tokenB[1].address)
              tokenBid = 1
              tokenBAddress = tokenB[1].address
            } catch (error) {
              console.log('Cannot get pair')
            }
          } else {
            console.log('Cannot get pair')
          }
        }
        if (pair) {
          // Get ERC20 Factory
          const ERC20Factory = await ethers.getContractFactory('MockERC20Upgradeable')
          // Get ERC20 Contract
          const TokenA = await new ethers.Contract(tokenA, ERC20Factory.interface, owner)
          const TokenB = await new ethers.Contract(tokenBAddress, ERC20Factory.interface, owner)
          // Get balance token 0 & 1
          const balanceTokenA = await TokenA.balanceOf(pair)
          const balanceTokenB = await TokenB.balanceOf(pair)
        }
      }
    } catch (error) {
      console.log('Error while connecting to network ', rpcUrl)
    }
  }
  return tokenValue
}

export default getTokensValue
