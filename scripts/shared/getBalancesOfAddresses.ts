import { ethers } from 'hardhat'

interface INetworks {
  name: string
  url: string
  chainId: number
}

const getBalancesOfAddresses = async (networks: INetworks[], addresses: string[]) => {
  let finalResults: any = []
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
          console.log(
            "Error while getting balance for address ",
            address,
            " on network ",
            network.name
          )
        }
        if (!finalResults[address]) finalResults[address] = []
        // Push result
        if (balance.gt(0))
          finalResults[address].push({
            address,
            chainId: network.chainId,
            network: network.name,
            balance: ethers.utils.formatEther(balance),
          })
      }
    } catch (error) {
      console.log("Error while connecting to network ", network.name)
    }
  }
  return finalResults
}

export default getBalancesOfAddresses