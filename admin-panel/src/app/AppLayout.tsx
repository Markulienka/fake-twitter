import React from "react";
import { Outlet } from "react-router-dom";
import { ThemedLayoutV2, ThemedSiderV2 } from "@refinedev/antd";
import { Header } from "../components/header";

export const AppLayout: React.FC = () => (
  <ThemedLayoutV2
    Header={() => <Header sticky />}
    Sider={(props) => <ThemedSiderV2 {...props} fixed />}
  >
    <Outlet />
  </ThemedLayoutV2>
);
