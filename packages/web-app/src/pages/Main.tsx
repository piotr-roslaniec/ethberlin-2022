import { MainContent } from "../components/base/base";
import { ConnectorPage } from "./ConnectorsPage";
import { L2ExitsPage } from "./L2ExistsPage";

export const Main = () => {
  return (
    <MainContent>
      <ConnectorPage />
      <L2ExitsPage />
    </MainContent>
  );
};
