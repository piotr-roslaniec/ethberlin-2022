import React from "react";
import { MetamaskConnector, useEtherBalance, useEthers } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import { SingleConnector } from "../components/connectors/SingleConnector";
import { WalletConnect } from "./WalletConnect";
import { Label } from "../typography/Label";
import { TextInline } from "../typography/Text";

import {
  Container,
  ContentBlock,
  ContentRow,
  Section,
  SectionRow,
} from "../components/base/base";

export const ConnectorPage = () => {
  const connectors = {
    metamask: new MetamaskConnector(),
    // walletConnect: new WalletConnectConnector({ infuraId: 'd8df2cb7844e4a54ab0a782f608749dd' }),
    // coinbase: new CoinbaseWalletConnector(),
    // portis: new PortisConnector(PORTIS_DAPP_ID, 'mainnet'),
  };

  const { account, chainId } = useEthers();
  const userBalance = useEtherBalance(account);

  return (
    <Container>
      <Section>
        {Object.entries(connectors).map(([name, connector]) => (
          <SingleConnector key={name} name={name} connector={connector} />
        ))}
        <SectionRow>
          <WalletConnect />
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
    </Container>
  );
};
