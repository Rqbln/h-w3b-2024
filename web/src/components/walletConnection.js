import React, { createContext, useContext, useState, useEffect } from 'react';
import { connectWallet, checkIfWalletConnected, getBalance } from '../services/walletService';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [walletAddress, setWalletAddress] = useState(null);
    const [walletBalance, setWalletBalance] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            const address = await checkIfWalletConnected();
            if (address) {
                setWalletAddress(address);
                const balance = await getBalance(address);
                setWalletBalance(balance);
                setLoading(false);
            } else {
                setLoading(false);
            }
        };
        init();
    }, []);

    const handleConnectWallet = async () => {
        try {
            const address = await connectWallet();
            if (address) {
                setWalletAddress(address);
                const balance = await getBalance(address);
                setWalletBalance(balance);
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <WalletContext.Provider value={{ walletAddress, walletBalance, loading, handleConnectWallet, getBalance }}> {/* Include getBalance here */}
            {children}
        </WalletContext.Provider>
    );
};



export const useWallet = () => useContext(WalletContext);
