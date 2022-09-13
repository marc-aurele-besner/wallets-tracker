import { ethers } from 'hardhat'
import { Wallet } from "@ethersproject/wallet";

export interface ITokenValue {
  value: string
  symbol: string
  error: string
}

export interface ITokenStablecoinOfNetwork {
  address: string
  symbol: string
}

export interface IPairFactoryOfNetwork {
  address: string
  contractName: string
}

const { DUMMY_PRIVATE_KEY } = process.env

const getTokensValue = async (tokenA: string, tokenB: ITokenStablecoinOfNetwork[], pairFactory: IPairFactoryOfNetwork[], owner: Wallet) => {
  let tokenValue: ITokenValue = {
    value: 'TBD',
    symbol: '$',
    error: ''
  }
  if (DUMMY_PRIVATE_KEY) {
    try {
      // Get ERC20 Factory
      let PairFactory
      let pairId = 0
      try {
        PairFactory = await ethers.getContractFactory(pairFactory[0].contractName)
      } catch (error) {
        if (pairFactory.length > 1) {
          try {
            PairFactory = await ethers.getContractFactory(pairFactory[1].contractName)
            pairId = 1
          } catch (error) {
            console.log('No contract found')
          }
        } else {
          console.log('No contract found')
        }
      }
      if (PairFactory) {
        const PairFactoryContract = await new ethers.Contract(pairFactory[pairId].address, PairFactory.interface, owner)
        // Get pair from LP factory
        let pair
        let tokenBid = 0
        let tokenBAddress = tokenB[0].address
        try {
          pair = await PairFactoryContract.getPair(tokenA, tokenB[0].address)
        } catch (error) {
          if (tokenB.length > 1) {
            try {
              pair = await PairFactoryContract.getPair(tokenA, tokenB[1].address)
              tokenBid = 1
              tokenBAddress = tokenB[1].address
            } catch (error) {
              console.log('Cannot get pair, try ', tokenA, tokenB[1].address, ' with factory ', pairFactory[pairId].address)
            }
          } else {
            console.log('Cannot get pair, try ', tokenA, tokenB[0].address, ' with factory ', pairFactory[pairId].address)
          }
        }
        if (pair) {
          // Get ERC20 Factory
          const ERC20Factory = await ethers.getContractFactory('MockERC20Upgradeable')
          // Get ERC20 Contract
          const TokenAContract = await new ethers.Contract(tokenA, ERC20Factory.interface, owner)
          const TokenBContract = await new ethers.Contract(tokenBAddress, ERC20Factory.interface, owner)
          // Get balance token 0 & 1
          const balanceTokenA = await TokenAContract.balanceOf(pair)
          const symbolTokenA = await TokenAContract.symbol()
          const decimalsTokenA = await TokenAContract.decimals()
          const floatBalanceTokenA = ethers.BigNumber.from(ethers.utils.formatUnits(balanceTokenA, decimalsTokenA))

          const balanceTokenB = await TokenBContract.balanceOf(pair)
          const symbolTokenB = await TokenBContract.symbol()
          const decimalsTokenB = await TokenAContract.decimals()
          const floatBalanceTokenB = ethers.BigNumber.from(ethers.utils.formatUnits(balanceTokenB, decimalsTokenB))
          
          console.log('balanceTokenA', balanceTokenA.toString(), 'balanceTokenB', balanceTokenB.toString())
          console.log('try', ethers.BigNumber.from(balanceTokenA).div(balanceTokenB))
          // if (balanceTokenB) {
            // const valueTokenAoverB = ethers.BigNumber.from(balanceTokenA).mul(ethers.BigNumber.from(10).pow(decimalsTokenB)).div(balanceTokenB).div(ethers.BigNumber.from(10).pow(decimalsTokenB))
            // const valueFormatter = ethers.BigNumber.from(floatBalanceTokenA).div(floatBalanceTokenB)
            // console.log('valueFormatted', valueTokenAoverB, decimalsTokenA, symbolTokenB)
            // console.log('valueFormatter', valueFormatter)
            // tokenValue = {
            //   value: ethers.utils.formatUnits(valueTokenAoverB, decimalsTokenA),
            //   symbol: symbolTokenB,
            //   error: ''
            // }
          // } else tokenValue.error = 'Balance token B is 0'
        } else tokenValue.error = 'No pair found for ' + tokenA + ' and ' + tokenB[tokenBid].address
      } else tokenValue.error = 'No pair factory found'
    } catch (error) {
      console.log('Error while connecting to network ', error)
    }
  }
  return tokenValue
}

export default getTokensValue
