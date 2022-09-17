import { MainContent } from "../components/base/base";
import { ConnectorPage } from "./ConnectorsPage";
import { L2ExitsPage } from "./L2ExistsPage";
import Logo from "../assets/images/Logo.png";

export const Main = () => {
  return (
    <MainContent>
      {/* TODO: Update how this image is displayed */}
      <img src={Logo} alt="logo" width={250} height={250} />
      <ConnectorPage />
      <L2ExitsPage />
    </MainContent>
  );
};
