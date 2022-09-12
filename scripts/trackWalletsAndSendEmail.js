const fs = require('fs');
const helper = require('./shared');

async function main() {
  const networks = helper.getNetworks();
  const addresses = helper.getAddressToTrack();
  const finalResults = await helper.getBalancesOfAddresses(networks, addresses);
  let exportResults = `
  <!DOCTYPE HTML>
  <HTML>
  <HEAD>
    <TITLE>Wallets Balances</TITLE>
    <STYLE>
      H1, H2, H3 {
        font-family: arial, sans-serif;
      }

      TABLE {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
      }
      
      TD, TH {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
      }
      
      TR:nth-child(even) {
        background-color: #dddddd;
      }
    </STYLE>
  </HEAD>
  <BODY>
    <H1>Wallets Balances</H1>`;
  // Get env variables to send email status
  const { SEND_EMAIL } = process.env;

  if (SEND_EMAIL === 'true') {
    exportResults += `<H2>Networks to track</H2>
    <TABLE>
      <TR>
        <TH>Network</TH>
        <TH>ChainId</TH>
        <TH>RPC URL</TH>
      </TR>`;
    for (network of networks) {
      exportResults += `<TR>
        <TD>${network.name}</TD>
        <TD>${network.chainId}</TD>
        <TD>${network.url}</TD>
      </TR>`;
    }
    exportResults += `<H3>Querying balance for ${addresses.length} addresses</H3>
    </TABLE>`;
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
      exportResults += `<H2>Balance of ${address}</H2>
      <TABLE>
        <TR>
          <TH>Network</TH>
          <TH>ChainId</TH>
          <TH>Balance</TH>
        </TR>`;
      for (balance of balancesList) {
        exportResults += `<TR>
            <TD>${balance.network}</TD>
            <TD>${balance.chainId}</TD>
            <TD>${balance.balance}</TD>
          </TR>`;
      }
      exportResults += `</TABLE>`;
    } else {
      // Console log result
      console.log("Balance of ", address);
      console.table(balancesList);
    }
  }
  if (SEND_EMAIL === 'true') {
    exportResults += `</BODY>
    </HTML>`;
    fs.writeFileSync('exports/export.html', exportResults);
  }
  console.log(`Scrip executed`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
