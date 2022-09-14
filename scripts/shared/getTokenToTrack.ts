export interface ITokensToTrack {
  network: string
  tokens: string[]
}

const buildTokenToTrack = (tokensString, network) => {
  const tokensObject: string[] = []
  const tokens = tokensString.split(',')
  for (const token of tokens) {
    // Verify if address is already in the list
    if (!tokensObject.includes(token)) tokensObject.push(token)
  }
  return {
    network,
    tokens: tokensObject
  }
}

const getTokenToTrack = () => {
  const tokens: ITokensToTrack[] = []
  // Get all wallets to track
  const {
    // Public Mainnet
    TRACKING_TOKENS_ETHEREUM,
    TRACKING_TOKENS_POLYGON,
    TRACKING_TOKENS_BINANCE,
    TRACKING_TOKENS_OPTIMISM,
    TRACKING_TOKENS_AVALANCHE,
    // Public Testnet
    TRACKING_TOKENS_ROPSTEIN,
    TRACKING_TOKENS_RINKEBY,
    TRACKING_TOKENS_GOERLI,
    TRACKING_TOKENS_KOVAN,
    TRACKING_TOKENS_MUMBAI,
    TRACKING_TOKENS_BINANCE_TESTNET,
    TRACKING_TOKENS_OPTIMISM_TESTNET
  } = process.env

  // Get tokens to track for public mainnet
  if (TRACKING_TOKENS_ETHEREUM) tokens.push(buildTokenToTrack(TRACKING_TOKENS_ETHEREUM, 'ethereum'))
  if (TRACKING_TOKENS_POLYGON) tokens.push(buildTokenToTrack(TRACKING_TOKENS_POLYGON, 'polygon'))
  if (TRACKING_TOKENS_BINANCE) tokens.push(buildTokenToTrack(TRACKING_TOKENS_BINANCE, 'bsc'))
  if (TRACKING_TOKENS_OPTIMISM) tokens.push(buildTokenToTrack(TRACKING_TOKENS_OPTIMISM, 'optimism'))
  if (TRACKING_TOKENS_AVALANCHE) tokens.push(buildTokenToTrack(TRACKING_TOKENS_AVALANCHE, 'avalanche'))

  // Get tokens to track for public testnet
  if (TRACKING_TOKENS_ROPSTEIN) tokens.push(buildTokenToTrack(TRACKING_TOKENS_ROPSTEIN, 'ropstein'))
  if (TRACKING_TOKENS_RINKEBY) tokens.push(buildTokenToTrack(TRACKING_TOKENS_RINKEBY, 'rinkeby'))
  if (TRACKING_TOKENS_GOERLI) tokens.push(buildTokenToTrack(TRACKING_TOKENS_GOERLI, 'goerli'))
  if (TRACKING_TOKENS_KOVAN) tokens.push(buildTokenToTrack(TRACKING_TOKENS_KOVAN, 'kovan'))
  if (TRACKING_TOKENS_MUMBAI) tokens.push(buildTokenToTrack(TRACKING_TOKENS_MUMBAI, 'mumbai'))
  if (TRACKING_TOKENS_BINANCE_TESTNET) tokens.push(buildTokenToTrack(TRACKING_TOKENS_BINANCE_TESTNET, 'bscTest'))
  if (TRACKING_TOKENS_OPTIMISM_TESTNET) tokens.push(buildTokenToTrack(TRACKING_TOKENS_OPTIMISM_TESTNET, 'optimismTest'))

  return tokens
}

export default getTokenToTrack