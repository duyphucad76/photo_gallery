import type { FormToggleProps } from '../../../types/form.types';

const FormToggle: React.FC<FormToggleProps> = ({ currentForm, onToggle }) => (
  <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
    <button
      onClick={() => onToggle('signup')}
      className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${currentForm === 'signup'
        ? 'bg-white text-blue-700 shadow-sm'
        : 'text-gray-500 hover:text-gray-700'
        }`}
    >
      Sign Up
    </button>
    <button
      onClick={() => onToggle('signin')}
      className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${currentForm === 'signin'
        ? 'bg-white text-blue-700 shadow-sm'
        : 'text-gray-500 hover:text-gray-700'
        }`}
    >
      Sign In
    </button>
  </div>
);

export default FormToggle