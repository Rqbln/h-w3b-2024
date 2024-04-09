import Web3 from 'web3';


const checkIfWalletConnected = async () => {
    if (window.ethereum && window.ethereum.selectedAddress) {
        return window.ethereum.selectedAddress;
    } else {
        return null;
    }
};
const getMetamaskBalance = async (address) => {
    try {
        const web3 = new Web3(window.ethereum);
        const balance = await web3.eth.getBalance(address);
        const balanceInEth = web3.utils.fromWei(balance, 'ether');
        return balanceInEth;
    } catch (error) {
        console.error("Error fetching balance:", error);
        return null;
    }
};

const connectWallet = async () => {
    try {
        if (window.ethereum) {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            return window.ethereum.selectedAddress;
        } else {
            throw new Error('Metamask not detected!');
        }
    } catch (error) {
        console.error("Got error:", error);
        throw error;
    }
};


const getBalance = async (address) => {
    try {
        console.log('Fetching balance for address:', address);
        if (window.ethereum && window.ethereum.selectedAddress === address) {
            // Use Metamask to fetch balance
            const balance = await getMetamaskBalance(address);
            console.log('Balance:', balance, 'ETH');
            return balance;
        } else {
            // Use NEON RPC to fetch balance
            const response = await fetch('https://neon-devnet.rpc.tgz.io', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    id: 1,
                    method: 'neon_getStorageAt',
                    params: [address, '0xcfc83255e01e1f598dd045E3F6F53AF677F909b8']
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Received data:', data);
            const balanceInLamports = parseInt(data.result, 16); // Convert the hexadecimal string to an integer
            const balanceInNeon = balanceInLamports / 1000000000; // Convert Lamports to Neon
            console.log('Balance:', balanceInNeon, 'NEON');
            return balanceInNeon;
        }
    } catch (error) {
        console.error("Error fetching balance:", error);
        return null;
    }
};






export { checkIfWalletConnected, connectWallet, getBalance };
