import React from "react";
import { MetamaskConnector } from "@usedapp/core";
import { Container, Section, SectionRow } from "../components/base/base";
import { SingleConnector } from "../components/connectors/SingleConnector";
import { WalletConnect } from "./WalletConnect";

export const ConnectorPage = () => {
  const connectors = {
    metamask: new MetamaskConnector(),
    // walletConnect: new WalletConnectConnector({ infuraId: 'd8df2cb7844e4a54ab0a782f608749dd' }),
    // coinbase: new CoinbaseWalletConnector(),
    // portis: new PortisConnector(PORTIS_DAPP_ID, 'mainnet'),
  };

  return (
    <Container>
      <Section>
        {Object.entries(connectors).map(([name, connector]) => (
          <SingleConnector key={name} name={name} connector={connector} />
        ))}
        <SectionRow>
          <WalletConnect />
        </SectionRow>
      </Section>
    </Container>
  );
};
