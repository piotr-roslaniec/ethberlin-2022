import { ethers } from "ethers";

export const getAssets = async (provider: ethers.providers.JsonRpcProvider) => {
    return await provider.getBlock('latest');
}

const main = async () => {
    const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/eth');
    console.log(await getAssets(provider));
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

