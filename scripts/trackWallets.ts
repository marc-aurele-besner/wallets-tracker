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
    // Console log result
    console.log('Networks to track: ')
    console.table(networks)
    // Console log amount of addresses to track
    console.log('Querying balance for ', addresses.length, ' addresses')

    for (const address of addresses) {
      const balancesList = walletBalancesResult[address].map((result: IWalletBalancesResult) => {
        const valueOfCurrency = valueOfCurrencies.find((currency) => currency.chainId === result.chainId)
        return {
          chainId: result.chainId,
          network: result.network,
          balance: ethers.utils.formatEther(result.balance),
          nativeCurrency: result.nativeCurrency,
          fiatValue: valueOfCurrency?.value && valueOfCurrency?.value !== 'TBD'
            ?
              ethers.utils.formatUnits(valueOfCurrency.value, 18 + 6)
            :
              'TBD',
          fiatSymbol: valueOfCurrency?.symbol || '$',
          fiatBalanceValue: 
            result.balance && valueOfCurrency?.value && valueOfCurrency?.value !== 'TBD'
            ?
              ethers.utils.formatUnits(
                ethers.BigNumber.from(result.balance).mul(valueOfCurrency.value),
                valueOfCurrency.decimals + 18 + 18
              ).split('.')[0]
            :
              'TBD'
        }
      })
      // Console log result
      console.log('Balance of ', address)
      if (balancesList.length > 0) console.table(balancesList)
      else console.log('No tokens balances found')
      const tokensBalancesResult = await helper.getTokensBalancesOfAddresses(networks, address, allTokens)
      const tokensBalancesList = tokensBalancesResult[address].map((result: ITokensBalancesResult) => {
        return {
          chainId: result.chainId,
          network: result.network,
          tokenName: result.tokenName,
          balance: ethers.utils.formatUnits(result.balance, result.tokenDecimals),
          tokenSymbol: result.tokenSymbol,
          fiatValue: ethers.utils.formatUnits(result.fiatValue, result.tokenDecimals),
          fiatSymbol: result.fiatSymbol
          // ,
          // fiatBalanceValue: 
          //   result.balance && result.fiatValue && result.fiatValue !== 'TBD'
          //   ?
          //     ethers.utils.formatUnits(
          //       ethers.BigNumber.from(result.balance).mul(result.fiatValue),
          //       result.tokenDecimals + 18 + 6
          //     )
          //   :
          //     'TBD'
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
