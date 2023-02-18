import { Wallet } from '@ethersproject/wallet'

import getNetworks, { INetwork } from './getNetworks'
import getAddressToTrack from './getAddressToTrack'
import getEtherscanLastTx from './getEtherscanLastTx'
import getTokenToTrack, { ITokensToTrack } from './getTokenToTrack'
import getBalancesOfAddresses, { IWalletBalancesResult } from './getBalancesOfAddresses'
import getTokensBalancesOfAddresses, { ITokensBalancesResult } from './getTokensBalancesOfAddresses'
import getTokensValue, { ITokenStablecoinOfNetwork, IPairFactoryOfNetwork, ITokenValue } from './getTokensValue'
import getMultipleTypeTokensValue from './getTokensValue'
import getCurrenciesValue, { ICurrencyValue } from './getCurrenciesValue'
import getValueFormatted from './getValueFormatted'
import getBalanceValueFormatted from './getBalanceValueFormatted'

interface IShared {
  getNetworks: () => INetwork[]
  getAddressToTrack: () => string[]
  getEtherscanLastTx: (address: string, action?: string, startblock?: number, endblock?: number, page?: number, offset?: number, sort?: string) => Promise<any>
  getTokenToTrack: () => ITokensToTrack[]
  getBalancesOfAddresses: (networks: INetwork[], addresses: string[]) => Promise<IWalletBalancesResult[]>
  getTokensBalancesOfAddresses: (networks: INetwork[], address: string, allTokens: ITokensToTrack[]) => Promise<ITokensBalancesResult[]>
  getTokensValue: (
    tokenA: string,
    tokenB: ITokenStablecoinOfNetwork[],
    pairFactory: IPairFactoryOfNetwork[],
    owner: Wallet,
    type?: string
  ) => Promise<ITokenValue>
  getMultipleTypeTokensValue: (
    tokenA: string,
    tokenB: ITokenStablecoinOfNetwork[],
    pairFactory: IPairFactoryOfNetwork[],
    owner: Wallet,
    network: string,
    type?: string
  ) => Promise<ITokenValue>
  getCurrenciesValue: (networks: INetwork[]) => Promise<ICurrencyValue[]>
  getValueFormatted: (tokenType: string, balance: string, fiatValue: string, decimalsTokenA: number, decimalsTokenB: number) => string
  getBalanceValueFormatted: (
    tokenType: string,
    balance: string,
    valueCurrency: string,
    valueCurrencyDecimalsA: number,
    valueCurrencyDecimalsB: number
  ) => string
}

const shared: IShared = {
  getNetworks,
  getAddressToTrack,
  getEtherscanLastTx,
  getTokenToTrack,
  getBalancesOfAddresses,
  getTokensBalancesOfAddresses,
  getTokensValue,
  getMultipleTypeTokensValue,
  getCurrenciesValue,
  getValueFormatted,
  getBalanceValueFormatted
}

export default shared
