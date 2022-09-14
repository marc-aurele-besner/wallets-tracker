import { ethers } from 'hardhat'

const getAddressToTrack = () => {
  const addresses: string[] = []
  // Get all wallets to track
  const { TRACKING_PERSONAL_WALLET, TRACKING_OTHERS_WALLET } = process.env

  // Get personal address to track
  if (TRACKING_PERSONAL_WALLET) {
    const addressesBatch1 = TRACKING_PERSONAL_WALLET.split(',')
    for (const address of addressesBatch1) {
      // Check if address is valid
      if (ethers.utils.isAddress(address)) {
        // Verify if address is already in the list
        if (!addresses.includes(address)) addresses.push(address)
      }
    }
  }
  // Get others address to track
  if (TRACKING_OTHERS_WALLET) {
    const addressesBatch2 = TRACKING_OTHERS_WALLET.split(',')
    for (const address of addressesBatch2) {
      // Check if address is valid
      if (ethers.utils.isAddress(address)) {
        // Verify if address is already in the list
        if (!addresses.includes(address)) addresses.push(address)
      }
    }
  }
  return addresses
}

export default getAddressToTrack
