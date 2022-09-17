import { ethers } from 'ethers';
import * as zksync from 'zksync';
import { RemoteWallet } from 'zksync';

export const run = async (
    // web3Provider: ethers.providers.Web3Provider,
    // accountId?: number
) => {
    const syncProvider = await zksync.getDefaultProvider('goerli');
    const ethersProvider = ethers.getDefaultProvider('goerli');

    const ethWallet = new ethers.Wallet("45c6c6ed80e3bcf20df86f53edc34bb408d66adf6464e8d31712203825e7ac74").connect(ethersProvider);
    const syncWallet = await zksync.Wallet.fromEthSigner(ethWallet, syncProvider);

    const balance = await syncWallet.getBalance("ETH");
    console.log("Balance: ", balance.toString());

    const verifiedBalance = await syncWallet.getBalance("ETH", 'verified');
    console.log("Verified balance: ", verifiedBalance.toString());

    syncWallet.syncForcedExit({
        token: "ETH",
        target: ethWallet.address,
    }).then((tx) => {
        console.log("Forced exit tx hash: ", tx.txHash);
    });
}

run();