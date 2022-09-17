import { ethers } from 'hardhat'

import helper from './shared'
import { IWalletBalancesResult } from './shared/getBalancesOfAddresses'
import { ITokensBalancesResult } from './shared/getTokensBalancesOfAddresses'

async function main() {
  const networks = helper.getNetworks()
  const addresses = helper.getAddressToTrack()
  const allTokens = helper.getTokenToTrack()
  const valueOfCurrencies = await helper.getCurrenciesValue(networks)
  if (networks && addresses) {
    const walletBalancesResult = await helper.getBalancesOfAddresses(networks, addresses)
    // Console log amount of addresses to track
    console.log('Querying ', networks.length, '  networks')
    // Console log result
    console.log('Networks to track: ')
    console.table(networks)
    // Console log amount of addresses to track
    console.log('Querying balance for ', addresses.length, ' addresses')

    for (const address of addresses) {
      const balancesList = walletBalancesResult[address].map((result: IWalletBalancesResult) => {
        const valueOfCurrency = valueOfCurrencies.find((currency) => currency.chainId === result.chainId)
        return {
          networkType: result.networkType,
          chainId: result.chainId,
          network: result.network,
          balance: ethers.utils.formatEther(result.balance),
          nativeCurrency: result.nativeCurrency,
          fiatValue:
            valueOfCurrency?.value && valueOfCurrency?.value !== 'TBD'
              ? helper.getValueFormatted('', '1', valueOfCurrency.value, valueOfCurrency?.decimalsTokenA || 0, valueOfCurrency?.decimalsTokenB || 0)
              : 'TBD',
          fiatSymbol: valueOfCurrency?.symbol || '$',
          fiatBalanceValue: helper.getBalanceValueFormatted(
            '',
            result.balance,
            valueOfCurrency?.value || '',
            valueOfCurrency?.decimalsTokenA || 0,
            valueOfCurrency?.decimalsTokenB || 0
          )
        }
      })
      // Console log result
      console.log('Balance of ', address)
      if (balancesList.length > 0) console.table(balancesList)
      else console.log('No tokens balances found')
      const tokensBalancesResult = await helper.getTokensBalancesOfAddresses(networks, address, allTokens)
      const tokensBalancesList = tokensBalancesResult[address].map((result: ITokensBalancesResult) => {
        const balanceFormatted = ethers.utils.formatUnits(result.balance, result.decimalsTokenA)
        return {
          networkType: result.networkType,
          chainId: result.chainId,
          network: result.network,
          tokenName: result.tokenName,
          balance: balanceFormatted,
          tokenSymbol: result.tokenSymbol,
          fiatValue: helper.getValueFormatted(result.type, balanceFormatted, result.fiatValue, result.decimalsTokenA, result.decimalsTokenB),
          fiatSymbol: result.fiatSymbol,
          fiatBalanceValue: helper.getBalanceValueFormatted(result.type, result.balance, result.fiatValue, result.decimalsTokenA, result.decimalsTokenB)
        }
      })
      if (tokensBalancesList.length > 0) console.table(tokensBalancesList)
      else console.log('No tokens balances found for ', address)
    }
  } else console.log('No networks or addresses to track')
  console.log(`Scrip executed`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
