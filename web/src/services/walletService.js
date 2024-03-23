// src/services/walletService.js

import {TezosToolkit} from '@taquito/taquito';
import {BeaconWallet} from '@taquito/beacon-wallet';

const tezos = new TezosToolkit('https://ghostnet.teztnets.xyz');
const wallet = new BeaconWallet({
    name: 'Temple',
    preferredNetwork: 'ghostnet',
});



export const connectWallet = async () => {
    try {
        await wallet.requestPermissions({ network: { type: 'ghostnet' } });
        return await wallet.getPKH();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const checkIfWalletConnected = async () => {
    try {
        const activeAccount = await wallet.client.getActiveAccount();
        if (activeAccount) {
            return activeAccount.address;
        }
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getBalance = async (address) => {
    try {
        const balance = await tezos.tz.getBalance(address);
        return balance.toNumber() / 1000000; // Convertir de mutez à tez
    } catch (error) {
        console.error(error);
        return 0;
    }
};