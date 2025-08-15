export type FormType = "signup" | "signin";

export interface SignUpFormData {
  name: string;
  username: string;
  password: string;
}

export interface SignInFormData {
  username: string;
  password: string;
}

export interface FormErrors {
  [key: string]: string;
}
