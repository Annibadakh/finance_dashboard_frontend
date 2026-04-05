import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import AppRoute from "./routes/AppRoute";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { ConfirmModalProvider } from "./context/ConfirmModalContext";
import { TransactionProvider } from "./context/TransactionContext";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <TransactionProvider>
          <AuthProvider>
            <ConfirmModalProvider>
              <>
                <ToastContainer
                  position="top-right"
                  autoClose={1500}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  style={{ zIndex: 9999 }}
                />
                <AppRoute />
              </>
            </ConfirmModalProvider>
          </AuthProvider>
        </TransactionProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
