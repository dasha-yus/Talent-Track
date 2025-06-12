import { useNavigate } from 'react-router-dom';
import { App } from 'antd';

import AuthForm from '@/components/auth';
import { ROUTES } from '@/shared/config/routes';

type LoginData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { notification } = App.useApp();

  const onSubmit = (values: LoginData) => {
    console.log("Login data: ", values)
    notification.success({ message: 'You have been successfully logged in' });
    navigate(ROUTES.HOME);
  };

  return <AuthForm type="login" onSubmit={onSubmit} />;
};

export default LoginPage;
