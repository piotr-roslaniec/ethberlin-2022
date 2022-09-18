import {Container, MainContent, Section} from "../components/base/base";
import { ConnectorPage } from "./ConnectorsPage";
import { L2sPage } from "./L2ExistsPage";
import Logo from "../assets/images/Logo.png";

import {useEthers} from "@usedapp/core";
import {useState} from "react";
import {ZkSync} from "./ZkSync";
import {Loopring} from "./Loopring";

export const Main = () => {
    const {account} = useEthers();
    const [selectedL2, setSelectedL2] = useState<string|undefined>(undefined);

    return (
    <MainContent>
      {/* TODO: Update how this image is displayed */}
      <img src={Logo} alt="logo" width={300} />

      <ConnectorPage />
      {!!account && <L2sPage selectedL2={selectedL2} setSelectedL2={setSelectedL2} />}

        <Container>
          {selectedL2 === 'zksync' && <ZkSync />}
          {selectedL2 === 'loopring' && <Loopring />}
        </Container>
    </MainContent>
  );
};
