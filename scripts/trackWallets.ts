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

    let totalValueAllWallets = ethers.BigNumber.from(0)
    let totalValueWallet: any[] = []
    for (const address of addresses) {
      totalValueWallet[address] = ethers.BigNumber.from(0)
      const balancesList = walletBalancesResult[address].map((result: IWalletBalancesResult) => {
        const valueOfCurrency = valueOfCurrencies.find((currency) => currency.chainId === result.chainId)
        const balanceFormatted = ethers.utils.formatEther(result.balance)
        const fiatValueFormatted =
          valueOfCurrency?.value && valueOfCurrency?.value !== 'TBD'
            ? helper.getValueFormatted('', '1', valueOfCurrency.value, valueOfCurrency?.decimalsTokenA || 0, valueOfCurrency?.decimalsTokenB || 0)
            : 'TBD'
        const fiatBalanceValueFormatted = helper.getBalanceValueFormatted(
          '',
          result.balance,
          valueOfCurrency?.value || '',
          valueOfCurrency?.decimalsTokenA || 0,
          valueOfCurrency?.decimalsTokenB || 0
        )
        if (fiatBalanceValueFormatted && fiatBalanceValueFormatted !== 'TBD') {
          totalValueAllWallets = totalValueAllWallets.add(
            ethers.BigNumber.from(fiatBalanceValueFormatted.split('.')[0])
              .mul(100)
              .add(ethers.BigNumber.from(fiatBalanceValueFormatted.split('.')[1]))
          )
          totalValueWallet[address] = totalValueWallet[address].add(
            ethers.BigNumber.from(fiatBalanceValueFormatted.split('.')[0])
              .mul(100)
              .add(ethers.BigNumber.from(fiatBalanceValueFormatted.split('.')[1]))
          )
        }
        return {
          networkType: result.networkType,
          chainId: result.chainId,
          network: result.network,
          balance: balanceFormatted,
          nativeCurrency: result.nativeCurrency,
          fiatValue: fiatValueFormatted,
          fiatSymbol: valueOfCurrency?.symbol || '$',
          fiatBalanceValue: fiatBalanceValueFormatted
        }
      })
      // Console log result
      console.log('Balance of ', address)
      if (balancesList.length > 0) console.table(balancesList)
      else console.log('No tokens balances found')
      const tokensBalancesResult = await helper.getTokensBalancesOfAddresses(networks, address, allTokens)
      const tokensBalancesList = tokensBalancesResult[address].map((result: ITokensBalancesResult) => {
        const balanceFormatted = ethers.utils.formatUnits(result.balance, result.decimalsTokenA)
        const fiatValueFormatted = helper.getValueFormatted(result.type, balanceFormatted, result.fiatValue, result.decimalsTokenA, result.decimalsTokenB)
        const fiatBalanceValueFormatted = helper.getBalanceValueFormatted(
          result.type,
          result.balance,
          result.fiatValue,
          result.decimalsTokenA,
          result.decimalsTokenB
        )
        if (fiatBalanceValueFormatted && fiatBalanceValueFormatted !== 'TBD') {
          totalValueAllWallets = totalValueAllWallets.add(
            ethers.BigNumber.from(fiatBalanceValueFormatted.split('.')[0])
              .mul(100)
              .add(ethers.BigNumber.from(fiatBalanceValueFormatted.split('.')[1]))
          )
          totalValueWallet[address] = totalValueWallet[address].add(
            ethers.BigNumber.from(fiatBalanceValueFormatted.split('.')[0])
              .mul(100)
              .add(ethers.BigNumber.from(fiatBalanceValueFormatted.split('.')[1]))
          )
        }
        return {
          networkType: result.networkType,
          chainId: result.chainId,
          network: result.network,
          tokenName: result.tokenName,
          balance: balanceFormatted,
          tokenSymbol: result.tokenSymbol,
          fiatValue: fiatValueFormatted,
          fiatSymbol: result.fiatSymbol,
          fiatBalanceValue: fiatBalanceValueFormatted
        }
      })
      if (tokensBalancesList.length > 0) console.table(tokensBalancesList)
      else console.log('No tokens balances found for ', address)
      totalValueWallet[address] = ethers.utils.formatUnits(totalValueWallet[address], 2)
    }
    console.log('Total value per wallet', totalValueWallet)
    console.log('Total value of all wallets', ethers.utils.formatUnits(totalValueAllWallets, 2))
  } else console.log('No networks or addresses to track')
  console.log(`Scrip executed`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
