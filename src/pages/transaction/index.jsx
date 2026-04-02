import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import List from "./List";
import Create from "./Create";
import Edit from "./Edit";
import View from "./View";
import { useAuth } from "../../context/AuthContext";
import Drawer from "../../components/Drawer";
import NotFound from "../NotFound";

const AdminRoute = ({ children }) => {
    const { user } = useAuth();
    if (user?.role !== "admin") return <Navigate to="/transactions" replace />;
    return children;
};

const TransactionRoutes = () => {
    const navigate = useNavigate();

    // The close handler navigates back to the base route
    const closeDrawer = () => navigate("/dashboard/transactions");

    return (
        <>
            {/* 1. ALWAYS render the List in the background */}
            <List />

            {/* 2. Overlay Drawers based on URL paths */}
            <Routes>
                {/* Exact match to /transactions: Render nothing over the list */}
                <Route path="/" element={null} />

                <Route
                    path="create"
                    element={
                        <Drawer title="Add New Transaction" onClose={closeDrawer}>
                            <AdminRoute>
                                <Create />
                            </AdminRoute>
                        </Drawer>
                    }
                />

                <Route
                    path=":id"
                    element={
                        <Drawer title="Transaction Details" onClose={closeDrawer}>
                            <View />
                        </Drawer>
                    }
                />

                <Route
                    path=":id/edit"
                    element={
                        <Drawer title="Edit Transaction" onClose={closeDrawer}>
                            <AdminRoute>
                                <Edit />
                            </AdminRoute>
                        </Drawer>
                    }
                />

                {/* Optional: Render 404 in Drawer if invalid transaction ID is typed */}
                <Route
                    path="*"
                    element={
                        <Drawer title="Error" onClose={closeDrawer}>
                            <NotFound />
                        </Drawer>
                    }
                />
            </Routes>
        </>
    );
};

export default TransactionRoutes;