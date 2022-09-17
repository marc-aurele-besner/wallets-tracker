import { ethers } from 'hardhat'

const getValueFormatted = (tokenType: string, balance: string, fiatValue: string, decimalsTokenA: number, decimalsTokenB: number) => {
  if (tokenType === 'stablecoin') {
    const valueFormatted = balance.split('.')
    return valueFormatted[0] + '.' + valueFormatted[1].substring(0, 2)
  } else if (fiatValue == 'TBD') return 'TBD'
  else {
    const fiatValueOfToken = ethers.utils.formatUnits(fiatValue, decimalsTokenA + decimalsTokenB).split('.')
    return fiatValueOfToken[0] + '.' + fiatValueOfToken[1].substring(0, 2)
  }
}

export default getValueFormatted
