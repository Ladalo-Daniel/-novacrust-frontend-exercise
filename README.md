# Novacrust Crypto Checkout Widget

A modern, responsive crypto checkout widget built with Next.js 16, React 19, TypeScript, and Tailwind CSS. This project demonstrates a clean, production-ready implementation of a crypto-to-fiat conversion flow.

![Novacrust Widget](./preview.png)

## ✨ Features

### Implemented Screens (2 Main Flows)

1. **Crypto to Cash Flow** - Complete multi-step checkout flow:
   - Currency selection with search (crypto & fiat)
   - Wallet provider selection (Metamask, Rainbow, WalletConnect, etc.)
   - Recipient bank details with account validation
   - Contact information (email & phone with country code)
   - Send crypto confirmation screen
   - Success/Transaction processing screen

2. **Coming Soon Screens** - Email notification signup for:
   - Cash to Crypto
   - Crypto to Fiat Loan

### Technical Highlights

- 🎨 **Pixel-perfect UI** matching Figma designs
- 📱 **Fully responsive** - works on desktop and mobile
- ⚡ **Smooth animations** using Framer Motion
- 🧩 **Reusable components** - modular and maintainable
- 🔒 **TypeScript** - full type safety
- 🎯 **Form validation** - basic input validation
- ♿ **Accessibility** - proper labels, focus states, and keyboard navigation
- 🎭 **State management** - clean React state with hooks

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **UI Components:** shadcn/ui
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Font:** Outfit (Google Fonts)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project
cd novacrust-frontend-exercise

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the widget.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/
│   ├── globals.css        # Global styles & CSS variables
│   ├── layout.tsx         # Root layout with Outfit font
│   └── page.tsx           # Main page with Widget
├── components/
│   ├── ui/                # shadcn/ui components
│   └── widget/            # Widget-specific components
│       ├── Widget.tsx             # Main orchestrating component
│       ├── TabSwitch.tsx          # Tab navigation
│       ├── CryptoSelector.tsx     # Cryptocurrency dropdown
│       ├── FiatSelector.tsx       # Fiat currency dropdown
│       ├── WalletSelector.tsx     # Wallet provider selector
│       ├── BankSelector.tsx       # Bank dropdown with search
│       ├── PhoneInput.tsx         # Phone input with country code
│       ├── FormInput.tsx          # Reusable form input
│       ├── PrimaryButton.tsx      # Styled button component
│       ├── CryptoToCashScreen.tsx # Main conversion form
│       ├── RecipientBankScreen.tsx    # Bank details form
│       ├── RecipientContactScreen.tsx # Email & phone form
│       ├── SendCryptoScreen.tsx   # Send confirmation
│       ├── SuccessScreen.tsx      # Transaction success
│       └── ComingSoonScreen.tsx   # Coming soon placeholder
└── lib/
    ├── data.ts            # Mock data (crypto, fiat, banks, etc.)
    ├── types.ts           # TypeScript interfaces
    └── utils.ts           # Utility functions
```

## 🎨 Design Decisions & Trade-offs

### Decisions Made

1. **Component Architecture:** Split the widget into small, focused components for better maintainability and reusability.

2. **State Management:** Used React's built-in useState and useCallback hooks. For this scope, Redux or Zustand would be overkill.

3. **Mock Data:** All currencies, banks, and wallets are mocked. In production, these would come from an API.

4. **Account Name Lookup:** Simulated with a timeout. Real implementation would call a bank verification API.

5. **Exchange Rates:** Hardcoded for demo purposes. Production would use real-time rates from a pricing API.

### Trade-offs

1. **No Backend Integration:** As specified, all data is mocked. The component structure is ready for API integration.

2. **Simplified Validation:** Basic email and phone validation. Production would need more robust validation.

3. **No Persistence:** Form state is not persisted. Refreshing the page resets the form.

4. **Limited Error Handling:** Error states exist but are minimal for demo purposes.

## 📝 Assumptions

1. The widget targets Nigerian users primarily (NGN as default fiat, Nigerian banks)
2. Users have access to common crypto wallets
3. Desktop and mobile are the primary viewing devices
4. Modern browser support only (no IE11)

## ⏱️ Time Spent

Approximately 4-5 hours on:
- Component architecture & setup (~30 min)
- UI components implementation (~2 hours)
- Screen implementations (~1.5 hours)  
- Styling & animations (~45 min)
- Documentation (~15 min)

## 🔮 Future Improvements

With more time, I would add:
- Unit tests with Jest/React Testing Library
- E2E tests with Playwright
- Loading skeletons
- Error boundary components
- Toast notifications
- Dark mode support
- i18n for multiple languages
- Real API integration
- Form persistence with localStorage

## 📄 License

This project is for assessment purposes only.
