import { Container, Section, SectionRow } from "../components/base/base";
import { Title } from "../typography/Title";
import { ZkSync } from "./ZkSync";

export const L2ExitsPage = () => {
  return (
    <Container>
      <Section>
        <SectionRow>
          <Title>L2 Exits</Title>
        </SectionRow>
        <SectionRow>
          <ZkSync />
        </SectionRow>
      </Section>
    </Container>
  );
};
