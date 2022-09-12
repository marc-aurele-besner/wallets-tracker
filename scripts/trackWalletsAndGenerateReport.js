const fs = require('fs');
const helper = require('./shared');

async function main() {
  const networks = helper.getNetworks();
  const addresses = helper.getAddressToTrack();
  const finalResults = await helper.getBalancesOfAddresses(networks, addresses);
  let exportResults = `
<style>
  h1, h2, h3 {
    font-family: arial, sans-serif;
  }

  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  
  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
  
  tr:nth-child(even) {
    background-color: #dddddd;
  }
</style>
# Wallets Balances`;
  // Get env variables to send email status
  const { SEND_EMAIL } = process.env;

  if (SEND_EMAIL === 'true') {
    exportResults += `
## Networks to track
<table>
  <tr>
    <th>Network</th>
    <th>ChainId</th>
    <th>RPC URL</th>
  </tr>`;
    for (network of networks) {
      exportResults += `
  <tr>
    <td>${network.name}</td>
    <td>${network.chainId}</td>
    <td>${network.url}</td>
  </tr>`;
    }
    exportResults += `
## Querying balance for ${addresses.length} addresses
</table>`;
  } else {
    // Console log result
    console.log("Networks to track: ");
    console.table(networks);
    // Console log amount of addresses to track
    console.log("Querying balance for ", addresses.length, " addresses");
  }

  for (address of addresses) {
    const balancesList = finalResults[address].map((result) => {
      return {
        chainId: result.chainId,
        network: result.network,
        balance: result.balance,
      };
    });
    if (SEND_EMAIL === 'true') {
      exportResults += `
## Balance of ${address}
<table>
  <tr>
    <th>Network</th>
    <th>ChainId</th>
    <th>Balance</th>
  </tr>`;
      for (balance of balancesList) {
        exportResults += `
  <tr>
    <td>${balance.network}</td>
    <td>${balance.chainId}</td>
    <td>${balance.balance}</td>
  </tr>`;
      }
      exportResults += `
</table>`;
    } else {
      // Console log result
      console.log("Balance of ", address);
      console.table(balancesList);
    }
  }
  if (SEND_EMAIL === 'true') {
    // Create folder if not exists
    if (!fs.existsSync('exports')) fs.mkdirSync('exports');
    // Create file
    fs.writeFileSync('exports/export.md', exportResults);
  }
  console.log(`Scrip executed`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
