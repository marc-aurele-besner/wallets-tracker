import helper from './shared'
import { IWalletBalancesResult } from './shared/getBalancesOfAddresses'
import { ITokensBalancesResult } from './shared/getTokensBalancesOfAddresses'

async function main() {
  const networks = helper.getNetworks()
  const addresses = helper.getAddressToTrack()
  const allTokens = helper.getTokenToTrack()
  if (networks && addresses) {
    const walletBalancesResult = await helper.getBalancesOfAddresses(networks, addresses)
    // Console log result
    console.log("Networks to track: ")
    console.table(networks)
    // Console log amount of addresses to track
    console.log("Querying balance for ", addresses.length, " addresses")

    for (const address of addresses) {
      const balancesList = walletBalancesResult[address].map((result: IWalletBalancesResult) => {
        return {
          chainId: result.chainId,
          network: result.network,
          balance: result.balance,
          nativeCurrency: result.nativeCurrency
        };
      });
      // Console log result
      console.log("Balance of ", address)
      if (balancesList.length > 0) console.table(balancesList)
      else console.log("No tokens balances found")
      const tokensBalancesResult = await helper.getTokensBalancesOfAddresses(networks, address, allTokens)
      const tokensBalancesList = tokensBalancesResult[address].map((result: ITokensBalancesResult) => {
        return {
          chainId: result.chainId,
          network: result.network,
          tokenName: result.tokenName,
          balance: result.balance,
          tokenSymbol: result.tokenSymbol
        };
      });
      if (tokensBalancesList.length > 0) console.table(tokensBalancesList)
      else console.log("No tokens balances found for ", address)
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