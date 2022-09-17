import { formatEther } from "@ethersproject/units";
import { useEtherBalance, useEthers } from "@usedapp/core";
import WalletConnectProvider from "@walletconnect/web3-provider";

import {
  ContentBlock,
  ContentRow,
  Section,
  SectionRow,
} from "../components/base/base";
import { Label } from "../typography/Label";
import { TextInline } from "../typography/Text";
import { Title } from "../typography/Title";
import { Button } from "../components/base/Button";

export function WalletConnect() {
  const { account, activate, chainId, deactivate } = useEthers();

  async function onConnect() {
    try {
      const provider = new WalletConnectProvider({
        infuraId: "d8df2cb7844e4a54ab0a782f608749dd",
      });
      await provider.enable();
      await activate(provider);
    } catch (error) {
      console.error(error);
    }
  }

  async function onDisconnect() {
    deactivate();
    localStorage.removeItem("walletconnect");
  }

  const userBalance = useEtherBalance(account);

  return (
    <>
      <Section>
        <SectionRow>
          <Title>WalletConnect Connector</Title>
          <Button onClick={account ? onDisconnect : onConnect}>
            {account ? "DISCONNECT" : "WalletConnect"}
          </Button>
        </SectionRow>

        <ContentBlock>
          {chainId && account && (
            <ContentRow>
              <Label>Active Chain ID:</Label> <TextInline>{chainId}</TextInline>{" "}
            </ContentRow>
          )}
          {account && (
            <ContentRow>
              <Label>Account:</Label> <TextInline>{account}</TextInline>
            </ContentRow>
          )}
          {userBalance && (
            <ContentRow>
              <Label>Ether balance:</Label>{" "}
              <TextInline>{formatEther(userBalance)}</TextInline>{" "}
              <Label>ETH</Label>
            </ContentRow>
          )}
        </ContentBlock>
      </Section>
    </>
  );
}
