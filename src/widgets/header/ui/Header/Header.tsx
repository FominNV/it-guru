import type { FC, ChangeEvent } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router";
import { clearToken } from "@/shared/lib";
import {
  InputSearch,
  MainContainer,
  type IInputSearchProps,
} from "@/shared/ui";
import "./Header.scss";

interface HeaderProps {
  title?: string;
  onSearchChange?: IInputSearchProps["onChange"];
}

export const Header: FC<HeaderProps> = ({
  title = "Товары",
  onSearchChange,
}) => {
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange?.(event);
  };

  const handleLogout = () => {
    clearToken();
    navigate("/login", { replace: true });
  };

  return (
    <div className="header">
      <MainContainer>
        <div className="header__content">
          <div className="header__title">{title}</div>
          <InputSearch label="Найти" onChange={handleChange} />
          <div className="header__actions">
            <Button size="large" onClick={handleLogout}>
              Выйти
            </Button>
          </div>
        </div>
      </MainContainer>
    </div>
  );
};

