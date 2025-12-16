"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TabSwitch } from "./TabSwitch";
import { CryptoToCashScreen } from "./CryptoToCashScreen";
import { RecipientBankScreen } from "./RecipientBankScreen";
import { RecipientContactScreen } from "./RecipientContactScreen";
import { SendCryptoScreen } from "./SendCryptoScreen";
import { SuccessScreen } from "./SuccessScreen";
import { ComingSoonScreen } from "./ComingSoonScreen";
import {
  TransactionType,
  WidgetStep,
  Cryptocurrency,
  FiatCurrency,
  Wallet,
  Bank,
  CountryCode,
} from "@/lib/types";
import {
  cryptocurrencies,
  fiatCurrencies,
  countryCodes,
  exchangeRates,
  generateTransactionId,
  mockWalletAddress,
} from "@/lib/data";

export function Widget() {
  // Tab state
  const [activeTab, setActiveTab] = useState<TransactionType>("crypto-to-cash");
  const [currentStep, setCurrentStep] = useState<WidgetStep>("main");

  // Form state
  const [payAmount, setPayAmount] = useState("1.00");
  const [payCurrency, setPayCurrency] = useState<Cryptocurrency | null>(
    cryptocurrencies[0]
  );
  const [receiveAmount, setReceiveAmount] = useState("1.00");
  const [receiveCurrency, setReceiveCurrency] = useState<FiatCurrency | null>(
    fiatCurrencies[0]
  );
  const [payFrom, setPayFrom] = useState<Wallet | null>(null);

  // Recipient state
  const [bank, setBank] = useState<Bank | null>(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState<CountryCode>(countryCodes[0]);

  // Transaction state
  const [transactionId, setTransactionId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Calculate receive amount based on pay amount and currencies
  useEffect(() => {
    if (payAmount && payCurrency && receiveCurrency) {
      const rate =
        exchangeRates[payCurrency.symbol]?.[receiveCurrency.symbol] || 1;
      const calculated = parseFloat(payAmount) * rate;
      setReceiveAmount(calculated.toLocaleString("en-US", { maximumFractionDigits: 2 }));
    }
  }, [payAmount, payCurrency, receiveCurrency]);

  // Simulate account name lookup
  useEffect(() => {
    if (bank && accountNumber.length === 10) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        // Mock account name lookup
        setAccountName("BALA LADALO DANIEL");
        setIsLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setAccountName("");
    }
  }, [bank, accountNumber]);

  // Handle tab change
  const handleTabChange = useCallback((tab: TransactionType) => {
    setActiveTab(tab);
    if (tab === "crypto-to-cash") {
      setCurrentStep("main");
    } else {
      setCurrentStep("coming-soon");
    }
  }, []);

  // Handle convert action
  const handleConvert = useCallback(() => {
    if (!payFrom) {
      // Could show an error toast here
      return;
    }
    setCurrentStep("recipient-bank");
  }, [payFrom]);

  // Handle go back to recipient bank
  const handleBackToBank = useCallback(() => {
    setCurrentStep("recipient-bank");
  }, []);

  // Handle next from bank screen
  const handleBankNext = useCallback(() => {
    setCurrentStep("recipient-contact");
  }, []);

  // Handle next from contact screen
  const handleContactNext = useCallback(() => {
    setCurrentStep("send-crypto");
  }, []);

  // Handle confirm send
  const handleConfirmSend = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setTransactionId(generateTransactionId());
      setCurrentStep("success");
      setIsLoading(false);
    }, 1500);
  }, []);

  // Handle go home
  const handleGoHome = useCallback(() => {
    // Reset form
    setPayAmount("1.00");
    setPayCurrency(cryptocurrencies[0]);
    setReceiveCurrency(fiatCurrencies[0]);
    setPayFrom(null);
    setBank(null);
    setAccountNumber("");
    setAccountName("");
    setEmail("");
    setPhone("");
    setCurrentStep("main");
  }, []);

  // Get the recipient label
  const getPayToLabel = useCallback(() => {
    if (bank && accountName) {
      return `${bank.name} - ${accountName}`;
    }
    return "Select an option";
  }, [bank, accountName]);

  // Render current screen
  const renderScreen = () => {
    if (activeTab !== "crypto-to-cash") {
      const featureName =
        activeTab === "cash-to-crypto" ? "Cash to Crypto" : "Crypto to Fiat Loan";
      return (
        <ComingSoonScreen
          featureName={featureName}
          onSubmit={(email) => console.log("Subscribed:", email)}
        />
      );
    }

    switch (currentStep) {
      case "recipient-bank":
        return (
          <RecipientBankScreen
            bank={bank}
            onBankChange={setBank}
            accountNumber={accountNumber}
            onAccountNumberChange={setAccountNumber}
            accountName={accountName}
            onBack={() => setCurrentStep("main")}
            onNext={handleBankNext}
            isLoading={isLoading}
          />
        );

      case "recipient-contact":
        return (
          <RecipientContactScreen
            email={email}
            onEmailChange={setEmail}
            phone={phone}
            onPhoneChange={setPhone}
            countryCode={countryCode}
            onCountryCodeChange={setCountryCode}
            onBack={handleBackToBank}
            onNext={handleContactNext}
            isLoading={isLoading}
          />
        );

      case "send-crypto":
        return (
          <SendCryptoScreen
            walletAddress={mockWalletAddress}
            amount={payAmount}
            cryptoSymbol={payCurrency?.symbol || "ETH"}
            network={payCurrency?.network || "ETH"}
            walletType={payFrom?.name || "Other"}
            onBack={() => setCurrentStep("recipient-contact")}
            onConfirm={handleConfirmSend}
            isLoading={isLoading}
          />
        );

      case "success":
        return (
          <SuccessScreen transactionId={transactionId} onGoHome={handleGoHome} />
        );

      default:
        return (
          <CryptoToCashScreen
            payAmount={payAmount}
            onPayAmountChange={setPayAmount}
            payCurrency={payCurrency}
            onPayCurrencyChange={setPayCurrency}
            receiveAmount={receiveAmount}
            receiveCurrency={receiveCurrency}
            onReceiveCurrencyChange={setReceiveCurrency}
            payFrom={payFrom}
            onPayFromChange={setPayFrom}
            onPayToClick={() => setCurrentStep("recipient-bank")}
            onConvert={handleConvert}
            payToLabel={getPayToLabel()}
          />
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="md:w-full max-w-lg py-2 space-y-4 max-sm:max-w-[94%]  max-md:min-w-sm min-w-lg min-h-145 mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden"
    >
      {/* Tab Switch - only show on main and coming soon screens */}
      {(currentStep === "main" || currentStep === "coming-soon" || activeTab !== "crypto-to-cash") && (
        <div className="flex justify-center pt-6 pb-4">
          <TabSwitch activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
      )}

      {/* Content */}
      <div className="px-10 pb-6">
        <AnimatePresence mode="wait">{renderScreen()}</AnimatePresence>
      </div>
    </motion.div>
  );
}
