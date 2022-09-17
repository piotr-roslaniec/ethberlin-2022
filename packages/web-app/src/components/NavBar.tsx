import React from "react";
import {
  Handshaking,
  Sidebar,
  SidebarContainer,
  SidebarLinkDescription,
  SidebarLink,
  SidebarNav,
  SidebarNavLinks,
  ToMain,
  ToMainBottom,
} from "./base/base";

export function NavBar() {
  return (
    <Sidebar>
      <SidebarContainer>
        <SidebarNav>
          <ToMain href="/">
            <span>useDapp</span>
            <ToMainBottom>
              Ethereum <Handshaking>🤝</Handshaking> React
            </ToMainBottom>
          </ToMain>
          <SidebarNavLinks>
            <SidebarLink to="/balance"> Balance </SidebarLink>
            <SidebarLink to="/prices"> Prices </SidebarLink>
            <SidebarLink to="/ens"> ENS </SidebarLink>
            <SidebarLink to="/block"> Block </SidebarLink>
            <SidebarLink to="/tokens"> Tokens </SidebarLink>
            <SidebarLink to="/send"> Send Ether </SidebarLink>
            <SidebarLink to="/transactions"> Transactions </SidebarLink>
            <SidebarLink to="/web3modal"> Web3 Modal </SidebarLink>
            <SidebarLink to="/web3react">
              {" "}
              Web3 React
              <br />
              Connector{" "}
            </SidebarLink>
            <SidebarLink to="/multichain">
              {" "}
              Multichain
              <br />{" "}
              <SidebarLinkDescription>
                &nbsp;experimental
              </SidebarLinkDescription>
            </SidebarLink>
            <SidebarLink to="/wallet-connect">
              {" "}
              WalletConnect example{" "}
            </SidebarLink>
            <SidebarLink to="/connectors"> Connectors </SidebarLink>
          </SidebarNavLinks>
        </SidebarNav>
      </SidebarContainer>
    </Sidebar>
  );
}
