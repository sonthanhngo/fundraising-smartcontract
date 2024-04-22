import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './core/App';
import './index.css';
import { ThirdwebProvider, metamaskWallet } from '@thirdweb-dev/react';
import { Sepolia } from '@thirdweb-dev/chains';

ReactDOM.createRoot(document.getElementById('root')!).render(
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
