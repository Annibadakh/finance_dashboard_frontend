import { useNavigate } from "react-router-dom";
import { FiSave } from "react-icons/fi";
import { useCreate } from "./useCreate";
import LabelInput from "../../components/LabelInput";
import SelectField from "../../components/SelectField";
import DatePickerField from "../../components/DatePickerField";
import Button from "../../components/Button";

// Exported standalone form to reuse in Edit
export const TransactionForm = ({ initialData, title }) => {
  const navigate = useNavigate();
  const { formData, errors, isSubmitting, handleChange, handleSubmit } =
    useCreate(initialData);

  const categoryOptions = [
    { value: "Salary", label: "Salary" },
    { value: "Software", label: "Software" },
    { value: "Rent", label: "Rent" },
    { value: "Freelance", label: "Freelance" },
  ];

  const typeOptions = [
    { value: "expense", label: "Expense" },
    { value: "income", label: "Income" },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-800 space-y-6 shadow-sm"
    >
      <LabelInput
        label="Description"
        placeholder="e.g. AWS Web Services"
        value={formData.description}
        onChange={(e) => handleChange("description", e.target.value)}
        error={errors.description}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LabelInput
          label="Amount (₹)"
          type="number"
          placeholder="0.00"
          value={formData.amount}
          onChange={(e) => handleChange("amount", e.target.value)}
          error={errors.amount}
        />
        <DatePickerField
          label="Date"
          selectedDate={formData.date}
          onChange={(date) => handleChange("date", date)}
          error={errors.date}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField
          label="Type"
          options={typeOptions}
          value={formData.type}
          onChange={(val) => handleChange("type", val)}
          error={errors.type}
        />
        <SelectField
          label="Category"
          options={categoryOptions}
          value={formData.category}
          onChange={(val) => handleChange("category", val)}
          error={errors.category}
        />
      </div>

      <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-4">
        <Button
          variant="secondary"
          outline
          onClick={() => navigate("/dashboard/transactions")}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          type="submit"
          isLoading={isSubmitting}
          iconLeft={FiSave}
        >
          {initialData ? "Update Transaction" : "Save Transaction"}
        </Button>
      </div>
    </form>
  );
};

const Create = () => <TransactionForm title="Add New Transaction" />;
export default Create;
