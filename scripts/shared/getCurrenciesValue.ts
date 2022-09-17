import { ethers } from 'hardhat'
import { Wallet } from '@ethersproject/wallet'

import { nativeCurrency, tokensStablecoin, pairFactory } from './constants'
import { INetwork } from './getNetworks'
import getTokensValue from './getTokensValue'

export interface ICurrencyValue {
  chainId: number
  value: string
  symbol: string
  decimalsTokenA: number
  decimalsTokenB: number
  error: string
}

const { DUMMY_PRIVATE_KEY, SEND_EMAIL } = process.env

const getCurrenciesValue = async (networks: INetwork[]) => {
  let currencyValue: ICurrencyValue[] = []
  if (DUMMY_PRIVATE_KEY) {
    for (const network of networks) {
      let tokenValue: ICurrencyValue = {
        chainId: network.chainId,
        value: 'TBD',
        symbol: '$',
        decimalsTokenA: 0,
        decimalsTokenB: 0,
        error: ''
      }
      const currenciesOfNetwork = nativeCurrency
        .filter((currency) => currency.network === network.name)
        .map((token) => {
          return token.symbol
        })[0]
      if (currenciesOfNetwork) {
        const tokensOfNetwork = tokensStablecoin
          .filter((token) => token.network === network.name)
          .map((token) => {
            return {
              address: token.address,
              symbol: token.symbol
            }
          })
        if (tokensOfNetwork && tokensOfNetwork.length > 0) {
          const wrappedCurrenciesOfNetwork = tokensStablecoin
            .filter((token) => token.network === network.name && token.symbol === 'W' + currenciesOfNetwork)
            .map((token) => {
              return token.address
            })[0]
          const pairFactoryOfNetwork = pairFactory
            .filter((pair) => pair.network === network.name)
            .map((pair) => {
              return {
                address: pair.address,
                contractName: pair.contractName,
                contractType: pair.contractType
              }
            })
          if (wrappedCurrenciesOfNetwork && pairFactoryOfNetwork && pairFactoryOfNetwork.length > 0) {
            // Get provider
            const provider = new ethers.providers.JsonRpcProvider(network.url)
            // Get wallet
            const owner = new ethers.Wallet(DUMMY_PRIVATE_KEY, provider)
            // Get wrapped native currency value
            const { value, symbol, decimalsTokenA, decimalsTokenB } = await getTokensValue(
              wrappedCurrenciesOfNetwork,
              tokensOfNetwork,
              pairFactoryOfNetwork,
              owner
            )
            tokenValue.value = value
            tokenValue.symbol = symbol
            tokenValue.decimalsTokenA = decimalsTokenA
            tokenValue.decimalsTokenB = decimalsTokenB
          }
        } else {
          if (SEND_EMAIL !== 'true') console.log('No tokens of network', network.name)
        }
      }
      currencyValue.push(tokenValue)
    }
  }
  return currencyValue
}

export default getCurrenciesValue
