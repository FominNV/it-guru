import type { FC } from "react";
import "./Summary.scss";

export interface SummaryProps {
  current: number | string;
  total: number | string;
}

export const Summary: FC<SummaryProps> = ({ current, total }) => {
  return (
    <div className="product-table__footer-summary">
      Показано{" "}
      <span className="product-table__footer-summary-number">{current}</span> из{" "}
      <span className="product-table__footer-summary-number">{total}</span>
    </div>
  );
};

