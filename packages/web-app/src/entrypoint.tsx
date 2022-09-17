import React from "react";
import ReactDOM from "react-dom";
import {
  Mainnet,
  DAppProvider,
  Config,
  Localhost,
  Goerli,
} from "@usedapp/core";
import { getDefaultProvider } from "ethers";
import { App } from "./App";

const readOnlyUrls: Config["readOnlyUrls"] = {
  [Mainnet.chainId]: process.env.MAINNET_URL || getDefaultProvider("mainnet"),
  [Goerli.chainId]: process.env.GOERLI_URL
    ? process.env.GOERLI_URL.replace("mainnet", "goerli")
    : getDefaultProvider("goerli"),
};

if (process.env.LOCALHOST_URL) {
  readOnlyUrls[Localhost.chainId] = process.env.LOCALHOST_URL;
}

// TODO: Throw error when on unsupported network (!= Goerli)
const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls,
  multicallVersion: 2 as const,
  fastMulticallEncoding: true,
  noMetamaskDeactivate: true,
  networks: [Goerli],
};

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
