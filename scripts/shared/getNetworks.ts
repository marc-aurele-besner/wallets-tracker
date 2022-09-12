import { config } from 'hardhat'

const getNetworks = () => {
  // List all networks name from hardhat.config.js
  const networksNameList = Object.keys(config.networks)
  const networks = []
  // Loop all networks name
  for (const network of networksNameList) {
    // Remove hardhat network
    if (network !== "hardhat" && network !== "localhost") {
      // Get only network that have a url + chainId
      if (
        config.networks[network].url &&
        config.networks[network].chainId
      )
        networks.push({
          name: network,
          url: config.networks[network].url,
          chainId: config.networks[network].chainId,
        })
    }
  }
  return networks
}

export default getNetworks