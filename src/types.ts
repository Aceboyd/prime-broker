export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  phone: string;
  role: string;
  total_balance: number;
  total_deposit: number;
  total_profit: number;
  bonus?: number;
  total_withdrawal?: number;
  kyc_status: 'pending' | 'approved' | 'rejected';
  selected_trader?: string | null;
  kyc_documents?: {
    front_url?: string | null;
    back_url?: string | null;
    id_document_url?: string | null;
    proof_of_address_url?: string | null;
    selfie_url?: string | null;
    additional_document_url?: string | null;
  } | null;
};

export type Transaction = {
  id: string;
  user: string;
  type: 'deposit' | 'withdraw' | 'trade';
  asset: string;
  amount: number;
  value: number;
  fee: number;
  status: 'pending' | 'completed' | 'failed';
  date: string;
};

export type Trader = {
  id: string;
  name: string;
  description: string;
  performance: number;
  active: boolean;
  followers?: number;
  risk?: "Low" | "Medium" | "High";
  roi?: number;
  win_rate?: number;
  trades?: number;
  min_invest?: number;
  max_invest?: number;
  duration?: string;
  slots?: number;
  image_url?: string;
};

export type WalletAddress = {
  id: string;
  currency: 'BTC' | 'ETH' | 'USDT';
  network: string;
  address: string;
};

export const API_BASE_URL = 'https://prime-api-gm2o.onrender.com';
