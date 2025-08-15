import type { InputFieldProps } from '../../../types/ui.types';

const InputField: React.FC<InputFieldProps> = ({
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  icon: Icon,
  error
}) => {
  return (
    <div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full pl-10 pr-4 py-3 bg-gray-100 border-0 rounded-md focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all duration-200 ${error ? 'ring-2 ring-red-500' : ''
            }`}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField