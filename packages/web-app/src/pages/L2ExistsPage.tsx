import { useState } from "react";

import { Container, Section, SectionRow } from "../components/base/base";
import { Button } from "../components/base/Button";
import { Title } from "../typography/Title";
import { ZkSync } from "./ZkSync";

export const L2ExitsPage = () => {
  const [enableZkSync, setEnableZkSync] = useState(false);

  return (
    <Container>
      <Section>
        <SectionRow>
          <Title>SELECT AN L2 TO EXIT</Title>
        </SectionRow>
        <SectionRow>
          {enableZkSync ? (
            <ZkSync />
          ) : (
            <Button onClick={() => setEnableZkSync(true)}>ZkSync</Button>
          )}
        </SectionRow>
      </Section>
    </Container>
  );
};
