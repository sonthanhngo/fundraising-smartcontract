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
      clientId={import.meta.env.VITE_THIRDWEB_CLIENTID}
      supportedWallets={[metamaskWallet()]}
    >
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);
