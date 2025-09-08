import { UserIcon, LockIcon } from 'lucide-react';
import type { ChangeEvent } from 'react';
import type { SignUpFormProps } from '../../../types/form.types';
import Button from '../../ui/Button';
import InputField from '../../ui/InputField';
import LoadingSpinner from '../../ui/LoadingSpinner';
import { EmailIcon } from '../../ui/Icons';

const SignUpForm: React.FC<SignUpFormProps> = ({
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

  return (
    <div className="space-y-6">
      <InputField
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Username"
        icon={UserIcon}
        error={errors.name}
      />

      <InputField
        type="email"
        name="email"
        value={formData.email}
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
        placeholder="Password (min 6 chars, mixed case)"
        icon={LockIcon}
        error={errors.password}
      />

      <div className="pt-4">
        <Button
          onClick={onSubmit}
          variant="primary"
          disabled={isSubmitting}
          fullWidth={true}
        >
          {isSubmitting ? <LoadingSpinner text="Creating Account..." /> : 'Create Account'}
        </Button>
      </div>
    </div>
  );
};

export default SignUpForm