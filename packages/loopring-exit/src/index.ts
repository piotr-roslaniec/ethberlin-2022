import { ethers } from "ethers";
import {ExchangeV3Abi} from './ExchangeV3Abi.js';
import * as LoopringSDK from "@loopring-web/loopring-sdk";

const goerliExchangeContractAddress = '0x2e76EBd1c7c0C8e7c2B875b6d505a260C525d25e';

export const SUPPORTED_TOKENS_BACKUP = [
        {
            tokenName: 'Ethereum',
            tokenSymbol: 'ETH',
            decimals: 18,
            tokenAddress: '0x0000000000000000000000000000000000000000',
            tokenId: 0
        },
        {
            tokenName: 'Loopring',
            tokenSymbol: 'LRC',
            decimals: 18,
            tokenAddress: '0xfc28028d9b1f6966fe74710653232972f50673be',
            tokenId: 1
        },
        {
            tokenName: 'USDT',
            tokenSymbol: 'USDT',
            decimals: 6,
            tokenAddress: '0xd4e71c4bb48850f5971ce40aa428b09f242d3e8a',
            tokenId: 2
        },
        {
            tokenName: 'AMM-LRC-ETH',
            tokenSymbol: 'LP-LRC-ETH',
            decimals: 8,
            tokenAddress: '0xfeb069407df0e1e4b365c10992f1bc16c078e34b',
            tokenId: 4
        },
        {
            tokenName: 'LP-ETH-USDT',
            tokenSymbol: 'LP-ETH-USDT',
            decimals: 8,
            tokenAddress: '0x049a02fa9bc6bd54a2937e67d174cc69a9194f8e',
            tokenId: 7
        },
        {
            tokenName: 'dai',
            tokenSymbol: 'DAI',
            decimals: 18,
            tokenAddress: '0xcd2c81b322a5b530b5fa3432e57da6803b0317f7',
            tokenId: 6
        },
        {
            tokenName: 'OLDUSDC',
            tokenSymbol: 'OLDUSDC',
            decimals: 6,
            tokenAddress: '0x47525e6a5def04c9a56706e93f54cc70c2e8f165',
            tokenId: 8
        },
        {
            tokenName: 'LP-OLDUSDC-ETH',
            tokenSymbol: 'LP-OLDUSDC-ETH',
            decimals: 8,
            tokenAddress: '0xf37cf4ced77b985708d591acc6bfd08586ab3409',
            tokenId: 9
        },
        {
            tokenName: 'Uniswap',
            tokenSymbol: 'UNI',
            decimals: 18,
            tokenAddress: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
            tokenId: 11
        },
        {
            tokenName: 'wst ETH',
            tokenSymbol: 'WSTETH',
            decimals: 18,
            tokenAddress: '0x4942bbaf745f235e525baff49d31450810eded5b',
            tokenId: 12
        }
    ];

const getAccountInformation = async (accountAddress: string) => {
    const api = new LoopringSDK.ExchangeAPI({chainId: LoopringSDK.ChainId.GOERLI});
    const response = await api.getAccount({owner: accountAddress});

    return response.accInfo;
}

 const getAccountId = async (accountAddress: string) => {
    const accountInformation = await getAccountInformation(accountAddress);

    return accountInformation?.accountId;
}

export const getSupportedTokens = async (provider: ethers.providers.Provider) => {
    const network = await provider.getNetwork();
    if (network.chainId !== LoopringSDK.ChainId.GOERLI) {
        throw new Error('Only goerli is supported');
    }

    const api = new LoopringSDK.ExchangeAPI({chainId: network.chainId});
    const response = await api.getTokens();

    const tokens = [];
    if (response.tokensMap) {
        for (const apiToken of Object.values(response.tokensMap)) {
            tokens.push({
                tokenName: apiToken.name,
                tokenSymbol: apiToken.symbol,
                decimals: apiToken.decimals,
                tokenAddress: apiToken.address,
                tokenId: apiToken.tokenId,
            });
        }
    } else {
        tokens.push(...SUPPORTED_TOKENS_BACKUP)
    }

    return tokens;
}

export const emergencyExit = async (
    signer: ethers.Signer,
    tokenAddress: string,
) => {
    const network = await signer.provider?.getNetwork();
    if (network?.chainId !== LoopringSDK.ChainId.GOERLI) {
        throw new Error('Only goerli is supported');
    }
    const exchangeContract = new ethers.Contract(goerliExchangeContractAddress, ExchangeV3Abi, signer);

    const withdrawalFee = ethers.utils.parseUnits('0.02', 18);
    const signerAddress = await signer.getAddress();
    const accountId = await getAccountId(signerAddress);
    const transaction = exchangeContract.forceWithdraw(
        signerAddress,
        tokenAddress,
        accountId,
        {value: withdrawalFee}
    ) as ethers.ContractTransaction;

    return transaction;
}

const main = async () => {
    const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/eth_goerli');
    const wallet = new ethers.Wallet(
        '45c6c6ed80e3bcf20df86f53edc34bb408d66adf6464e8d31712203825e7ac74',
        provider
    );

    const tx = await emergencyExit(wallet, ethers.constants.AddressZero);
    console.log(tx);

    console.log('waiting for inclusion');
    await tx.wait();
}

/*
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
*/
