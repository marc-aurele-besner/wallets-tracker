const helper = require('./shared');

async function main() {
  const networks = helper.getNetworks();
  const addresses = helper.getAddressToTrack();
  const finalResults = await helper.getBalancesOfAddresses(networks, addresses);
  // Console log result
  console.log("Networks to track: ");
  console.table(networks);
  // Console log amount of addresses to track
  console.log("Querying balance for ", addresses.length, " addresses");

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
