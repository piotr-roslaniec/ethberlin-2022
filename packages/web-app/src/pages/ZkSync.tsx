import { useEthers } from "@usedapp/core";
import { SectionRow } from "../components/base/base";

export const ZkSync = () => {
    const { chainId, library } = useEthers();

    return (
        <SectionRow>
            <div>
                <h2>ZkSync</h2>
                <h2>{chainId}</h2>
            </div>
        </SectionRow>
    );
};
