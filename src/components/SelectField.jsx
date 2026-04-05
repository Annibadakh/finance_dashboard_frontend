import Select from "react-select";

const SelectField = ({
  label,
  options,
  value,
  onChange,
  error,
  placeholder = "Select an option...",
  isMulti = false,
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
      <Select
        options={options}
        value={options ? options.find((option) => option.value === value) : ""}
        onChange={(val) =>
          onChange(isMulti ? val.map((v) => v.value) : val.value)
        }
        isMulti={isMulti}
        placeholder={placeholder}
        unstyled
        classNames={{
          control: ({ isFocused }) =>
            `w-full py-1 bg-gray-50 dark:bg-gray-950 border rounded-xl text-gray-900 dark:text-white transition-all 
            ${error ? "border-red-500" : "border-gray-200 dark:border-gray-800"}
            ${isFocused && !error ? "ring-2 ring-blue-500 border-blue-500" : ""}
            ${isFocused && error ? "ring-2 ring-red-500" : ""}`,
          placeholder: () => "text-gray-400 pl-3",
          singleValue: () => "text-gray-900 dark:text-white pl-3",
          input: () => "text-gray-900 dark:text-white pl-3",
          valueContainer: () => "gap-1",
          indicatorsContainer: () => "pr-2 text-gray-400",
          menu: () =>
            "mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg z-50 overflow-hidden",
          option: ({ isFocused, isSelected }) =>
            `px-4 py-2.5 cursor-pointer transition-colors
            ${isSelected ? "bg-blue-600 text-white" : ""}
            ${isFocused && !isSelected ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white" : ""}
            ${!isFocused && !isSelected ? "text-gray-700 dark:text-gray-300" : ""}`,
          multiValue: () =>
            "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded px-2 py-0.5 m-1",
          multiValueRemove: () =>
            "hover:bg-blue-200 dark:hover:bg-blue-800 rounded ml-1 cursor-pointer",
        }}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
};

export default SelectField;
