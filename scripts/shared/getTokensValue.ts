import { ethers } from 'hardhat'
import { Wallet } from '@ethersproject/wallet'

export interface ITokenValue {
  value: string
  symbol: string
  error: string
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

const getTokensValue = async (tokenA: string, tokenB: ITokenStablecoinOfNetwork[], pairFactory: IPairFactoryOfNetwork[], owner: Wallet) => {
  let tokenValue: ITokenValue = {
    value: 'TBD',
    symbol: '$',
    error: ''
  }
  if (DUMMY_PRIVATE_KEY) {
    try {
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
            tokenValue.error = 'No contract found'
          }
        } else tokenValue.error = 'No contract found'
      }
      if (PairFactory) {
        const PairFactoryContract = await new ethers.Contract(pairFactory[pairId].address, PairFactory.interface, owner)
        // Get pair from LP factory
        let pair
        let tokenBid = 0
        let tokenBAddress = tokenB[0].address
        try {
          pair = await PairFactoryContract.getPair(tokenA, tokenB[0].address)
        } catch (error) {
          if (tokenB.length > 1) {
            try {
              pair = await PairFactoryContract.getPair(tokenA, tokenB[1].address)
              tokenBid = 1
              tokenBAddress = tokenB[1].address
            } catch (error) {
              console.log('Cannot get pair, try ', tokenA, tokenB[1].address, ' with factory ', pairFactory[pairId].address)
            }
          } else {
            console.log('Cannot get pair, try ', tokenA, tokenB[0].address, ' with factory ', pairFactory[pairId].address)
          }
        }
        if (pair && pair !== '0x0000000000000000000000000000000000000000') {
          // Get ERC20 Factory
          const ERC20Factory = await ethers.getContractFactory('MockERC20Upgradeable')
          // Get ERC20 Contract
          const TokenAContract = await new ethers.Contract(tokenA, ERC20Factory.interface, owner)
          const TokenBContract = await new ethers.Contract(tokenBAddress, ERC20Factory.interface, owner)
          // Get balance token 0 & 1
          const balanceTokenA = await TokenAContract.balanceOf(pair)
          const symbolTokenA = await TokenAContract.symbol()
          const decimalsTokenA = ethers.BigNumber.from(await TokenAContract.decimals())

          const balanceTokenB = await TokenBContract.balanceOf(pair)
          const symbolTokenB = await TokenBContract.symbol()
          const decimalsTokenB = ethers.BigNumber.from(await TokenBContract.decimals())

          if (balanceTokenB) {
            const bitTen = ethers.BigNumber.from(10)
            const value = ethers.BigNumber.from(balanceTokenB)
              .mul(bitTen.pow(decimalsTokenA))
              .div(balanceTokenA.div(bitTen.pow(decimalsTokenA.sub(decimalsTokenB))))
            tokenValue = {
              value: ethers.utils.formatUnits(value, decimalsTokenA),
              symbol: symbolTokenB,
              error: ''
            }
            return tokenValue
          } else tokenValue.error = 'Balance token B is 0'
        } else tokenValue.error = 'No pair found for ' + tokenA + ' and ' + tokenB[tokenBid].address
      } else tokenValue.error = 'No pair factory found'
    } catch (error) {
      console.log('Error while connecting to network ', error)
    }
  }
  return tokenValue
}

export default getTokensValue
