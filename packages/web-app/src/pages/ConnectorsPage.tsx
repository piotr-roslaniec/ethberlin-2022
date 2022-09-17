import React from "react";
import { MetamaskConnector } from "@usedapp/core";

import { WalletConnect } from "./WalletConnect";
import { SingleConnector } from "../components/connectors/SingleConnector";
import {
  Container,
  Section,
} from "../components/base/base";

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
        <WalletConnect />
      </Section>
    </Container>
  );
};
