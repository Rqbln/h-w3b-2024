// walletConnection.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { DAppClient } from "@airgap/beacon-sdk";
import { connectWallet, checkIfWalletConnected, getBalance } from '../services/walletService';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [walletAddress, setWalletAddress] = useState(null);
    const [walletBalance, setWalletBalance] = useState(null);
    const [loading, setLoading] = useState(true); // Ajoutez un état pour indiquer le chargement

    useEffect(() => {
        const init = async () => {
            const address = await checkIfWalletConnected();
            if (address) {
                setWalletAddress(address);
                const balance = await getBalance(address);
                setWalletBalance(balance);
                setLoading(false); // Fin du chargement une fois que les données sont chargées
            } else {
                setLoading(false); // Fin du chargement même s'il n'y a pas de wallet connecté
            }
        };
        init();
    }, []);

    const handleConnectWallet = async () => {
        try {
            console.log("Attempting to connect wallet...");
            const address = await connectWallet();
            if (address) {
                setWalletAddress(address);
                const balance = await getBalance(address);
                setWalletBalance(balance);
                setLoading(false); // Fin du chargement une fois que les données sont chargées
            }
        } catch (error) {
            console.error(error);
            setLoading(false); // Fin du chargement en cas d'erreur
        }
    };

    return (
        <WalletContext.Provider value={{ walletAddress, walletBalance, loading, handleConnectWallet }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => useContext(WalletContext);
