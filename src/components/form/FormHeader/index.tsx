import type { FormHeaderProps } from '../../../types/form.types';

const FormHeader: React.FC<FormHeaderProps> = ({ title }) => (
  <div className="text-center mb-8">
    <h1 className="text-3xl font-bold text-blue-700 mb-2">{title}</h1>
    <div className="w-12 h-0.5 bg-blue-700 mx-auto"></div>
  </div>
);

export default FormHeader