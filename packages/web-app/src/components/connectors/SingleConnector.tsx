import React, { useMemo } from "react";
import {
  Connector,
  useEthers,
  useConnector,
} from "@usedapp/core";
import { SectionRow } from "../base/base";
import { Button } from "../base/Button";


interface ConnectorProps {
  name: string;
  connector: Connector;
}

export function SingleConnector({ name, connector }: ConnectorProps) {
  const { connector: activeConnector } = useConnector();
  const { account, activateBrowserWallet, deactivate } = useEthers();
  const nameCapitalized = useMemo(
    () => name.charAt(0).toUpperCase() + name.slice(1),
    [name]
  );

  const active = useMemo(
    () => !!account && activeConnector?.connector === connector,
    [account, activeConnector?.connector, connector]
  );

  return (
    <>
      <SectionRow>
        {active ? (
          <>
            <Button onClick={deactivate}>Disconnect</Button>
          </>
        ) : (
          <Button
            id={`${nameCapitalized}Button`}
            onClick={async () => activateBrowserWallet({ type: name })}
          >
            {account ? "DISCONNECT" : nameCapitalized}
          </Button>
        )}
      </SectionRow>
    </>
  );
}
