import { config } from 'hardhat'

import nativeCurrency, { INativeCurrency } from './constants'

export interface INetwork {
  name: string
  url: string
  chainId: number
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
      // Get native currency
      const nativeCurrencySymbol = nativeCurrency.find((item: INativeCurrency) => item.network === network)?.symbol
      // Get only network that have a url + chainId
      if (config.networks[network].url && config.networks[network].chainId)
        networks.push({
          name: network,
          url: config.networks[network].url,
          chainId: config.networks[network].chainId || 0,
          nativeCurrency: nativeCurrencySymbol || ''
        })
    }
  }
  return networks
}

export default getNetworks
