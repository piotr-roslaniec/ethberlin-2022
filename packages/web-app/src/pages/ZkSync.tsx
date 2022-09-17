import { useEthers } from "@usedapp/core";
import { useEffect, useState } from "react";
import * as zksync from "zksync-exit";
import { Wallet } from "zksync-exit";

import { SectionRow } from "../components/base/base";

type Balance = {
  tokenName: string;
  balance: string;
};

export const ZkSync = () => {
  const { library } = useEthers();
  const [balances, setBalances] = useState<Balance[]>([]);
  const [zkWallet, setZkWallet] = useState<Wallet>(null as unknown as Wallet);

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

  const toToken = (balance: Balance) => {
    const disabled = balance.balance === "0";
    const maybeButton = disabled ? null : (
      <button onClick={() => zksync.emergencyExit(zkWallet, balance.tokenName)}>
        Exit
      </button>
    );
    return (
      <p>
        {balance.tokenName} - {balance.balance} {maybeButton}
      </p>
    );
  };

  if (!library) {
    return <p>Connect your wallet</p>;
  }

  return (
    <SectionRow>
      <div>
        <h2>ZkSync</h2>
      </div>

      <ul>
        {balances.map((balance) => (
          <li key={balance.tokenName}>{toToken(balance)}</li>
        ))}
      </ul>
    </SectionRow>
  );
};
