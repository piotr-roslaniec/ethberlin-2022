import React from "react";
import { MetamaskConnector, useEthers } from "@usedapp/core";

import { WalletConnect } from "./WalletConnect";
import { SingleConnector } from "../components/connectors/SingleConnector";
import {
  Container,
  Section,
  SectionRow,
} from "../components/base/base";
import { Button } from "../components/base/Button";
import { Title } from "../typography/Title";

export const ConnectorPage = () => {
  const connectors = {
    metamask: new MetamaskConnector(),
    // walletConnect: new WalletConnectConnector({ infuraId: 'd8df2cb7844e4a54ab0a782f608749dd' }),
    // coinbase: new CoinbaseWalletConnector(),
    // portis: new PortisConnector(PORTIS_DAPP_ID, 'mainnet'),
  };

  const { account, deactivate } = useEthers();

  async function onDisconnect() {
    deactivate();
    localStorage.removeItem("walletconnect");
  }

  return (
    <Container>
      <Section>
        <SectionRow>
          <Title>SELECT A WEB3 PROVIDER</Title>
        </SectionRow>
        {(account && <Button onClick={onDisconnect}>DISCONNECT</Button>) || (
          <>
            {Object.entries(connectors).map(([name, connector]) => (
              <SingleConnector key={name} name={name} connector={connector} />
            ))}
            <WalletConnect />
          </>
        )}
      </Section>
    </Container>
  );
};
