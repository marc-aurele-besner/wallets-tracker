import { ethers } from 'hardhat'

import { TNetworkType } from './constants'
import { INetwork } from './getNetworks'

export interface IWalletBalancesResult {
  address: string
  networkType: TNetworkType
  chainId: number
  network: number
  balance: string
  nativeCurrency: string
  fiatValue: string
  fiatSymbol: string
}

const { SEND_EMAIL } = process.env

const getBalancesOfAddresses = async (networks: INetwork[], addresses: string[]) => {
  let finalResults: IWalletBalancesResult[] = []
  // Loop all networks
  for (const network of networks) {
    try {
      // Get provider
      const provider = new ethers.providers.JsonRpcProvider(network.url)
      // Loop all addresses
      for (const address of addresses) {
        let balance = ethers.BigNumber.from(0)
        try {
          // Get balance
          balance = await provider.getBalance(address)
        } catch (error) {
          if (SEND_EMAIL !== 'true') console.log('Error while getting balance for address ', address, ' on network ', network.name)
        }
        if (!finalResults[address]) finalResults[address] = []
        // Push result
        if (balance.gt(0))
          finalResults[address].push({
            address,
            networkType: network.type,
            chainId: network.chainId,
            network: network.name,
            balance: balance,
            nativeCurrency: network.nativeCurrency,
            fiatValue: '',
            fiatSymbol: ''
          })
      }
    } catch (error) {
      if (SEND_EMAIL !== 'true') console.log('Error while connecting to network ', network.name)
    }
  }
  return finalResults
}

export default getBalancesOfAddresses
