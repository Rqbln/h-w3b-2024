import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { DevSupport } from "@react-buddy/ide-toolbox";
import { ComponentPreviews, useInitial } from "./dev";
import { WalletProvider } from "./components/walletConnection"; // Importez WalletProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <DevSupport ComponentPreviews={ComponentPreviews}
                    useInitialHook={useInitial}
        >
            <WalletProvider> {/* Enveloppez App avec WalletProvider */}
                <App/>
            </WalletProvider>
        </DevSupport>
    </React.StrictMode>
);

// Si vous souhaitez commencer à mesurer les performances de votre application, passez une fonction

