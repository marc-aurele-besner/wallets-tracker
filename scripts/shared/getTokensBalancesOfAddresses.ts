import { ethers } from 'hardhat'

import { tokensStablecoin, pairFactory, TNetworkType } from './constants'
import { ITokensToTrack } from './getTokenToTrack'
import getMultipleTypeTokensValue from './getMultipleTypeTokensValue'
import { INetwork } from './getNetworks'

export interface ITokensBalancesResult {
  address: string
  networkType: TNetworkType
  chainId: number
  network: number
  balance: string
  tokenName: string
  tokenSymbol: string
  type: string
  decimalsTokenA: number
  decimalsTokenB: number
  fiatValue: string
  fiatSymbol: string
}

const { DUMMY_PRIVATE_KEY, SEND_EMAIL } = process.env

const getTokensBalancesOfAddresses = async (networks: INetwork[], address: string, allTokens: ITokensToTrack[]) => {
  let tokensBalancesResults: ITokensBalancesResult[] = []
  if (DUMMY_PRIVATE_KEY) {
    // Loop all networks
    for (const network of networks) {
      const tokensOfNetwork = allTokens
        .filter((token) => token.network === network.name)
        .map((token) => {
          return token.tokens
        })[0]
      const tokensStablecoinOfNetwork = tokensStablecoin
        .filter((token) => token.network === network.name)
        .map((token) => {
          return {
            address: token.address,
            symbol: token.symbol
          }
        })
      const pairFactoryOfNetwork = pairFactory
        .filter((pair) => pair.network === network.name)
        .map((pair) => {
          return {
            address: pair.address,
            contractName: pair.contractName,
            contractType: pair.contractType
          }
        })
      if (tokensOfNetwork) {
        try {
          // Get provider
          const provider = new ethers.providers.JsonRpcProvider(network.url)
          // Get wallet
          const owner = new ethers.Wallet(DUMMY_PRIVATE_KEY, provider)
          // Get ERC20 Factory
          const ERC20Factory = await ethers.getContractFactory('MockERC20Upgradeable')
          // Loop all tokens
          for (const token of tokensOfNetwork) {
            let balance = ethers.BigNumber.from(0)
            let tokenName = ''
            let tokenSymbol = ''
            let tokenDecimals = 0
            try {
              // Get ERC20 Contract
              const ERC20Contract = await new ethers.Contract(token, ERC20Factory.interface, owner)
              // Get balance
              balance = await ERC20Contract.balanceOf(address)
              // Get token name
              tokenName = await ERC20Contract.name()
              // Get token symbol
              tokenSymbol = await ERC20Contract.symbol()
            } catch (error) {
              if (SEND_EMAIL !== 'true') console.log('Error while getting balance for token ', token, ' for address ', address, ' on network ', network.name)
            }
            // Push result
            if (!tokensBalancesResults[address]) tokensBalancesResults[address] = []
            if (balance.gt(0)) {
              const { value, symbol, type, decimalsTokenA, decimalsTokenB } = await getMultipleTypeTokensValue(
                token,
                tokensStablecoinOfNetwork,
                pairFactoryOfNetwork,
                owner,
                network.name
              )
              await tokensBalancesResults[address].push({
                address,
                networkType: network.type,
                chainId: network.chainId,
                network: network.name,
                balance,
                tokenName,
                tokenSymbol,
                type,
                decimalsTokenA,
                decimalsTokenB,
                fiatValue: value,
                fiatSymbol: symbol
              })
            }
          }
        } catch (error) {
          if (SEND_EMAIL !== 'true') console.log('Error while connecting to network ', network.name)
        }
      }
    }
  }
  return tokensBalancesResults
}

export default getTokensBalancesOfAddresses
