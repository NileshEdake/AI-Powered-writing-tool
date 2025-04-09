import React from 'react';
import ReactDOM from 'react-dom/client';
import ai from './images/ai.png';

import './index.css';

import {PrivyProvider} from '@privy-io/react-auth';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <PrivyProvider
      appId="cm98450c200muie0l5krzg56v"
      clientId="client-WY5ijiASCA4mxoNwfbo5ysLSbQRsNpxcPrFXxAoQ4UmLX"
      config={{
        // Display email and wallet as login methods
        loginMethods: ['email', 'wallet', 'google','github','twitter'],
        appearance: {
          theme: 'dark', 
          accentColor: '#676FFF',
          logo: ai,
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: 'users-without-wallets'
        }
      }}
    >
      <App />
    </PrivyProvider>
  </React.StrictMode>
);