import type { ButtonPropsI, ButtonVariant } from '../../../types/ui.types';

const Button: React.FC<ButtonPropsI> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  className = '',
  fullWidth = false
}) => {
  const baseClasses = `font-semibold py-3 px-6 rounded-full transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${fullWidth ? 'w-full' : 'flex-1'
    }`;

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white focus:ring-purple-500",
    secondary: "bg-gray-400 hover:bg-gray-500 text-white focus:ring-gray-400",
    outline: "border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white focus:ring-purple-500"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button