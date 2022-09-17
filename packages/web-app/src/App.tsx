import React from "react";
import { Main } from "./pages";
import { GlobalStyle } from "./global/GlobalStyle";

export function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <header className="App-header">
        <Main />
      </header>
    </div>
  );
}
