import getNetworks, { INetwork } from './getNetworks'
import getAddressToTrack from './getAddressToTrack'
import getTokenToTrack, { ITokensToTrack } from './getTokenToTrack'
import getBalancesOfAddresses, { IWalletBalancesResult } from './getBalancesOfAddresses'
import getTokensBalancesOfAddresses, { ITokensBalancesResult } from './getTokensBalancesOfAddresses'
import getTokensValue, { ITokenStablecoinOfNetwork, IPairFactoryOfNetwork, ITokenValue } from './getTokensValue'

interface IShared {
  getNetworks: () => INetwork[]
  getAddressToTrack: () => string[]
  getTokenToTrack: () => ITokensToTrack[]
  getBalancesOfAddresses: (networks: INetwork[], addresses: string[]) => Promise<IWalletBalancesResult[]>
  getTokensBalancesOfAddresses: (networks: INetwork[], address: string, allTokens: ITokensToTrack[]) => Promise<ITokensBalancesResult[]>
  getTokensValue: (tokenA: string, tokenB: ITokenStablecoinOfNetwork[], pairFactory: IPairFactoryOfNetwork[]) => Promise<ITokenValue>
}

const shared: IShared = {
  getNetworks,
  getAddressToTrack,
  getTokenToTrack,
  getBalancesOfAddresses,
  getTokensBalancesOfAddresses,
  getTokensValue
}

export default shared
