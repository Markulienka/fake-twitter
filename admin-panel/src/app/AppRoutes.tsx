import React from "react";
import { Routes, Route } from "react-router-dom";
import { ErrorComponent } from "@refinedev/antd";
import { Navigate } from "react-router-dom";
import { AppLayout } from "./AppLayout";
import { userRoutes, tweetRoutes, aiRoutes } from "../routes";

export const AppRoutes: React.FC = () => (
  <Routes>
    <Route element={<AppLayout />}>
      <Route index element={<Navigate to="/users" replace />} />
      {userRoutes}
      {tweetRoutes}
      {aiRoutes}
      <Route path="*" element={<ErrorComponent />} />
    </Route>
  </Routes>
);
