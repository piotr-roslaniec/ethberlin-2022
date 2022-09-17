import { ethers } from "ethers";
import {ExchangeV3Abi} from '../abi/ExchangeV3.js';

export const getWithdrawableEther = async (
    provider: ethers.providers.JsonRpcProvider,
    contractAddress: string,
    ownerAddress: string
) => {
    const exchangeContract = new ethers.Contract(contractAddress, ExchangeV3Abi, provider);

    return exchangeContract.getAmountWithdrawable(ownerAddress, ethers.constants.AddressZero)
}

const main = async () => {
    const goerliContractAddress = '0x2e76EBd1c7c0C8e7c2B875b6d505a260C525d25e'
    const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/eth_goerli/');
    const withdrawableEther = await getWithdrawableEther(provider, goerliContractAddress, '0xe6e19bC2811842fBb264E13a7DB4bFAD4902946f');
    console.log(ethers.utils.formatUnits(withdrawableEther, 18));
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

