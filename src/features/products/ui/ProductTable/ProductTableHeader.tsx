import type { FC } from "react";
import { useState } from "react";
import { Button } from "antd";
import { LuCirclePlus } from "react-icons/lu";
import { AddProductModal, type AddProductFormValues } from "./AddProductModal";
import "./ProductTableHeader.scss";

interface ProductTableHeaderProps {
  onAddProduct: (values: AddProductFormValues) => void;
}

export const ProductTableHeader: FC<ProductTableHeaderProps> = ({
  onAddProduct,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  const handleOpenAddModal = (): void => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = (): void => {
    setIsAddModalOpen(false);
  };

  const handleSubmit = (values: AddProductFormValues): void => {
    onAddProduct(values);
    handleCloseAddModal();
  };

  return (
    <>
      <div className="product-table-header">
        <div className="product-table-header__left">
          <div className="product-table-header__title">Все позиции</div>
        </div>
        <Button
          className="product-table-header__button-add"
          type="primary"
          size="large"
          icon={<LuCirclePlus size={18} />}
          onClick={handleOpenAddModal}
        >
          Добавить
        </Button>
      </div>
      <AddProductModal
        open={isAddModalOpen}
        onCancel={handleCloseAddModal}
        onSubmit={handleSubmit}
      />
    </>
  );
};

