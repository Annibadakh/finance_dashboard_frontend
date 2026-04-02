import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AppLayout from "../pages/layout/AppLayout";
import DummyDashboard from "../pages/dashboard/DummyDashboard";
import Login from "../pages/auth/Login";
import NotFound from "../pages/NotFound";
import Transaction from "../pages/transaction";
import View from "../pages/dashboard/View";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    return children;
};

function AppRoute() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <AppLayout />
                </ProtectedRoute>}>
                <Route index element={<View />}/>
                <Route path="transactions/*" element={<Transaction />}/>
                <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="*" element={<NotFound />} />

        </Routes>
    );
}

export default AppRoute;