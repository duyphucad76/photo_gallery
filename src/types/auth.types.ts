export type FormType = "signup" | "signin";

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
