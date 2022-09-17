import { ethers } from 'hardhat'
import fs from 'fs'

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
    let exportResults = `
<style>
  h1, h2, h3 {
    font-family: arial, sans-serif;
  }

  table {
    font-family: arial, sans-serif;
    font-size: 10px;
    border-collapse: collapse;
    width: 100%;
  }
  
  td, th {
    font-size: 10px;
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
  
  tr:nth-child(even) {
    background-color: #dddddd;
  }
</style>
# Wallets Balances

## Querying balance for ${addresses.length} addresses`;
    // Get env variables to send email status
    const { SEND_EMAIL } = process.env
    // Balances list
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
              helper.getValueFormatted('', '1', valueOfCurrency.value, valueOfCurrency?.decimalsTokenA || 0, valueOfCurrency?.decimalsTokenB || 0)
            :
              'TBD',
          fiatSymbol: valueOfCurrency?.symbol || '$',
          fiatBalanceValue: helper.getBalanceValueFormatted('', result.balance, valueOfCurrency?.value || '', valueOfCurrency?.decimalsTokenA || 0, valueOfCurrency?.decimalsTokenB || 0)
        }
      })
      const tokensBalancesResult = await helper.getTokensBalancesOfAddresses(networks, address, allTokens)
      const tokensBalancesList = tokensBalancesResult[address] ? tokensBalancesResult[address].map((result: ITokensBalancesResult) => {
        const balanceFormatted = ethers.utils.formatUnits(result.balance, result.decimalsTokenA)
        return {
          chainId: result.chainId,
          network: result.network,
          tokenName: result.tokenName,
          balance: balanceFormatted,
          tokenSymbol: result.tokenSymbol,
          fiatValue: helper.getValueFormatted(result.type, balanceFormatted, result.fiatValue, result.decimalsTokenA, result.decimalsTokenB),
          fiatSymbol: result.fiatSymbol,
          fiatBalanceValue: helper.getBalanceValueFormatted(result.type, result.balance, result.fiatValue, result.decimalsTokenA, result.decimalsTokenB)
        };
      }) : [];
      if (SEND_EMAIL === 'true') {
        exportResults += `

## Balance of ${address}
<table>
  <tr>
    <th>Network</th>
    <th>ChainId</th>
    <th>Balance</th>
    <th>Currency Value</th>
    <th>Balance Value</th>
  </tr>`;
        for (const balance of balancesList) {
          exportResults += `
  <tr>
    <td>${balance.network}</td>
    <td>${balance.chainId}</td>
    <td>${balance.balance} ${balance.nativeCurrency}</td>
    <td>${balance.fiatValue} ${balance.fiatSymbol}</td>
    <td>${balance.fiatBalanceValue}</td>
  </tr>`;
        }
        exportResults += `
</table>`

        if (tokensBalancesList.length > 0) {
          exportResults += `
### Tokens balances of ${address}
<table>
  <tr>
    <th>Network</th>
    <th>ChainId</th>
    <th>Token</th>
    <th>Balance</th>
    <th>Token Value</th>
    <th>Balance Value</th>
  </tr>`;
          for (const balance of tokensBalancesList) {
            exportResults += `
  <tr>
    <td>${balance.network}</td>
    <td>${balance.chainId}</td>
    <td>${balance.tokenName}</td>
    <td>${balance.balance} ${balance.tokenSymbol}</td>
    <td>${balance.fiatValue} ${balance.fiatSymbol}</td>
    <td>${balance.fiatBalanceValue}</td>
  </tr>`;
          }
        exportResults += `
</table>
`;
        }
      } else {
        // Console log result
        console.log("Balance of ", address)
        console.table(balancesList)
      }
    }
    // Network list
    if (SEND_EMAIL === 'true') {
      exportResults += `

## Networks to track
<table>
  <tr>
    <th>Network</th>
    <th>ChainId</th>
    <th>Native Currency</th>
    <th>RPC URL</th>
  </tr>`;
    for (const network of networks) {
      exportResults += `
  <tr>
    <td>${network.name}</td>
    <td>${network.chainId}</td>
    <td>${network.nativeCurrency}</td>
    <td>${network.url}</td>
  </tr>`;
    }
    exportResults += `
</table>`;
    } else {
      // Console log result
      console.log("Networks to track: ")
      console.table(networks)
      // Console log amount of addresses to track
      console.log("Querying balance for ", addresses.length, " addresses")
    }

    if (SEND_EMAIL === 'true') {
      // Create folder if not exists
      if (!fs.existsSync('exports')) fs.mkdirSync('exports')
      // Create file
      fs.writeFileSync('exports/export.md', exportResults)
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
  });