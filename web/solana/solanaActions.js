// src/solanaActions.js
import { PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { connection } from './solanaConfig';

export const sendTransaction = async (fromPubkey, toPubkey, lamports) => {
    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey,
            toPubkey,
            lamports,
        })
    );
    // Ajouter la logique pour signer et envoyer la transaction
};
