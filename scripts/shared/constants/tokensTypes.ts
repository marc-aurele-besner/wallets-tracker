export type TERC20 = 'ERC20'
export type TERC721 = 'ERC721'
export type TERC1155 = 'ERC1155'
export type TLP = 'LP'
export type TAMTOKEN = 'AMTOKEN'
type TUnknown = 'unknown' | ''

export type TTokensTypes = TERC20 | TERC721 | TERC1155 | TLP | TAMTOKEN | TUnknown

const tokensTypes: TTokensTypes[] = [
  'LP',
  'AMTOKEN',
  'ERC20'
  // To-Do: implement the rest of the tokens types
  // 'ERC721',
  // 'ERC1155'
]

export default tokensTypes
