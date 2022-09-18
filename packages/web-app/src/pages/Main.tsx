import { MainContent } from "../components/base/base";
import { ConnectorPage } from "./ConnectorsPage";
import { L2ExitsPage } from "./L2ExistsPage";
import Logo from "../assets/images/Logo.png";

import {useEthers} from "@usedapp/core";

export const Main = () => {
    const {account} = useEthers();

    return (
    <MainContent>
      {/* TODO: Update how this image is displayed */}
      <img src={Logo} alt="logo" width={300} />

      <ConnectorPage />
      {!!account && <L2ExitsPage />}
    </MainContent>
  );
};
