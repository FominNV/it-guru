import type { FC, ChangeEvent } from "react";
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
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange?.(event);
  };

  return (
    <div className="header">
      <MainContainer>
        <div className="header__content">
          <div className="header__title">{title}</div>
          <InputSearch label="Найти" onChange={handleChange} />
        </div>
      </MainContainer>
    </div>
  );
};

