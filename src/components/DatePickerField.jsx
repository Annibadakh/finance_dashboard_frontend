import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiCalendar } from "react-icons/fi";

// Custom Input (matches SelectField control)
const CustomDateInput = forwardRef(
  ({ value, onClick, error, placeholder }, ref) => (
    <div className="relative cursor-pointer" onClick={onClick}>
      <FiCalendar
        size={18}
        className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 ${
          error ? "text-red-400" : ""
        }`}
      />
      <input
        ref={ref}
        value={value}
        readOnly
        placeholder={placeholder}
        className={`w-full py-2 pl-10 pr-3 bg-gray-50 dark:bg-gray-950 border rounded-xl text-gray-900 dark:text-white outline-none transition-all cursor-pointer
        ${error ? "border-red-500" : "border-gray-200 dark:border-gray-800"}
        focus:ring-2 ${
          error ? "focus:ring-red-500" : "focus:ring-blue-500"
        } focus:border-transparent`}
      />
    </div>
  ),
);

CustomDateInput.displayName = "CustomDateInput";

const DatePickerField = ({
  label,
  selectedDate,
  onChange,
  error,
  placeholder = "Select date...",
  className = "",
  ...props
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          {label}
        </label>
      )}

      <DatePicker
        selected={selectedDate}
        onChange={(date) => onChange(date)}
        dateFormat="dd/MM/yyyy"
        customInput={
          <CustomDateInput error={error} placeholder={placeholder} />
        }
        calendarClassName="custom-datepicker"
        popperClassName="z-50"
        showPopperArrow={false}
        {...props}
      />

      {error && (
        <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
};

export default DatePickerField;
