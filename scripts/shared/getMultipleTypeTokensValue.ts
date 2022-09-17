import { ethers } from 'hardhat'
import { Wallet } from '@ethersproject/wallet'

import { tokensTypes, tokensStablecoin } from './constants'
import getTokensValue from './getTokensValue'

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

const getMultipleTypeTokensValue = async (tokenA: string, tokenB: ITokenStablecoinOfNetwork[], pairFactory: IPairFactoryOfNetwork[], owner: Wallet, network: string, type?: string) => {
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
    const ERC20Factory = await ethers.getContractFactory('MockERC20Upgradeable')

    let tokenTypeFound = false
    let tokenTypeTry = 0

    while(!tokenTypeFound && tokensTypes.length > tokenTypeTry) {
    // To-Do: Verify first if the token is a LP token, if so, get the factory(), token0(), token1() and skip the while loop
      try {
        switch (tokensTypes[tokenTypeTry]) {
          case 'LP':
            try {
              const PairContract = await ethers.getContractFactory('UniswapV2Pair')
              const pair = await new ethers.Contract(tokenA, PairContract.interface, owner)
              const token0: string = await pair.token0()
              const token1: string = await pair.token1()
              const factory: string = await pair.factory()
              const decimals: number = await pair.decimals()
              const totalSupply: string = await pair.totalSupply()
              let value = ''
              if (token0 && token1 && factory) {
                tokenTypeFound = true
                const bigTen = ethers.BigNumber.from(10)
                if (tokenB.find((token) => token.address === token0)) {
                  // Get balance of token0 in LP
                  const token0instance = await new ethers.Contract(token0, ERC20Factory.interface, owner)
                  const balance = await token0instance.balanceOf(tokenA)
                  const TokensValue = await getTokensValue(token0, tokenB, pairFactory, owner)
                  value = (((balance.mul(2).mul(bigTen.pow(decimals))).div(totalSupply)).mul(TokensValue.value)).mul(bigTen.pow(decimals)).div(bigTen.pow(decimals)).div(bigTen.pow(decimals))
                  tokenValue = {
                    value: value.toString(),
                    symbol: TokensValue.symbol,
                    decimalsTokenA: TokensValue.decimalsTokenA,
                    decimalsTokenB: TokensValue.decimalsTokenB,
                    type: 'LP',
                    error: ''
                  }
                } else if (tokenB.find((token) => token.address === token1)) {
                  // Get balance of token1 in LP
                  const token1instance = await new ethers.Contract(token1, ERC20Factory.interface, owner)
                  const balance = await token1instance.balanceOf(tokenA)
                  const TokensValue = await getTokensValue(token1, tokenB, pairFactory, owner)
                  value = (((balance.mul(2).mul(bigTen.pow(decimals))).div(totalSupply)).mul(TokensValue.value)).mul(bigTen.pow(decimals)).div(bigTen.pow(decimals)).div(bigTen.pow(decimals))
                  tokenValue = {
                    value: value.toString(),
                    symbol: TokensValue.symbol,
                    decimalsTokenA: TokensValue.decimalsTokenA,
                    decimalsTokenB: TokensValue.decimalsTokenB,
                    type: 'LP',
                    error: ''
                  }
                }
              }
            } catch (error) {}
            break
          case 'AMTOKEN' :
            try {
              const tokenInstance = await new ethers.Contract(tokenA, ERC20Factory.interface, owner)
              const symbol = await tokenInstance.symbol()
              if (symbol.substring(0, 2) === 'am') {
                const wrappedCurrenciesOfNetwork = tokensStablecoin
                  .filter((token) => token.network === network && token.symbol === symbol.substring(2))
                  .map((token) => {
                    return token.address
                  })[0]
                if (wrappedCurrenciesOfNetwork) {
                  tokenValue = await getTokensValue(wrappedCurrenciesOfNetwork, tokenB, pairFactory, owner, type)
                  if (tokenValue.value !== 'TBD') tokenTypeFound = true
                }
              }
            } catch (error) {}
            break
          case 'ERC20' :
            tokenValue = await getTokensValue(tokenA, tokenB, pairFactory, owner, type)
            break
        }
      } catch (error) {}
      tokenTypeTry++
    }
  }
  return tokenValue
}

export default getMultipleTypeTokensValue
