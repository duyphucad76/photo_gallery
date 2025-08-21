import type { ChangeEvent, FC, ReactNode } from "react";

export interface SidebarItemI {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active: boolean;
}

export interface CategoryCardI {
  id: string;
  name: string;
  icon: string;
}

export type ButtonVariant = "primary" | "secondary" | "outline";

export interface IconProps {
  className?: string;
}

export interface InputFieldProps {
  type?: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon: FC<IconProps>;
  error?: string;
}

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: ButtonVariant;
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
}

export interface LoadingSpinnerProps {
  text?: string;
}

export type MenuItem =
  | { divider: true }
  | { divider?: false; icon: React.ElementType; label: string };
