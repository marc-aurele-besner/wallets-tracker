const hre = require("hardhat");

const getBalancesOfAddresses = async (networks, addresses) => {
  let finalResults = [];
  // Loop all networks
  for (network of networks) {
    try {
      // Get provider
      const provider = new ethers.providers.JsonRpcProvider(network.url);
      // Loop all addresses
      for (address of addresses) {
        let balance;
        try {
          // Get balance
          balance = await provider.getBalance(address);
        } catch (error) {
          console.log(
            "Error while getting balance for address ",
            address,
            " on network ",
            network.name
          );
          balance = "Error";
        }
        if (!finalResults[address]) finalResults[address] = [];
        // Push result
        if (balance.gt(0))
          finalResults[address].push({
            address,
            chainId: network.chainId,
            network: network.name,
            balance: hre.ethers.utils.formatEther(balance),
          });
      }
    } catch (error) {
      console.log("Error while connecting to network ", network.name);
    }
  }
  return finalResults;
}

module.exports = getBalancesOfAddresses;