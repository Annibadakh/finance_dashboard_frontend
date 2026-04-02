import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parse } from "date-fns";
import { FiCalendar } from "react-icons/fi";

// Custom input component to match the Fintech theme
const CustomDateInput = forwardRef(({ value, onClick, error, placeholder }, ref) => (
  <div className="relative cursor-pointer" onClick={onClick}>
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <FiCalendar className={`text-gray-400 ${error ? 'text-red-400' : ''}`} size={18} />
    </div>
    <input
      ref={ref}
      value={value}
      readOnly
      placeholder={placeholder}
      className={`w-full py-2.5 pl-10 pr-4 bg-gray-50 dark:bg-gray-950 border rounded-xl text-gray-900 dark:text-white outline-none transition-all focus:ring-2 cursor-pointer
        ${error 
          ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
          : 'border-gray-200 dark:border-gray-800 focus:ring-blue-500 focus:border-blue-500'
        }`}
    />
  </div>
));

CustomDateInput.displayName = "CustomDateInput";

const DatePickerField = ({ 
  label, 
  selectedDate, 
  onChange, 
  error, 
  placeholder = "DD/MM/YYYY",
  className = "",
  ...props 
}) => {
  
  // Format standard date to DD/MM/YYYY if needed (react-datepicker handles most internally)
  const handleDateChange = (date) => {
    // Returns a raw Date object. You can format it at the parent level using date-fns: format(date, 'dd/MM/yyyy')
    onChange(date);
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          {label}
        </label>
      )}
      
      {/* 
        Note: You will need to add custom CSS to global index.css 
        to style the react-datepicker popup calendar for dark mode 
      */}
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        customInput={<CustomDateInput error={error} placeholder={placeholder} />}
        showPopperArrow={false}
        {...props}
      />
      {error && <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
};

export default DatePickerField;