// src/services/walletService.js

import { TezosToolkit } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';

// Configuration du RPC endpoint pour le réseau Ghostnet
const tezos = new TezosToolkit('https://rpc.ghostnet.teztnets.com');

// Configuration du portefeuille Beacon pour le réseau Ghostnet
const wallet = new BeaconWallet({
    name: 'Temple', // Nom du portefeuille
    preferredNetwork: 'ghostnet', // Réseau préféré
});

// Fonction pour connecter le portefeuille
export const connectWallet = async () => {
    try {
        console.log("Tentative de connexion au portefeuille...");
        // Demande de permissions pour le réseau Ghostnet
        await wallet.requestPermissions({ network: { type: 'ghostnet' } });
        // Récupération de l'adresse du portefeuille connecté
        const address = await wallet.getPKH();
        console.log("Adresse du portefeuille connectée:", address);
        return address;
    } catch (error) {
        console.error("Erreur lors de la connexion au portefeuille:", error);
        return null;
    }
};

// Fonction pour vérifier si un portefeuille est déjà connecté
export const checkIfWalletConnected = async () => {
    try {
        const activeAccount = await wallet.client.getActiveAccount();
        if (activeAccount) {
            const address = activeAccount.address;
            console.log("Portefeuille déjà connecté. Adresse:", address);
            return address;
        }
        console.log("Aucun portefeuille connecté.");
        return null;
    } catch (error) {
        console.error("Erreur lors de la vérification du portefeuille connecté:", error);
        return null;
    }
};

// Fonction pour récupérer le solde du portefeuille
export const getBalance = async (address) => {
    try {
        // Récupération du solde du portefeuille
        const balance = await tezos.tz.getBalance(address);
        console.log("Solde du portefeuille:", balance.toNumber() / 1000000, "XTZ");
        return balance.toNumber() / 1000000; // Conversion du solde en XTZ
    } catch (error) {
        console.error("Erreur lors de la récupération du solde du portefeuille:", error);
        return 0;
    }
};
