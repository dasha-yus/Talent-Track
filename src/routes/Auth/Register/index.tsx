import { useNavigate } from 'react-router-dom';
import { App } from 'antd';

import AuthForm from '@/components/auth';
import { ROUTES } from '@/shared/config/routes';

type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const { notification } = App.useApp();

  const onSubmit = (values: RegisterData) => {
    console.log('Register data: ', values);
    notification.success({
      message: 'The account was successfully created',
      description: 'Please sign in to continue',
    });
    navigate(ROUTES.LOGIN);
  };

  return <AuthForm type="register" onSubmit={onSubmit} />;
};

export default RegisterPage;
