import getNetworks, { INetwork } from './getNetworks'
import getAddressToTrack from './getAddressToTrack'
import getBalancesOfAddresses, { IFinalResult } from './getBalancesOfAddresses'

interface IShared {
    getNetworks: () => INetwork[]
    getAddressToTrack: () => string[]
    getBalancesOfAddresses: (networks: INetwork[], addresses: string[]) => Promise<IFinalResult[]>
}

const shared: IShared = {
    // Functions
    getNetworks,
    getAddressToTrack,
    getBalancesOfAddresses
}

export default shared