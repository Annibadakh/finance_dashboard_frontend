
import { toast } from "react-toastify";
import { triggerLogout } from "../services/authService";
import { navigateTo } from "../services/navigationService";

export const apiHandler = (fn) => {
    return (...args) => {

        return (async () => {
            try {
                const response = await fn(...args);

                const status = response.status;
                const message = response.data?.message;

                // ✅ Success Toast (for create/update)
                if (status === 201 && message) {
                    toast.success(message);
                }

                // ✅ Return only useful data
                return response.data?.data;

            } catch (err) {
                const status = err?.response?.status;
                const message =
                    err?.response?.data?.message ||
                    err.message ||
                    "Something went wrong";

                switch (status) {
                    case 401:
                        toast.error(message);
                        triggerLogout();
                        break;

                    case 403:
                        toast.info(message);
                        navigateTo("/dashboard");
                        break;

                    case 405:
                        // Validation error (return to form)
                        return Promise.reject(err.response?.data);

                    default:
                        console.log("API Error:", err);
                        toast.error(message);
                }

                throw err;
            }
        })();
    };
};