import { Button, Form, Input, Typography } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';

import styles from './Auth.module.css';

const { Text, Title, Link } = Typography;

interface AuthFormProps<T> {
  type: 'login' | 'register';
  onSubmit: (values: T) => void;
}

const AuthForm = <T,>({ type, onSubmit }: AuthFormProps<T>) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Title>{type === 'login' ? 'Sign in' : 'Register'}</Title>
          <Text>
            {type === 'login'
              ? 'Welcome back to TalentTrack! Please enter your details below to sign in.'
              : 'Welcome to TalentTrack! Please enter your details below to create an account.'}
          </Text>
        </div>
        <Form
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={onSubmit}
          layout="vertical"
          requiredMark="optional"
          autoComplete="off"
        >
          <div className={styles.form}>
            {type === 'register' && (
              <>
                <Form.Item
                  name="firstName"
                  rules={[
                    {
                      type: 'string',
                      required: true,
                      message: 'Please input your first name',
                    },
                  ]}
                  className={styles.field}
                >
                  <Input prefix={<UserOutlined />} placeholder="First name" />
                </Form.Item>
                <Form.Item
                  name="lastName"
                  rules={[
                    {
                      type: 'string',
                      required: true,
                      message: 'Please input your last name',
                    },
                  ]}
                  className={styles.field}
                >
                  <Input prefix={<UserOutlined />} placeholder="Last name" />
                </Form.Item>
              </>
            )}

            <Form.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  required: true,
                  message: 'Please input your email',
                },
              ]}
              className={styles.field}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password',
                },
                {
                  min: 6,
                  message: 'Password must be at least 6 characters long',
                },
              ]}
              className={styles.field}
            >
              <Input.Password prefix={<LockOutlined />} type="password" placeholder="Password" />
            </Form.Item>

            {type === 'register' && (
              <Form.Item
                name="repeatPassword"
                rules={[
                  {
                    required: true,
                    message: 'Please repeat your password',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Passwords do not match'));
                    },
                  }),
                ]}
                className={styles.field}
              >
                <Input.Password prefix={<LockOutlined />} type="password" placeholder="Repeat password" />
              </Form.Item>
            )}
          </div>
          <Form.Item style={{ marginBottom: '0px' }}>
            <Button block={true} htmlType="submit">
              {type === 'login' ? 'Log in' : 'Register'}
            </Button>
            <div className={styles.footer}>
              {type === 'login' ? (
                <>
                  <Text className={styles.text}>Don't have an account?</Text> <Link href="/register">Sign up now</Link>
                </>
              ) : (
                <>
                  <Text className={styles.text}>Already have an account?</Text> <Link href="/login">Log in now</Link>
                </>
              )}
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default AuthForm;
