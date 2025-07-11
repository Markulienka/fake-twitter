import React from "react";
import { BrowserRouter } from "react-router-dom";
import { RefineKbarProvider } from "@refinedev/kbar";
import { ColorModeContextProvider } from "../contexts/color-mode";
import { App as AntdApp } from "antd";
import { DevtoolsProvider } from "@refinedev/devtools";

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <BrowserRouter>
    <RefineKbarProvider>
      <ColorModeContextProvider>
        <AntdApp>
          <DevtoolsProvider>
            {children}
          </DevtoolsProvider>
        </AntdApp>
      </ColorModeContextProvider>
    </RefineKbarProvider>
  </BrowserRouter>
);
