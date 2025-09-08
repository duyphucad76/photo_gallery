export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

export interface SignInFormData {
  username: string;
  password: string;
}

export interface FormErrors {
  [key: string]: string;
}

export type FormType = "signup" | "signin";

export interface FormHeaderProps {
  title: string;
}

export interface FormToggleProps {
  currentForm: FormType;
  onToggle: (form: FormType) => void;
}

export interface SignUpFormProps {
  formData: SignUpFormData;
  setFormData: React.Dispatch<React.SetStateAction<SignUpFormData>>;
  errors: FormErrors;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
  isSubmitting: boolean;
  onSubmit: () => void;
}

export interface SignInFormProps {
  formData: SignInFormData;
  setFormData: React.Dispatch<React.SetStateAction<SignInFormData>>;
  errors: FormErrors;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
  isSubmitting: boolean;
  onSubmit: () => void;
}
