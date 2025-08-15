import type { SignUpFormData, SignInFormData, FormErrors } from "./form.types";

export interface ValidationHook {
  validateSignUp: (formData: SignUpFormData) => FormErrors;
  validateSignIn: (formData: SignInFormData) => FormErrors;
}
