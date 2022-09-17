import {formatEther} from "@ethersproject/units";
import {useEthers} from "@usedapp/core";
import {useEffect, useState} from "react";
import * as loopring from "loopring-exit";
import {ContentBlock, ContentRow, Section, SectionRow} from "../components/base/base";
import {Title} from "../typography/Title";
import {Button} from "../components/base/Button";
import {ethers} from "ethers";

type Token = {
    tokenName: string;
    tokenSymbol: string;
    tokenAddress: string;
};

export const Loopring = () => {
    const {library} = useEthers();
    const [tokens, setTokens] = useState<Token[]>([]);
    const [transaction, setTransaction] = useState<ethers.Transaction | undefined>(undefined);

    useEffect(() => {
        if (!library || !library.getSigner) {
            return;
        }

        const doGetTokens = async () => {
            const newTokens = await loopring.getSupportedTokens(library);
            setTokens(newTokens);
        };

        doGetTokens();
    }, [library]);

    const renderTokenButton = (token: Token) => {
        return (
            <Button
                key={token.tokenSymbol}
                style={{margin: 5}}
                onClick={async () => {
                    const transaction = await loopring.emergencyExit(
                        library?.getSigner() as ethers.Signer,
                        token.tokenAddress
                    );
                    setTransaction(transaction);
                }}
            >
                {token.tokenSymbol}
            </Button>
        );
    }

    return (
        <Section>
            <SectionRow>
                <Title>Loopring</Title>
            </SectionRow>
            {!!transaction ? (
                <SectionRow>
                    <Button onClick={() => window.open('https://goerli.etherscan.io/tx/' + transaction?.hash)}>
                        Check Transaction
                    </Button>
                </SectionRow>
            ) : (
                <SectionRow style={{justifyContent: 'flex-start', flexWrap: 'wrap', margin: -5}}>
                    {tokens.map((token) => renderTokenButton(token))}
                </SectionRow>
            )}
        </Section>
    );
};
