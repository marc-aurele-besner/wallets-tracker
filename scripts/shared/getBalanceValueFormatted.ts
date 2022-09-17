import { ethers } from 'hardhat'

const getBalanceValueFormatted = (
  tokenType: string,
  balance: string,
  valueCurrency: string,
  valueCurrencyDecimalsA: number,
  valueCurrencyDecimalsB: number
) => {
  if (tokenType === 'stablecoin') {
    const balanceFormatted = ethers.utils.formatUnits(balance, valueCurrencyDecimalsA).split('.')
    return balanceFormatted[0] + '.' + balanceFormatted[1].slice(0, 2)
  } else if (valueCurrency === 'TBD') return valueCurrency
  else {
    const fiatBalanceValue_unit =
      balance && valueCurrency
        ? ethers.utils.formatUnits(ethers.BigNumber.from(balance).mul(valueCurrency), valueCurrencyDecimalsA + valueCurrencyDecimalsB + 18).split('.')[0]
        : null
    const fiatBalanceValue_decimals =
      balance && valueCurrency && valueCurrency !== 'TBD'
        ? ethers.utils
            .formatUnits(ethers.BigNumber.from(balance).mul(valueCurrency), valueCurrencyDecimalsA + valueCurrencyDecimalsB + 18)
            .split('.')[1]
            .substring(0, 2)
        : null
    if (fiatBalanceValue_unit !== null || fiatBalanceValue_decimals !== null) return fiatBalanceValue_unit + '.' + fiatBalanceValue_decimals
    else return 'TBD'
  }
}

export default getBalanceValueFormatted
