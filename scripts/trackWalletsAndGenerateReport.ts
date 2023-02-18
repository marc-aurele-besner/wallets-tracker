import { ethers } from 'hardhat'
import fs from 'fs'

import helper from './shared'
import { IWalletBalancesResult } from './shared/getBalancesOfAddresses'
import { ITokensBalancesResult } from './shared/getTokensBalancesOfAddresses'

const renderEtherscanLastTx = async (address: string, sendEmail = 'false') => {
  let exportResults = ''
  let countTx = 0
  const ethereumLastTx = await helper.getEtherscanLastTx(address, 'txlist')
      // Ethereum last tx
      if (ethereumLastTx.length > 0 && sendEmail === 'true') {
        exportResults += `
  
## Ethereum last transaction ${address}

  <table>
    <thead>
      <tr>
        <th>BlockNumber</th>
        <th>TimeStamp</th>
        <th>From</th>
        <th>To</th>
        <th>Value</th>
        <th>FunctionName</th>
      </tr>
    </thead>
    <tbody>`;
      for (const transaction of ethereumLastTx) {
        if (transaction.blockNumber && transaction.timeStamp && transaction.timeStamp >= Date.now() / 1000 - (60 * 60 * 24 * 7))
        exportResults += `
      <tr>
        <td><small>${transaction.blockNumber}</small></td>
        <td>${transaction.timeStamp}</td>
        <td>${transaction.from}</td>
        <td>${transaction.to}</td>
        <td>${transaction.value}</td>
        <td>${transaction.functionName}</td>
      </tr>`;
      countTx += 1
      }
      exportResults += `
    </tbody>
  </table>`;
      }
  if (countTx > 0) return exportResults
  return ''
}

const renderEtherscanInternalLastTx = async (address: string, sendEmail = 'false') => {
  let exportResults = ''
  let countTx = 0
  const ethereumLastTxInternal = await helper.getEtherscanLastTx(address, 'txlistinternal')
      // Ethereum last txInternal
      if (ethereumLastTxInternal.length > 0 && sendEmail === 'true') {
        exportResults += `
  
  ### Ethereum last transaction (Internal) ${address}
  
  <table>
    <thead>
      <tr>
        <th>BlockNumber</th>
        <th>TimeStamp</th>
        <th>From</th>
        <th>To</th>
        <th>Value</th>
        <th>ContractAddress</th>
        <th>Input</th>
      </tr>
    </thead>
    <tbody>`;
      for (const transaction of ethereumLastTxInternal) {
        if (transaction.blockNumber && transaction.timeStamp && transaction.timeStamp >= Date.now() / 1000 - (60 * 60 * 24 * 7))
        exportResults += `
      <tr>
        <td><small>${transaction.blockNumber}</small></td>
        <td>${transaction.timeStamp}</td>
        <td>${transaction.from}</td>
        <td>${transaction.to}</td>
        <td>${transaction.value}</td>
        <td>${transaction.contractAddress}</td>
        <td>${transaction.input}</td>
      </tr>`;
      countTx += 1
      }
      exportResults += `
    </tbody>
  </table>`;
      }
  if (countTx > 0) return exportResults
  return ''
}

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
    let totalValueAllWallets = ethers.BigNumber.from(0)
    let totalValueWallet: string[] = []
    // Balances list
    for (const address of addresses) {
      totalValueWallet[address] = ethers.BigNumber.from(0)
      exportResults += await renderEtherscanLastTx(address, SEND_EMAIL)
      exportResults += await renderEtherscanInternalLastTx(address, SEND_EMAIL)
      
      
      const balancesList = walletBalancesResult[address].map((result: IWalletBalancesResult) => {
        const valueOfCurrency = valueOfCurrencies.find((currency) => currency.chainId === result.chainId)
        const balanceFormatted = ethers.utils.formatEther(result.balance)
        const fiatValueFormatted = valueOfCurrency?.value && valueOfCurrency?.value !== 'TBD'
          ? helper.getValueFormatted('', '1', valueOfCurrency.value, valueOfCurrency?.decimalsTokenA || 0, valueOfCurrency?.decimalsTokenB || 0)
          : 'TBD'
        const fiatBalanceValueFormatted = helper.getBalanceValueFormatted('', result.balance, valueOfCurrency?.value || '', valueOfCurrency?.decimalsTokenA || 0, valueOfCurrency?.decimalsTokenB || 0)
        if (fiatBalanceValueFormatted && fiatBalanceValueFormatted !== 'TBD') {
          totalValueAllWallets = totalValueAllWallets.add(ethers.BigNumber.from(fiatBalanceValueFormatted.split('.')[0]).mul(100).add(ethers.BigNumber.from(fiatBalanceValueFormatted.split('.')[1])))
          totalValueWallet[address] = totalValueWallet[address].add(ethers.BigNumber.from(fiatBalanceValueFormatted.split('.')[0]).mul(100).add(ethers.BigNumber.from(fiatBalanceValueFormatted.split('.')[1])))
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
      const tokensBalancesResult = await helper.getTokensBalancesOfAddresses(networks, address, allTokens)
      const tokensBalancesList = tokensBalancesResult[address] ? tokensBalancesResult[address].map((result: ITokensBalancesResult) => {
        const balanceFormatted = ethers.utils.formatUnits(result.balance, result.decimalsTokenA == 0 ? 18 : result.decimalsTokenA)
        const fiatValueFormatted = helper.getValueFormatted(result.type, balanceFormatted, result.fiatValue, result.decimalsTokenA, result.decimalsTokenB)
        const fiatBalanceValueFormatted = helper.getBalanceValueFormatted(result.type, result.balance, result.fiatValue, result.decimalsTokenA, result.decimalsTokenB)
        if (fiatBalanceValueFormatted && fiatBalanceValueFormatted !== 'TBD') {
          totalValueAllWallets = totalValueAllWallets.add(ethers.BigNumber.from(fiatBalanceValueFormatted.split('.')[0]).mul(100).add(ethers.BigNumber.from(fiatBalanceValueFormatted.split('.')[1])))
          totalValueWallet[address] = totalValueWallet[address].add(ethers.BigNumber.from(fiatBalanceValueFormatted.split('.')[0]).mul(100).add(ethers.BigNumber.from(fiatBalanceValueFormatted.split('.')[1])))
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
      }) : [];
      totalValueWallet[address] = ethers.utils.formatUnits(totalValueWallet[address], 2)
      if (SEND_EMAIL === 'true') {
        exportResults += `

## Balance of ${address}
<table>
  <thead>
    <tr>
      <th>Type</th>
      <th>Network</th>
      <th>ChainId</th>
      <th>Balance</th>
      <th>Currency Value</th>
      <th>Balance Value</th>
    </tr>
  </thead>
  <tbody>`;
        for (const balance of balancesList) {
          exportResults += `
    <tr>
      <td><small>${balance.networkType}</small></td>
      <td>${balance.network}</td>
      <td>${balance.chainId}</td>
      <td>${balance.balance} ${balance.nativeCurrency}</td>
      <td>${balance.fiatValue} ${balance.fiatSymbol}</td>
      <td>${balance.fiatBalanceValue}</td>
    </tr>`;
        }
        exportResults += `
  </tbody>
</table>`

        if (tokensBalancesList.length > 0) {
          exportResults += `
### Tokens balances of ${address}
<table>
  <thead>
    <tr>
      <th>Type</th>
      <th>Network</th>
      <th>ChainId</th>
      <th>Token</th>
      <th>Balance</th>
      <th>Token Value</th>
      <th>Balance Value</th>
    </tr>
  </thead>
  <tbody>`;
          for (const balance of tokensBalancesList) {
            exportResults += `
    <tr>
      <td><small>${balance.networkType}</small></td>
      <td>${balance.network}</td>
      <td>${balance.chainId}</td>
      <td>${balance.tokenName}</td>
      <td>${balance.balance} ${balance.tokenSymbol}</td>
      <td>${balance.fiatValue} ${balance.fiatSymbol}</td>
      <td>${balance.fiatBalanceValue}</td>
    </tr>`;
          }
        exportResults += `
  </tbody>
</table>
`;
        }
        exportResults += `

### Total balance value for ${address} addresses: ${totalValueWallet[address]} (crypto + tokens)
`;
      }
  }
    // Network list
    if (SEND_EMAIL === 'true') {
      exportResults += `

### Total balance value for all wallets: ${ethers.utils.formatUnits(totalValueAllWallets, 2)} (crypto + tokens)

## Querying ${networks.length} networks

## Networks to track
<table>
  <thead>
    <tr>
      <th>Type</th>
      <th>Network</th>
      <th>ChainId</th>
      <th>Native Currency</th>
      <th>RPC URL</th>
    </tr>
  </thead>
  <tbody>`;
    for (const network of networks) {
      exportResults += `
    <tr>
      <td><small>${network.type}</small></td>
      <td>${network.name}</td>
      <td>${network.chainId}</td>
      <td>${network.nativeCurrency}</td>
      <td>${network.url}</td>
    </tr>`;
    }
    exportResults += `
  </tbody>
</table>`;
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