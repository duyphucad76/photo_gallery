import { useState } from 'react';
import FormHeader from '../../components/form/FormHeader';
import FormToggle from '../../components/form/FormToogle/FormToogle';
import SignInForm from '../../components/form/SignInForm';
import SignUpForm from '../../components/form/SignUpForm';
import { useFormValidation } from '../../hooks';
import type { FormType, SignUpFormData, SignInFormData, FormErrors } from '../../types/auth.types';
import { login as loginService, register } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';



const Auth: React.FC = () => {
  const [currentForm, setCurrentForm] = useState<FormType>('signin');
  const [signUpData, setSignUpData] = useState<SignUpFormData>({
    name: '',
    email: '',
    password: ''
  });
  const [signInData, setSignInData] = useState<SignInFormData>({
    username: '',
    password: ''
  });
  const { setAvatar } = useAuth()

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { validateSignUp, validateSignIn } = useFormValidation();

  const navigate = useNavigate()
  const { setIsAuthenticated } = useAuth();

  const handleFormToggle = (form: FormType): void => {
    setCurrentForm(form);
    setErrors({});
  };

  const handleSignUp = async (): Promise<void> => {
    const newErrors = validateSignUp(signUpData);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await register(
        signUpData.name,
        signUpData.email,
        signUpData.password
      );

      console.log('Sign up data:', signUpData);

      console.log(res)

    } catch (error) {
      console.error('Sign up error:', error);
      alert('An error occurred during sign up. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignIn = async () => {
    const newErrors = validateSignIn(signInData);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await loginService(
        signInData.username,
        signInData.password
      );

      const token = res?.metadata?.tokens?.accessToken;
      const avatar = res?.metadata?.user?.avatar;
      localStorage.setItem('accessToken', token)
      setAvatar(avatar)
      if (localStorage.getItem('accessToken')) {
        setIsAuthenticated(true);
        navigate("/", { replace: true });
      }

    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex items-center justify-center p-4 w-full">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <FormToggle
          currentForm={currentForm}
          onToggle={handleFormToggle}
        />

        <FormHeader
          title={currentForm === 'signup' ? 'Create Account' : 'Welcome Back'}
        />

        {currentForm === 'signup' ? (
          <SignUpForm
            formData={signUpData}
            setFormData={setSignUpData}
            errors={errors}
            setErrors={setErrors}
            isSubmitting={isSubmitting}
            onSubmit={handleSignUp}
          />
        ) : (
          <SignInForm
            formData={signInData}
            setFormData={setSignInData}
            errors={errors}
            setErrors={setErrors}
            isSubmitting={isSubmitting}
            onSubmit={handleSignIn}
          />
        )}

        <div className="text-center mt-6 text-gray-600 text-sm">
          {currentForm === 'signup' ? (
            <>
              Already have an account?{' '}
              <button
                onClick={() => handleFormToggle('signin')}
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors duration-200"
              >
                Sign in here
              </button>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <button
                onClick={() => handleFormToggle('signup')}
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors duration-200"
              >
                Create one now
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth