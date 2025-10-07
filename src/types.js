/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} email
 * @property {string} country
 * @property {string} phone
 * @property {string} role
 * @property {number} total_balance
 * @property {number} total_deposit
 * @property {number} total_profit
 * @property {'pending' | 'approved' | 'rejected'} kyc_status
 * @property {string | null | undefined} [selected_trader]
 */

/**
 * @typedef {Object} Transaction
 * @property {string} id
 * @property {string} user
 * @property {'deposit' | 'withdraw' | 'trade'} type
 * @property {string} asset
 * @property {number} amount
 * @property {number} value
 * @property {number} fee
 * @property {'pending' | 'completed' | 'failed'} status
 * @property {string} date
 */

/**
 * @typedef {Object} Trader
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {number} performance
 * @property {boolean} active
 */

/**
 * @typedef {Object} WalletAddress
 * @property {string} id
 * @property {'BTC' | 'ETH' | 'USDT'} currency
 * @property {string} network
 * @property {string} address
 */

export const API_BASE_URL = 'https://prime-api-gm2o.onrender.com';
