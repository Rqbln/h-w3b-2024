import { DAppClient } from "@airgap/beacon-sdk";

const dAppClient = new DAppClient({ name: "VotreNomDeDApp" });

const checkIfWalletConnected = async () => {
    const activeAccount = await dAppClient.getActiveAccount();
    if (activeAccount) {
        console.log("Already connected:", activeAccount.address);
        return activeAccount.address;
    } else {
        console.log("Not connected!");
        return null; // Retourne null si aucun compte n'est connecté
    }
};

const connectWallet = async () => {
    try {
        console.log("Requesting permissions...");
        const permissions = await dAppClient.requestPermissions();
        console.log("Got permissions:", permissions.address);
        return permissions.address;
    } catch (error) {
        console.error("Got error:", error);
    }
};

const getBalance = async (address) => {
    // Votre logique pour obtenir le solde du wallet
};

export { checkIfWalletConnected, connectWallet, getBalance };
