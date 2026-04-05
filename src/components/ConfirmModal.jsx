import { useEffect } from "react";
import { FiAlertTriangle, FiTrash2, FiInfo } from "react-icons/fi";
import Button from "./Button";

const ConfirmModal = ({
  isOpen,
  title,
  desc,
  confirmText,
  cancelText,
  type,
  onConfirm,
  onCancel,
}) => {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Dynamic styles based on modal type
  const config = {
    danger: {
      icon: FiTrash2,
      color: "text-red-600 dark:text-red-400",
      bg: "bg-red-100 dark:bg-red-900/30",
      btnVariant: "danger",
    },
    warning: {
      icon: FiAlertTriangle,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-100 dark:bg-amber-900/30",
      btnVariant: "warning",
    },
    info: {
      icon: FiInfo,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-100 dark:bg-blue-900/30",
      btnVariant: "primary",
    },
  };

  const Icon = config[type].icon;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-0">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onCancel}
      ></div>

      {/* Modal Dialog */}
      <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-md p-6 sm:p-8 transform transition-all animate-slide-up-fade">
        <div className="flex flex-col items-center text-center">
          {/* Icon Circle */}
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 ${config[type].bg}`}
          >
            <Icon className={`w-8 h-8 ${config[type].color}`} />
          </div>

          {/* Text Content */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
            {desc}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row w-full gap-3 sm:gap-4">
            <Button
              variant="secondary"
              outline
              className="w-full sm:w-1/2"
              onClick={onCancel}
            >
              {cancelText}
            </Button>
            <Button
              variant={config[type].btnVariant}
              className="w-full sm:w-1/2"
              onClick={onConfirm}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
