import React from "react";
import { Refine } from "@refinedev/core";
import { DevtoolsPanel } from "@refinedev/devtools";
import { RefineKbar } from "@refinedev/kbar";
import { useNotificationProvider } from "@refinedev/antd";
import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";
import { AppRoutes } from "./AppRoutes";
import { resources } from "../resources/index";

export const AppRefine: React.FC = () => (
  <Refine
    dataProvider={dataProvider("http://localhost:3000/admin")}
    notificationProvider={useNotificationProvider}
    routerProvider={routerBindings}
    resources={resources}
    options={{
      syncWithLocation: true,
      warnWhenUnsavedChanges: true,
      useNewQueryKeys: true,
    }}
  >
    <AppRoutes />
    <RefineKbar />
    <UnsavedChangesNotifier />
    <DocumentTitleHandler />
    <DevtoolsPanel />
  </Refine>
);
