import React from "react";
import { Routes, Route } from "react-router-dom";
import View from "./View";

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route index element={<View />} />
    </Routes>
  );
};

export default DashboardRoutes;