import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
} from "react";
import ConfirmModal from "../components/ConfirmModal";

const ConfirmModalContext = createContext();

export const ConfirmModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: "",
    desc: "",
    confirmText: "Delete",
    cancelText: "Cancel",
    type: "danger", // can be danger, warning, or info
  });

  // useRef to store the Promise resolve function
  const resolver = useRef(null);

  // The function exposed to the rest of the app
  const confirm = useCallback(
    ({
      title,
      desc,
      confirmText = "Delete",
      cancelText = "Cancel",
      type = "danger",
    }) => {
      setModalState({
        isOpen: true,
        title,
        desc,
        confirmText,
        cancelText,
        type,
      });

      return new Promise((resolve) => {
        resolver.current = resolve;
      });
    },
    [],
  );

  const handleConfirm = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
    if (resolver.current) resolver.current(true);
  };

  const handleCancel = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
    if (resolver.current) resolver.current(false);
  };

  return (
    <ConfirmModalContext.Provider value={{ confirm }}>
      {children}
      {/* The actual Modal UI is injected globally here */}
      <ConfirmModal
        {...modalState}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </ConfirmModalContext.Provider>
  );
};

// Custom hook to use anywhere in the app
export const useConfirm = () => {
  const context = useContext(ConfirmModalContext);
  if (!context) {
    throw new Error("useConfirm must be used within a ConfirmModalProvider");
  }
  return context;
};
