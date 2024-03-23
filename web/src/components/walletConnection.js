// src/components/WalletConnection.js

import React, { useState, useEffect } from 'react';
import { connectWallet, checkIfWalletConnected } from '../services/walletService';

function WalletConnection() {
    const [walletAddress, setWalletAddress] = useState(null);

    useEffect(() => {
        const init = async () => {
            const address = await checkIfWalletConnected();
            setWalletAddress(address);
        };

        init();
    }, []);

    const handleConnectWallet = async () => {
        const address = await connectWallet();
        setWalletAddress(address);
    };

    return (
        <div>
            {walletAddress ? (
                <p>Wallet Connected: {walletAddress}</p>
            ) : (
                <button onClick={handleConnectWallet}>Connect Wallet</button>
            )}
        </div>
    );
}

export default WalletConnection;
