import type {
  FormErrors,
  SignInFormData,
  SignUpFormData,
} from "../types/auth.types";
import type { ValidationHook } from "../types/validation.types";

const useFormValidation = (): ValidationHook => {
  const validateSignUp = (formData: SignUpFormData): FormErrors => {
    const errors: FormErrors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      errors.username = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.username = "Email is invalid";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])/.test(formData.password)) {
      errors.password =
        "Password must contain at least one uppercase and lowercase letter";
    }

    return errors;
  };

  const validateSignIn = (formData: SignInFormData): FormErrors => {
    const errors: FormErrors = {};

    if (!formData.username.trim()) {
      errors.username = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.username)) {
      errors.username = "Email is invalid";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  return { validateSignUp, validateSignIn };
};

export default useFormValidation;
