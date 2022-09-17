import { useState } from "react";

import { Container, Section, SectionRow } from "../components/base/base";
import { Button } from "../components/base/Button";
import { Title } from "../typography/Title";
import { ZkSync } from "./ZkSync";
import {Loopring} from "./Loopring";

export const L2ExitsPage = () => {
  const [selectedL2, setSelectedL2] = useState<string|undefined>(undefined);

  return (
    <Container>
      <Section>
        <SectionRow>
          <Title>SELECT AN L2 TO EXIT</Title>
        </SectionRow>
        <SectionRow>
          {selectedL2 ? (
              <>
                {selectedL2 === 'zksync' && <ZkSync />}
                {selectedL2 === 'loopring' && <Loopring />}
              </>
          ) : (
              <Section>
                <SectionRow>
                  <Button onClick={() => setSelectedL2('zksync')}>ZkSync</Button>
                </SectionRow>
                <SectionRow>
                  <Button onClick={() => setSelectedL2('loopring')}>Loopring</Button>
                </SectionRow>
              </Section>
          )}
        </SectionRow>
      </Section>
    </Container>
  );
};
