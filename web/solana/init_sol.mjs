import {
    Connection,
    PublicKey,
    TransactionInstruction,
    sendAndConfirmTransaction,
    SystemProgram,
    Keypair,
    LAMPORTS_PER_SOL, clusterApiUrl, Transaction
} from '@solana/web3.js';
import bs58 from 'bs58'; // Importer la bibliothèque bs58 pour décoder la clé privée

// Connexion au réseau Devnet
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

// ID de programme de votre smart contract
const programId = new PublicKey('2b377c9cd478da59586011cf8ce3d94c261ba37b13defa4ce81e16e3da2fa76f'); // Converti en hexadécimal

// Décoder la clé privée depuis la chaîne en base58
const privateKey = bs58.decode('TfS52fdcHBW2q2eq3johgvXgNrm4MnDBdhagN7LxG3CH6WRpAi5onsZNkwCFekPywf1WafMcPac7z8Ag2NajSi4');

// Créer un Keypair à partir de la clé privée
const payer = Keypair.fromSecretKey(privateKey);


// Taille d'allocation pour le compte
const GREETING_SIZE = 64; // 4 octets pour u32 + espace supplémentaire pour les métadonnées

async function initializeGreetingAccount() {
    const lamports = await connection.getMinimumBalanceForRentExemption(GREETING_SIZE);

    // Génère un nouveau compte pour le GreetingAccount
    const greetingAccount = Keypair.generate();

    const transaction = new Transaction().add(
        SystemProgram.createAccount({
            fromPubkey: payer.publicKey,
            newAccountPubkey: greetingAccount.publicKey,
            lamports,
            space: GREETING_SIZE,
            programId,
        })
    );

    await sendAndConfirmTransaction(
        connection,
        transaction,
        [payer],
    );

    console.log('Compte initialisé à l\'adresse:', greetingAccount.publicKey.toBase58());
}

initializeGreetingAccount();
