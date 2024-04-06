// wallet.js
import {Connection, PublicKey, clusterApiUrl, Transaction, SystemProgram} from '@solana/web3.js';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { useWallet, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';

// Nécessaire pour le style des boutons du portefeuille
require('@solana/wallet-adapter-react-ui/styles.css');

const network = WalletAdapterNetwork.Devnet; // Ou 'Mainnet', 'Testnet'
const endpoint = clusterApiUrl(network);

const wallets = [
    new PhantomWalletAdapter(),
    // Vous pouvez ajouter d'autres adaptateurs de portefeuille ici
];

export const WalletConnectionProvider = ({ children }) => (
    <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
            {children}
        </WalletModalProvider>
    </WalletProvider>
);

export const SendTransactionButton = () => {
    const { connection } = new Connection(endpoint);
    const { publicKey, sendTransaction } = useWallet();

    const sendSol = async () => {
        if (!publicKey) return;

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: new PublicKey('IciDestinatairePublicKey'),
                lamports: 100, // Montant en lamports
            })
        );

        const signature = await sendTransaction(transaction, connection);
        await connection.confirmTransaction(signature, 'processed');
    };

    return <button onClick={sendSol}>Envoyer SOL</button>;
};

// Pour utiliser SendTransactionButton dans votre application, enveloppez votre composant (ou App.js) avec WalletConnectionProvider.
