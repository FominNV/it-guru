import type { FC } from "react";
import { useNavigate } from "react-router";
import { LoginForm } from "@/features/login";
import { MainContainer, MainLayout } from "@/shared/ui";
import "./LoginPage.scss";

export const LoginPage: FC = () => {
  const navigate = useNavigate();

  const handleSuccess = (): void => {
    navigate("/landing", { replace: true });
  };

  return (
    <MainLayout>
      <div className="login-page">
        <MainContainer>
          <div className="login-page__content">
            <LoginForm onSuccess={handleSuccess} />
          </div>
        </MainContainer>
      </div>
    </MainLayout>
  );
};

