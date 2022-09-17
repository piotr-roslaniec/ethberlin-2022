import { ethers } from "ethers";
import {ExchangeV3Abi} from '../abi/ExchangeV3.js';
import * as LoopringSDK from "@loopring-web/loopring-sdk";
import {BackupTokenList} from "../data/BackupTokenList.js";

const goerliExchangeContractAddress = '0x2e76EBd1c7c0C8e7c2B875b6d505a260C525d25e';

export const getAccountInformation = async (accountAddress: string) => {
    const api = new LoopringSDK.ExchangeAPI({chainId: LoopringSDK.ChainId.GOERLI});
    const response = await api.getAccount({owner: accountAddress});

    return response.accInfo;
}

export const getAccountId = async (accountAddress: string) => {
    const accountInformation = await getAccountInformation(accountAddress);

    return accountInformation?.accountId;
}

export const getAllTokens = async () => {
    const api = new LoopringSDK.ExchangeAPI({chainId: LoopringSDK.ChainId.GOERLI});
    const response = await api.getTokens();

    const tokens = [];
    if (response.tokensMap) {
        for (const apiToken of Object.values(response.tokensMap)) {
            tokens.push({
                name: apiToken.name,
                symbol: apiToken.symbol,
                decimals: apiToken.decimals,
                address: apiToken.address,
                tokenId: apiToken.tokenId,
            });
        }
    } else {
        tokens.push(...BackupTokenList)
    }

    return tokens;
}

export const submitWithdrawalTransaction = async (
    wallet: ethers.Wallet,
    tokenAddress: string,
) => {
    const exchangeContract = new ethers.Contract(goerliExchangeContractAddress, ExchangeV3Abi, wallet);

    const withdrawalFee = ethers.utils.parseUnits('0.02', 18);
    const accountId = await getAccountId(wallet.address);
    const transaction = exchangeContract.forceWithdraw(
        wallet.address,
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

    const tx = await submitWithdrawalTransaction(wallet, ethers.constants.AddressZero);
    console.log(tx);

    console.log('waiting for inclusion');
    await tx.wait();
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

