import { ethers } from 'hardhat'
import { Wallet } from '@ethersproject/wallet'

export interface ITokenValue {
  value: string
  symbol: string
  decimalsTokenA: number
  decimalsTokenB: number
  type: string
  error: string
}

export interface ITokenStablecoinOfNetwork {
  address: string
  symbol: string
}

export interface IPairFactoryOfNetwork {
  address: string
  contractName: string
  contractType: string
}

const { DUMMY_PRIVATE_KEY } = process.env

const getTokensValue = async (tokenA: string, tokenB: ITokenStablecoinOfNetwork[], pairFactory: IPairFactoryOfNetwork[], owner: Wallet, type?: string) => {
  let tokenValue: ITokenValue = {
    value: 'TBD',
    symbol: '$',
    decimalsTokenA: 0,
    decimalsTokenB: 0,
    type: '',
    error: ''
  }
  if (DUMMY_PRIVATE_KEY) {
    // Get ERC20 Factory
    let PairFactory
    let pairFactoryFound = false
    let pairId = 0

    while (!pairFactoryFound && pairFactory.length > pairId) {
      try {
        PairFactory = await ethers.getContractFactory(pairFactory[pairId].contractName)
      } catch (error) {}
      if (PairFactory) pairFactoryFound = true
      else pairId++
    }
    if (!pairFactoryFound) tokenValue.error = 'No contract found'
    if (PairFactory) {
      const PairFactoryContract = await new ethers.Contract(pairFactory[pairId].address, PairFactory.interface, owner)
      // Get pair from LP factory
      let pair
      let pairFound = false
      let tokenBid = 0
      let tokenBAddress = ''

      while (!pairFound && tokenB.length > tokenBid) {
        tokenBAddress = tokenB[tokenBid].address
        try {
          // if (pairFactory[pairId].contractType === 'UniswapV2')
          pair = await PairFactoryContract.getPair(tokenA, tokenBAddress)
        } catch (error) {}
        if (pair && pair !== '0x0000000000000000000000000000000000000000') pairFound = true
        else tokenBid++
      }
      if (pair && tokenBAddress && pair !== '0x0000000000000000000000000000000000000000' && tokenBAddress !== '') {
        // Get ERC20 Factory
        const ERC20Factory = await ethers.getContractFactory('MockERC20Upgradeable')
        // Get ERC20 Contract
        const TokenAContract = await new ethers.Contract(tokenA, ERC20Factory.interface, owner)
        const TokenBContract = await new ethers.Contract(tokenBAddress, ERC20Factory.interface, owner)
        // Get balance token 0 & 1
        const balanceTokenA = await TokenAContract.balanceOf(pair)
        const symbolTokenA = await TokenAContract.symbol()
        if (tokenB.find((token) => token.symbol === symbolTokenA)) {
          tokenValue.type = 'stablecoin'
          tokenValue.symbol = symbolTokenA
        }
        const decimalsTokenA = ethers.BigNumber.from(await TokenAContract.decimals())

        const balanceTokenB = await TokenBContract.balanceOf(pair)
        const symbolTokenB = await TokenBContract.symbol()
        const decimalsTokenB = ethers.BigNumber.from(await TokenBContract.decimals())

        if (balanceTokenB) {
          const bitTen = ethers.BigNumber.from(10)
          const value = ethers.BigNumber.from(balanceTokenB)
            .mul(bitTen.pow(decimalsTokenA))
            .div(balanceTokenA.div(bitTen.pow(decimalsTokenA)))
          tokenValue = {
            value: value.toString(),
            symbol: tokenValue.type !== 'stablecoin' ? symbolTokenB : tokenValue.symbol,
            decimalsTokenA: decimalsTokenA.toNumber(),
            decimalsTokenB: decimalsTokenB.toNumber(),
            type: tokenValue.type,
            error: ''
          }
          return tokenValue
        } else tokenValue.error = 'Balance token B is 0'
      } else tokenValue.error = 'No pair found for ' + tokenA + ' and ' + tokenBAddress
    } else tokenValue.error = 'No pair factory found'
  }
  return tokenValue
}

export default getTokensValue
