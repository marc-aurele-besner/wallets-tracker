const hre = require("hardhat");

const getNetworks = () => {
  // List all networks name from hardhat.config.js
  const networksNameList = Object.keys(hre.config.networks);
  const networks = [];
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
  return networks;
}

module.exports = getNetworks;