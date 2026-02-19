import type { FC } from "react";
import { useState } from "react";
import { Alert, Button, Checkbox, Divider, Form, Input } from "antd";
import { Logo } from "@/shared/icons";
import { saveToken, type AuthStorageScope } from "@/shared/lib";
import { useLoginMutation } from "@/shared/store";
import "./LoginForm.scss";

interface LoginFormValues {
  username: string;
  password: string;
  isRemember: boolean;
}

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm: FC<LoginFormProps> = ({ onSuccess = () => null }) => {
  const [error, setError] = useState<string | null>(null);
  const [form] = Form.useForm<LoginFormValues>();

  const [login, { isLoading: isSubmitting }] = useLoginMutation();

  const handleFinish = async (values: LoginFormValues): Promise<void> => {
    const { username, password, isRemember } = values;

    try {
      setError(null);
      const data = await login({
        username,
        password,
      }).unwrap();

      const scope: AuthStorageScope = isRemember ? "persistent" : "session";
      saveToken(data.token, scope);

      onSuccess();
    } catch (err) {
      if (err instanceof Error) {
        return setError(err.message);
      }

      setError("Не удалось войти в систему");
    }
  };

  return (
    <div className="login-form">
      <div className="login-form__content">
        <div className="login-form__logo-wrap">
          <Logo />
        </div>
        <div className="login-form__title">Добро пожаловать!</div>
        <p className="login-form__subtitle">Пожалуйста, авторизируйтесь</p>
        {error && (
          <Alert
            className="login-form__alert"
            type="error"
            message={error}
            showIcon
          />
        )}
        <Form<LoginFormValues>
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="Логин"
            name="username"
            rules={[{ message: "Введите логин" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[{ message: "Введите пароль" }]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <div className="login-form__actions">
            <Form.Item name="isRemember" valuePropName="checked" noStyle>
              <Checkbox>Запомнить данные</Checkbox>
            </Form.Item>
            <Button
              className="login-form__submit-button"
              type="primary"
              htmlType="submit"
              size="large"
              loading={isSubmitting}
            >
              Войти
            </Button>
          </div>
        </Form>
        <div className="login-form__or">
          <Divider />
          <span className="login-form__or-text">или</span>
          <Divider />
        </div>
        <div className="login-form__register">
          <span className="login-form__register-text">Нет аккаунта?</span>
          <Button
            className="login-form__register-link"
            size="large"
            type="link"
          >
            Создать
          </Button>
        </div>
      </div>
    </div>
  );
};
