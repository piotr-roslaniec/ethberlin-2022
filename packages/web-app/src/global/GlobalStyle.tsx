import { createGlobalStyle } from "styled-components";
import Dinsrg from "../assets/fonts/Dinsrg.woff";
import Dinsrg2 from "../assets/fonts/Dinsrg.woff2";
import { Colors, Fonts } from "./styles";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    scrollbar-width: none;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }

  @font-face {
    font-family: 'Dinsrg';
    src: url(${Dinsrg2}) format('woff2'),
         url(${Dinsrg}) format('woff');
    font-weight: normal;
    font-style: normal;
  }

  body, html {
    margin: 0;
    width: 100%;
    height: 100%;
    background-color: ${Colors.Gray};
    font-family: ${Fonts.Dinsrg};
    font-size: 16px;
    color: ${Colors.Black[900]};
    overscroll-behavior-y: none;
  }
  
  button {
    font-family: ${Fonts.Dinsrg};
    font-size: 1em;
    border: none;
    background-color: transparent;
    padding: 0;
    outline: none;
    cursor: pointer;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    color: ${Colors.Black[900]};
    text-decoration: none;

    &:visited {
      color: ${Colors.Black[900]};
    }
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    line-height: 150%;
    font-weight: 600;
    font-family: ${Fonts.Dinsrg};
  }

  h1 {
    font-size: 32px;
  }

  h2 {
    font-size: 24px;
  }
  
  h3 {
    font-size: 14px;
  }

  h4 {
    font-size: 12px;
  }

  p {
    margin: 0;
  }
`;
