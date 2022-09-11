const hre = require("hardhat");

async function main() {
  // List all networks name from hardhat.config.js
  const networksNameList = Object.keys(hre.config.networks);
  const networks = [];
  const addresses = [];
  let finalResults = [];
  // Get all wallets to track
  const { TRACKING_PERSONAL_WALLET, TRACKING_OTHERS_WALLET } = process.env;
  // Loop all networks name
  for (network of networksNameList) {
    // Remove hardhat network
    if (network !== "hardhat" && network !== "localhost") {
      // Get only network that have a url + chainId
      if (
        hre.config.networks[network].url &&
        hre.config.networks[network].chainId
      )
        networks.push({
          name: network,
          url: hre.config.networks[network].url,
          chainId: hre.config.networks[network].chainId,
        });
    }
  }
  // Console log result
  console.log("Networks to track: ");
  console.table(networks);

  // Get personal address to track
  if (TRACKING_PERSONAL_WALLET) {
    const addressesPerso = TRACKING_PERSONAL_WALLET.split(",");
    for (address of addressesPerso) {
      // Check if address is valid
      if (hre.ethers.utils.isAddress(address)) {
        // Verify if address is already in the list
        if (!addresses.includes(address)) addresses.push(address);
      }
    }
  }
  // Get others address to track
  if (TRACKING_OTHERS_WALLET) {
    const addressesOthers = TRACKING_OTHERS_WALLET.split(",");
    for (address of addressesOthers) {
      // Check if address is valid
      if (hre.ethers.utils.isAddress(address)) {
        // Verify if address is already in the list
        if (!addresses.includes(address)) addresses.push(address);
      }
    }
  }
  // Console log amount of addresses to track
  console.log("Querying balance for ", addresses.length, " addresses");

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
            balance: ethers.utils.formatEther(balance),
          });
      }
    } catch (error) {
      console.log("Error while connecting to network ", network.name);
    }
  }
  for (address of addresses) {
    const balancesList = finalResults[address].map((result) => {
      return {
        chainId: result.chainId,
        network: result.network,
        balance: result.balance,
      };
    });
    // Console log result
    console.log("Balance of ", address);
    console.table(balancesList);
  }

  console.log(`Scrip executed`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
