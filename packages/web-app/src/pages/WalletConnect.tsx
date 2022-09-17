import WalletConnectProvider from "@walletconnect/web3-provider";
import { useEthers } from "@usedapp/core";
import { Section, SectionRow } from "../components/base/base";
import { Title } from "../typography/Title";
import { Button } from "../components/base/Button";

export function WalletConnect() {
  const { account, activate, deactivate } = useEthers();

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

  return (
    <>
      <Section>
        <SectionRow>
          <Title>WalletConnect Connector</Title>
          <Button onClick={account ? onDisconnect : onConnect}>
            {account ? "DISCONNECT" : "WalletConnect"}
          </Button>
        </SectionRow>
      </Section>
    </>
  );
}
