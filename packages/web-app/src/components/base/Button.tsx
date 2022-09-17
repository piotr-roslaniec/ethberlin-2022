import styled from "styled-components";
import { Colors, Fonts, Transitions } from "../../global/styles";

export const Button = styled.button`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 8px;
  align-items: center;
  width: fit-content;
  min-width: 160px;
  height: 40px;
  font-family: ${Fonts.Dinsrg};
  font-size: 14px;
  line-height: 24px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${Colors.Black[900]};
  border: 0px solid ${Colors.Black[900]};
  background-color: ${Colors.Yellow[100]};
  cursor: pointer;
  transition: ${Transitions.all};

  &:hover,
  &:focus {
    background-color: ${Colors.Black[900]};
    color: ${Colors.Yellow[100]};
  }
`;
