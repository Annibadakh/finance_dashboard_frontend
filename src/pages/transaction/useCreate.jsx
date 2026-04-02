import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { transactionService } from "./transaction.service";

const schema = yup.object().shape({
  description: yup.string().required("Description is required"),
  amount: yup.number().positive("Amount must be positive").required("Amount is required"),
  category: yup.string().required("Category is required"),
  type: yup.string().oneOf(["income", "expense"]).required("Type is required"),
  date: yup.date().required("Date is required").nullable(),
});

export const useCreate = (initialData = null) => {
  const navigate = useNavigate();
  const isEdit = !!initialData;

  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "Software",
    type: "expense",
    date: new Date(),
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      await schema.validate(formData, { abortEarly: false });
      
      if (isEdit) {
        await transactionService.update(initialData.id, formData);
      } else {
        await transactionService.create(formData);
      }
      
      // Navigate back to list on success
      navigate("/dashboard/transactions");
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const valErrors = {};
        err.inner.forEach(error => { valErrors[error.path] = error.message; });
        setErrors(valErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return { formData, errors, isSubmitting, handleChange, handleSubmit };
};