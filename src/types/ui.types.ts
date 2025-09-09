import type { ChangeEvent, FC, ReactNode } from "react";

export interface SidebarItemI {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  url: string;
}

export type ButtonVariant = "primary" | "secondary" | "outline";

export interface IconProps {
  className?: string;
}

export interface InputFieldPropsI {
  type?: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon: FC<IconProps>;
  error?: string;
}

export interface ButtonPropsI {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: ButtonVariant;
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
}

export interface LoadingSpinnerPropsI {
  text?: string;
}

export type MenuItem =
  | {
    icon: React.ElementType;
    label: string;
    url?: string;
  }
  | { divider: true }
