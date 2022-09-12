import helper from './shared'

async function main() {
  const networks = helper.getNetworks()
  const addresses = helper.getAddressToTrack()
  if (networks && addresses) {
    const finalResults = await helper.getBalancesOfAddresses(networks, addresses)
    // Console log result
    console.log("Networks to track: ")
    console.table(networks)
    // Console log amount of addresses to track
    console.log("Querying balance for ", addresses.length, " addresses")

    for (const address of addresses) {
      const balancesList = finalResults[address].map((result: any) => {
        return {
          chainId: result.chainId,
          network: result.network,
          balance: result.balance,
        };
      });
      // Console log result
      console.log("Balance of ", address)
      console.table(balancesList)
    }
  } else
    console.log("No networks or addresses to track")
  console.log(`Scrip executed`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })