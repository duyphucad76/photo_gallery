import { LockIcon } from 'lucide-react';
import type { ChangeEvent } from 'react';
import type { SignInFormProps } from '../../../types/form.types';
import Button from '../../ui/Button';
import { EmailIcon } from '../../ui/Icons';
import InputField from '../../ui/InputField';
import LoadingSpinner from '../../ui/LoadingSpinner';

const SignInForm: React.FC<SignInFormProps> = ({
  formData,
  setFormData,
  errors,
  setErrors,
  isSubmitting,
  onSubmit
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleForgotPassword = (): void => {
    alert('Forgot password functionality would redirect to reset page');
  };

  return (
    <div className="space-y-6">
      <InputField
        type="email"
        name="username"
        value={formData.username}
        onChange={handleInputChange}
        placeholder="Email Address"
        icon={EmailIcon}
        error={errors.email}
      />

      <InputField
        type="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        placeholder="Password"
        icon={LockIcon}
        error={errors.password}
      />

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-gray-600">Remember me</span>
        </label>
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors duration-200"
        >
          Forgot password?
        </button>
      </div>

      <div className="pt-4">
        <Button
          onClick={onSubmit}
          variant="primary"
          disabled={isSubmitting}
          fullWidth={true}
        >
          {isSubmitting ? <LoadingSpinner text="Signing in..." /> : 'Sign In'}
        </Button>
      </div>
    </div>
  );
};

export default SignInForm