import React, {Dispatch, SetStateAction, useState} from "react";

import { Container, Section, SectionRow } from "../components/base/base";
import { Button } from "../components/base/Button";
import { Title } from "../typography/Title";
import { ZkSync } from "./ZkSync";
import {Loopring} from "./Loopring";

export const L2sPage = (props: {selectedL2: string|undefined, setSelectedL2: Dispatch<SetStateAction<string|undefined>>}) => {

  return (
    <Container>
      <Section>
        <SectionRow>
          <Title>SELECT AN L2 TO EXIT</Title>
        </SectionRow>
          {props.selectedL2 ? (
              <Button onClick={() => props.setSelectedL2(undefined)}>Change L2</Button>
          ) : (
              <>
                <SectionRow>
                  <Button onClick={() => props.setSelectedL2('zksync')}>ZkSync</Button>
                </SectionRow>
                <SectionRow>
                  <Button onClick={() => props.setSelectedL2('loopring')}>Loopring</Button>
                </SectionRow>
              </>
          )}
      </Section>
    </Container>
  );
};
