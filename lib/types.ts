// Cryptocurrency types
export interface Cryptocurrency {
  id: string;
  symbol: string;
  name: string;
  icon: string;
  network: string;
  color: string;
}

// Fiat currency types
export interface FiatCurrency {
  id: string;
  symbol: string;
  name: string;
  icon: string;
  flag: string;
}

// Wallet types
export interface Wallet {
  id: string;
  name: string;
  icon: string;
  type: "metamask" | "rainbow" | "walletconnect" | "other";
}

// Bank types
export interface Bank {
  id: string;
  name: string;
  code: string;
}

// Transaction types
export type TransactionType = "crypto-to-cash" | "cash-to-crypto" | "crypto-to-fiat-loan";

// Form state types
export interface ConversionFormData {
  payAmount: string;
  payCurrency: Cryptocurrency | null;
  receiveAmount: string;
  receiveCurrency: FiatCurrency | null;
  payFrom: Wallet | null;
  payTo: {
    bank: Bank | null;
    accountNumber: string;
    accountName: string;
    email: string;
    phone: string;
    phoneCountryCode: string;
  };
}

// Widget step types
export type WidgetStep = 
  | "main"
  | "recipient-bank"
  | "recipient-contact"
  | "send-crypto"
  | "processing"
  | "success"
  | "coming-soon";

// Country code for phone
export interface CountryCode {
  code: string;
  dial: string;
  flag: string;
  name: string;
}
