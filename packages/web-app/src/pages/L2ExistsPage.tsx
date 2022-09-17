import { Container, Section, SectionRow } from "../components/base/base";
import { Title } from "../typography/Title";
import { ZkSync } from "./ZkSync";

export const L2ExitsPage = () => {
  return (
    <Container>
      <Section>
        <SectionRow>
          <Title>SELECT AN L2 TO EXIT</Title>
        </SectionRow>
        <SectionRow>
          <ZkSync />
        </SectionRow>
      </Section>
    </Container>
  );
};
