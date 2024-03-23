// walletConnection.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { DAppClient } from "@airgap/beacon-sdk"; // Importez DAppClient depuis @airgap/beacon-sdk
import { connectWallet, checkIfWalletConnected, getBalance } from '../services/walletService';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [walletAddress, setWalletAddress] = useState(null);
    const [walletBalance, setWalletBalance] = useState(null);

    const handleConnectWallet = async () => {
        const dAppClient = new DAppClient({ name: "YourAppName" }); // Créez une instance de DAppClient
        try {
            console.log("Attempting to connect wallet..."); // Ajoutez ce console.log

            const address = await connectWallet();
            if (address) {
                setWalletAddress(address);
                const balance = await getBalance(address);
                setWalletBalance(balance);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const init = async () => {
            const address = await checkIfWalletConnected();
            if (address) {
                setWalletAddress(address);
                const balance = await getBalance(address);
                setWalletBalance(balance);
            }
        };
        init();
    }, []);

    return (
        <WalletContext.Provider value={{ walletAddress, walletBalance, handleConnectWallet }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => useContext(WalletContext);
