import { Cryptocurrency, FiatCurrency, Wallet, Bank, CountryCode } from "./types";

// Cryptocurrencies data
export const cryptocurrencies: Cryptocurrency[] = [
  {
    id: "eth",
    symbol: "ETH",
    name: "Ethereum",
    icon: "/eth.svg",
    network: "ETH",
    color: "#627EEA",
  },
  {
    id: "usdt-celo",
    symbol: "USDT",
    name: "USDT - CELO",
    icon: "/celo.svg",
    network: "CELO",
    color: "#26A17B",
  },
  {
    id: "usdt-ton",
    symbol: "USDT",
    name: "USDT - TON",
    icon: "/ton.svg",
    network: "TON",
    color: "#0088CC",
  },
];

// Fiat currencies data
export const fiatCurrencies: FiatCurrency[] = [
  {
    id: "ngn",
    symbol: "NGN",
    name: "Nigerian Naira",
    icon: "₦",
    flag: "/naija-flag.svg",
  },
  {
    id: "usd",
    symbol: "USD",
    name: "US Dollar",
    icon: "$",
    flag: "/us.png",
  },
  {
    id: "eur",
    symbol: "EUR",
    name: "Euro",
    icon: "€",
    flag: "/euro.png",
  },
];

// Wallets data
export const wallets: Wallet[] = [
  {
    id: "metamask",
    name: "Metamask",
    icon: "/meta.svg",
    type: "metamask",
  },
  {
    id: "rainbow",
    name: "Rainbow",
    icon: "/rbw.svg",
    type: "rainbow",
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    icon: "/wallet.svg",
    type: "walletconnect",
  },
  {
    id: "other",
    name: "Other Crypto Wallets (Binance, Coinbase, Bybit etc)",
    icon: "/other.svg",
    type: "other",
  },
];

// Nigerian Banks data
export const banks: Bank[] = [
  { id: "access", name: "Access Bank", code: "044" },
  { id: "gtbank", name: "Guaranty Trust Bank", code: "058" },
  { id: "zenith", name: "Zenith Bank", code: "057" },
  { id: "firstbank", name: "First Bank of Nigeria", code: "011" },
  { id: "uba", name: "United Bank for Africa", code: "033" },
  { id: "fidelity", name: "Fidelity Bank", code: "070" },
  { id: "fcmb", name: "First City Monument Bank", code: "214" },
  { id: "sterling", name: "Sterling Bank", code: "232" },
  { id: "union", name: "Union Bank of Nigeria", code: "032" },
  { id: "wema", name: "Wema Bank", code: "035" },
  { id: "stanbic", name: "Stanbic IBTC Bank", code: "221" },
  { id: "polaris", name: "Polaris Bank", code: "076" },
  { id: "ecobank", name: "Ecobank Nigeria", code: "050" },
  { id: "keystone", name: "Keystone Bank", code: "082" },
  { id: "kuda", name: "Kuda Bank", code: "090267" },
  { id: "opay", name: "Opay", code: "100004" },
  { id: "palmpay", name: "Palmpay", code: "100033" },
  { id: "moniepoint", name: "Moniepoint", code: "100022" },
];

// Country codes for phone
export const countryCodes: CountryCode[] = [
  { code: "NG", dial: "+234", flag: "🇳🇬", name: "Nigeria" },
  { code: "US", dial: "+1", flag: "🇺🇸", name: "United States" },
  { code: "GB", dial: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "KE", dial: "+254", flag: "🇰🇪", name: "Kenya" },
  { code: "GH", dial: "+233", flag: "🇬🇭", name: "Ghana" },
  { code: "ZA", dial: "+27", flag: "🇿🇦", name: "South Africa" },
];

// Generate a mock transaction ID
export const generateTransactionId = (): string => {
  const prefix = "NC";
  const randomDigits = Math.random().toString().slice(2, 11);
  return `${prefix}${randomDigits}`;
};

// Mock wallet address
export const mockWalletAddress = "4LiV4YjbxsL6739MKghUd";

// Default exchange rate (for demo purposes)
export const exchangeRates: Record<string, Record<string, number>> = {
  ETH: { NGN: 5500000, USD: 3500, EUR: 3200, GBP: 2800, KES: 450000 },
  BTC: { NGN: 95000000, USD: 60000, EUR: 55000, GBP: 48000, KES: 7800000 },
  USDT: { NGN: 1580, USD: 1, EUR: 0.92, GBP: 0.79, KES: 130 },
  USDC: { NGN: 1580, USD: 1, EUR: 0.92, GBP: 0.79, KES: 130 },
};
