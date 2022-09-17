import React from "react";
import { GlobalStyle } from "./global/GlobalStyle";
import { ConnectorPage, } from "./pages";

export function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <header className="App-header">
        <ConnectorPage />
      </header>
    </div>
  );
}
