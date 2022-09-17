import { MainContent } from "../components/base/base";
import { ConnectorPage } from "./ConnectorsPage";
import { L2ExitsPage } from "./L2ExistsPage";
import Logo from "../assets/images/Logo.png";

export const Main = () => {
  return (
    <MainContent>
      <img src={Logo} alt="logo" />
      <ConnectorPage />
      <L2ExitsPage />
    </MainContent>
  );
};
