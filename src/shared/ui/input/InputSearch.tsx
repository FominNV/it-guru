import type { FC } from "react";
import { Input } from "antd";
import type { SearchProps } from "antd/es/input";
import clsx from "clsx";
import { AiOutlineCalendar } from "react-icons/ai";
import { COLORS } from "@/shared/constants";
import "./InputSearch.scss";

export interface IInputSearchProps extends SearchProps {
  label?: string;
}

export const InputSearch: FC<IInputSearchProps> = ({
  className,
  label,
  ...props
}) => {
  return (
    <div className={clsx("input-search", className)}>
      <label className="input-search__label">{label}</label>
      <Input.Search
        enterButton={<AiOutlineCalendar color={COLORS.BLACK} size={24} />}
        size="large"
        {...props}
      />
    </div>
  );
};
