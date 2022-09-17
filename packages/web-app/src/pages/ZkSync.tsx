import { formatEther } from "@ethersproject/units";
import { useEthers } from "@usedapp/core";
import { useEffect, useState } from "react";
import * as zksync from "zksync-exit";
import { Wallet } from "zksync-exit";

import { ContentBlock, ContentRow, Section, SectionRow } from "../components/base/base";
import { Title } from "../typography/Title";
import {ethers} from "ethers";
import {Button} from "../components/base/Button";

type Balance = {
  tokenName: string;
  balance: string;
};

export const ZkSync = () => {
  const { library } = useEthers();
  const [balances, setBalances] = useState<Balance[]>([]);
  const [zkWallet, setZkWallet] = useState<Wallet>(null as unknown as Wallet);
  const [transaction, setTransaction] = useState<ethers.Transaction | undefined>(undefined);

  useEffect(() => {
    if (!library || !library.getSigner) {
      return;
    }

    const doConnect = async () => {
      const zkWallet = await zksync.connect("goerli", library.getSigner());
      setZkWallet(zkWallet);
    };

    doConnect();
  }, [library]);

  useEffect(() => {
    if (!zkWallet) {
      return;
    }

    const doGetBalances = async () => {
      const newBalances = await zksync.getBalances(zkWallet);
      setBalances(newBalances);
    };

    doGetBalances();
  }, [zkWallet]);

  const renderButton = (balance: Balance) => {
    return (
      <Button
        key={balance.tokenName}
        disabled={balance.balance === "0"}
        style={{margin: 5}}
        onClick={async () => {
          const tx = await zksync.emergencyExit(zkWallet, balance.tokenName);
          setTransaction(tx.ethTx);
        }}
      >
        {balance.tokenName} ({formatEther(balance.balance)})
      </Button>
    );
  };

  if (!library) {
    return <p>Connect your wallet</p>;
  }

  return (
    <Section>
      <SectionRow>
        <Title>ZkSync</Title>
      </SectionRow>
      {!!transaction ? (
          <SectionRow>
            <Button onClick={() => window.open('https://goerli.etherscan.io/tx/' + transaction?.hash)}>
              Check Transaction
            </Button>
          </SectionRow>
      ) : (
          <SectionRow style={{justifyContent: 'flex-start', flexWrap: 'wrap', margin: -5}}>
            {balances.map((balance) => renderButton(balance))}
          </SectionRow>
      )}

    </Section>
  );
};
