import { ethers } from 'ethers';
import * as zksync from 'zksync';

export type Wallet = zksync.Wallet;

export const SUPPORTED_TOKENS = [
    {
        "tokenName": "DAI",
        "tokenAddress": "0x5c221e77624690fff6dd741493d735a17716c26b",
        "dec": 18,
        "InternalId": 4
    },
    {
        "tokenName": "ERC20-5",
        "tokenAddress": "0x8ec97d8013748c3c2a220406e47ae5c07ecf97f7",
        "dec": 18,
        "InternalId": 5
    },
    {
        "tokenName": "ETH",
        "tokenAddress": "0x0000000000000000000000000000000000000000",
        "dec": 18,
        "InternalId": 0
    },
    {
        "tokenName": "LINK",
        "tokenAddress": "0x63bfb2118771bd0da7a6936667a7bb705a06c1ba",
        "dec": 18,
        "InternalId": 1
    },
    {
        "tokenName": "USDC",
        "tokenAddress": "0xd35cceead182dcee0f148ebac9447da2c4d449c4",
        "dec": 6,
        "InternalId": 3
    },
    {
        "tokenName": "wBTC",
        "tokenAddress": "0xca063a2ab07491ee991dcecb456d1265f842b568",
        "dec": 8,
        "InternalId": 2
    }
];

export const connect = async (network: 'goerli', signer: ethers.Signer) => {
    if (network !== 'goerli') {
        throw new Error('Only goerli is supported');
    }

    const syncProvider = await zksync.getDefaultProvider(network);
    const syncWallet = await zksync.Wallet.fromEthSigner(signer, syncProvider);
    return syncWallet;
}

export const emergencyExit = async (syncWallet: zksync.Wallet, tokenName: string) => {
    const token = SUPPORTED_TOKENS.find(t => t.tokenName === tokenName);
    if (!token) {
        throw new Error(`Token ${tokenName} not found`);
    }

    const tx = await syncWallet.emergencyWithdraw({ token: tokenName })
    await tx.awaitVerifyReceipt();
    await tx.awaitEthereumTxCommit();
}

export const getBalances = async (syncWallet: zksync.Wallet)
    : Promise<{ tokenName: string, balance: string }[]> => {
    const tokenNames = SUPPORTED_TOKENS.map(t => t.tokenName);
    const promises = tokenNames.map(async (tokenName) => {
        const balance = await syncWallet.getBalance(tokenName);
        return {
            tokenName,
            balance: balance.toString()
        }
    });
    return Promise.all(promises);
}
