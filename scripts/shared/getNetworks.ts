import { config } from 'hardhat'

import { nativeCurrency, TNetworkType, INativeCurrency } from './constants'

export interface INetwork {
  type: TNetworkType
  chainId: number
  name: string
  url: string
  nativeCurrency: string
}

const getNetworks = () => {
  // List all networks name from hardhat.config.js
  const networksNameList = Object.keys(config.networks)
  const networks: INetwork[] = []
  // Loop all networks name
  for (const network of networksNameList) {
    // Remove hardhat network
    if (network !== 'hardhat' && network !== 'localhost') {
      // Get network type
      const networkType = nativeCurrency.find((item: INativeCurrency) => item.network === network)?.type || 'unknown'
      // Get native currency
      const nativeCurrencySymbol = nativeCurrency.find((item: INativeCurrency) => item.network === network)?.symbol
      // Get only network that have a url + chainId
      if (config.networks[network].url && config.networks[network].chainId)
        networks.push({
          type: networkType,
          chainId: config.networks[network].chainId || 0,
          name: network,
          url: config.networks[network].url,
          nativeCurrency: nativeCurrencySymbol || ''
        })
    }
  }
  return networks
}

export default getNetworks
