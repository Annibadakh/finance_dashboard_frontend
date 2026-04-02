import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import List from "./List";
import Create from "./Create";
import Edit from "./Edit";
import View from "./View";
import { useAuth } from "../../context/AuthContext";
import NotFound from "../NotFound";

// Optional: Guard to strictly prevent viewers from typing /create in URL
const AdminRoute = ({ children }) => {
    const { user } = useAuth();
    if (user?.role !== "admin") return <Navigate to="/transactions" replace />;
    return children;
};

const TransactionRoutes = () => {
    return (
        <Routes>
            <Route index element={<List />} />
            <Route path="create" element={<AdminRoute><Create /></AdminRoute>} />
            <Route path=":id" element={<View />} />
            <Route path=":id/edit" element={<AdminRoute><Edit /></AdminRoute>} />
            <Route path="*" element={<NotFound />} />

        </Routes>
    );
};

export default TransactionRoutes;