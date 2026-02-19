import type { IProductData } from "@/shared/store/products/types";
import type { ITableRowData } from "../ui/ProductTable";

export const mapProductData = (data: IProductData[]): ITableRowData[] => {
  return data.map((elem) => ({ key: elem.id, ...elem }));
};
