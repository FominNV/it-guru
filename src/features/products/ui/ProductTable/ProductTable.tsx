import { useState, type FC, type JSX } from "react";
import { Button, Pagination, Table, message, type TableProps } from "antd";
import type { SortOrder } from "antd/es/table/interface";
import clsx from "clsx";
import { FiPlus } from "react-icons/fi";
import { PiDotsThreeCircle } from "react-icons/pi";
import { COLORS } from "@/shared/constants";
import { createId } from "@/shared/lib";
import { Summary } from "@/shared/ui";
import { type AddProductFormValues } from "./AddProductModal.tsx";
import { ProductTableHeader } from "./ProductTableHeader.tsx";
import "./ProductTable.scss";

const DEFAULT_SORT: ISortState = {
  columnKey: "title",
  order: "ascend",
};

const PAGE_SIZE = 5;

export interface ITableRowData {
  key: string;
  id: string;
  title: string;
  category: string;
  price: number;
  rating: number;
  brand: string;
  sku: string;
}

interface ISortState {
  columnKey: string;
  order: SortOrder;
}

export interface ProductTable {
  items?: ITableRowData[];
  isLoading?: boolean;
}

export const ProductTable: FC<ProductTable> = ({ items = [], isLoading }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [sortState, setSortState] = useState<ISortState>(DEFAULT_SORT);
  const [addedItems, setAddedItems] = useState<ITableRowData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const combinedItems: ITableRowData[] = [...addedItems, ...items];
  const total: number = combinedItems.length;
  const startIndex: number =
    total === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const endIndex: number = Math.min(total, currentPage * PAGE_SIZE);
  const pagedItems: ITableRowData[] = combinedItems.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleTableChange: TableProps<ITableRowData>["onChange"] = (
    _pagination,
    _filters,
    sorter,
  ) => {
    if (Array.isArray(sorter)) {
      return;
    }

    setSortState({
      columnKey: sorter.columnKey as string,
      order: sorter.order as SortOrder,
    });
  };

  const handleAddProductFinish = (values: AddProductFormValues) => {
    const id = createId();

    const newItem: ITableRowData = {
      key: id,
      id,
      title: values.title,
      category: "",
      price: values.price,
      rating: 5,
      brand: values.brand,
      sku: values.sku,
    };

    setAddedItems((prev) => [newItem, ...prev]);
    message.success("Товар успешно добавлен");
  };

  const renderPriceValue = (price: number): JSX.Element => {
    const [wholeNumber = "0", fractional = "00"] = price.toString().split(".");

    return (
      <div className="product-table__text-normal">
        {wholeNumber}
        <span className="product-table__text-gray">, {fractional}</span>
      </div>
    );
  };

  const columns: TableProps<ITableRowData>["columns"] = [
    {
      title: "Наименование",
      dataIndex: "title",
      key: "title",
      width: 274,
      sortOrder: sortState.columnKey === "title" ? sortState.order : null,
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (text, { category }) => (
        <div className="product-table__title-ceil">
          <div className="product-table__square" />
          <div className="product-table__title-ceil-content">
            <div className="product-table__title">{text}</div>
            <div className="product-table__brand">{category}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Вендор",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Артикул",
      dataIndex: "sku",
      key: "sku",
      render: (text) => (
        <div className="product-table__text-normal">{text}</div>
      ),
    },
    {
      title: "Рейтинг",
      dataIndex: "rating",
      key: "rating",
      sortOrder: sortState.columnKey === "rating" ? sortState.order : null,
      sorter: (a, b) => a.rating - b.rating,
      render: (value: number) => (
        <div
          className={clsx("product-table__rating", {
            "product-table__rating--low": value < 3,
          })}
        >
          {value}
        </div>
      ),
    },
    {
      title: "Цена, ₽",
      dataIndex: "price",
      key: "price",
      sortOrder: sortState.columnKey === "price" ? sortState.order : null,
      sorter: (a, b) => a.price - b.price,
      render: (text) => renderPriceValue(text),
    },
    {
      render: () => (
        <div className="product-table__actions">
          <Button className="product-table__add-button" type="primary">
            <FiPlus color={COLORS.WHITE} size={16} />
          </Button>
          <PiDotsThreeCircle color={COLORS.GRAY_20} size={27} />
        </div>
      ),
    },
  ];

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  return (
    <>
      <ProductTableHeader onAddProduct={handleAddProductFinish} />
      <Table<ITableRowData>
        className="product-table"
        rowClassName="product-table__tr"
        size="large"
        columns={columns}
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange,
        }}
        loading={isLoading}
        rowHoverable={false}
        dataSource={pagedItems}
        pagination={false}
        onChange={handleTableChange}
      />
      <div className="product-table__footer">
        <Summary current={`${startIndex}-${endIndex}`} total={total} />
        <Pagination
          current={currentPage}
          pageSize={PAGE_SIZE}
          total={total}
          showSizeChanger={false}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};
