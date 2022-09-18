import { ethers } from 'ethers';

import { DydxClient } from '@dydxprotocol/v3-client';

// export const connect = async (network: 'goerli', signer: ethers.Signer) => {
//     if (network !== 'goerli') {
//         throw new Error('Only goerli is supported');
//     }

//     const syncProvider = await zksync.getDefaultProvider(network);
//     const syncWallet = await zksync.Wallet.fromEthSigner(signer, syncProvider);
//     return syncWallet;
// }

// export const emergencyExit = async (syncWallet: zksync.Wallet, tokenName: string) => {
//     const token = SUPPORTED_TOKENS.find(t => t.tokenName === tokenName);
//     if (!token) {
//         throw new Error(`Token ${tokenName} not found`);
//     }

//     return syncWallet.emergencyWithdraw({ token: tokenName })
// }

// export const getBalances = async (syncWallet: zksync.Wallet)
//     : Promise<{ tokenName: string, balance: string }[]> => {
//     const tokenNames = SUPPORTED_TOKENS.map(t => t.tokenName);
//     const promises = tokenNames.map(async (tokenName) => {
//         const balance = await syncWallet.getBalance(tokenName);
//         return {
//             tokenName,
//             balance: balance.toString()
//         }
//     });
//     return Promise.all(promises);
// }

const apiKeyCredentials = {
    key: "e022ae57-bbdc-86e1-d79b-21f856633a48",
    passphrase: "9MKVE3atIOAgcfrNLTxK",
    secret: "sUxgz6vjxb-Jy4UBrV3hQrPzEVKAMmHJ7LIxeSPB"
}

const main = async () => {
    const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/eth_goerli');
    const wallet = new ethers.Wallet(
        '45c6c6ed80e3bcf20df86f53edc34bb408d66adf6464e8d31712203825e7ac74',
        provider
    );

    const client = new DydxClient('https://api.dydx.exchange/v3', {
        apiKeyCredentials
    });
    const address = await wallet.getAddress();
    const account = await client.private.getAccount(address);
    console.log(account);
}

main();