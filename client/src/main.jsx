import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './core/App';
import { ThirdwebProvider, metamaskWallet } from '@thirdweb-dev/react';
import { Sepolia } from '@thirdweb-dev/chains';
import './index.css';

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThirdwebProvider
      activeChain={Sepolia}
      clientId='4b5980c7fe59b21b859f242286865838'
      supportedWallets={[metamaskWallet()]}
    >
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);
