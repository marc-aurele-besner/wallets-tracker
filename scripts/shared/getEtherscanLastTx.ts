import axios from 'axios'

const { ETHERSCAN_API_KEY } = process.env

interface TxResult {
  blockNumber: string
  timeStamp: string
  hash: string
  nonce: string
  blockHash: string
  transactionIndex: string
  from: string
  to: string
  value: string
  gas: string
  gasPrice: string
  isError: string
  txreceipt_status: string
  input: string
  contractAddress: string
  cumulativeGasUsed: string
  gasUsed: string
  confirmations: string
  methodId: string
  functionName: string
}

interface TxInteralResult {
  blockNumber: string
  timeStamp: string
  hash: string
  from: string
  to: string
  value: string
  contractAddress: string
  input: string
  type: string
  gas: string
  gasUsed: string
  traceId: string
  isError: string
  errCode: string
}

const getEtherscanLastTx = async (
  address: string,
  action?: string,
  startblock?: number,
  endblock?: number,
  page?: number,
  offset?: number,
  sort?: string
): Promise<TxResult[] | TxInteralResult[]> => {
  if (!action) action = 'txlist'
  if (!startblock) startblock = 0
  if (!endblock) endblock = 99999999
  if (!page) page = 1
  if (!offset) offset = 10
  if (!sort) sort = 'desc'

  if (action !== 'txlist' && action !== 'txlistinternal') throw new Error(`Invalid action: ${action}`)
  if (sort !== 'desc' && sort !== 'arc') throw new Error(`Invalid sortint: ${sort}`)

  const api = `https://api.etherscan.io/api?module=account&action=${action}&address=${address}&startblock=${startblock}&endblock=${endblock}&page=${page}&offset=${offset}&sort=${sort}&apikey=${ETHERSCAN_API_KEY}`

  const response = await axios.get(api)

  if (response.status !== 200) {
    throw new Error(`Error getting last tx from etherscan: ${response.statusText}`)
  }

  const { data } = response
  return data.result
}

export default getEtherscanLastTx
