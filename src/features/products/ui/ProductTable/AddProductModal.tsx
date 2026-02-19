import type { FC } from "react";
import { Form, Input, InputNumber, Modal } from "antd";

export interface AddProductFormValues {
  title: string;
  price: number;
  brand: string;
  sku: string;
}

interface AddProductModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: AddProductFormValues) => void;
}

export const AddProductModal: FC<AddProductModalProps> = ({
  open,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm<AddProductFormValues>();

  const handleFinish = (values: AddProductFormValues) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Modal
      title="Добавить товар"
      open={open}
      onCancel={onCancel}
      onOk={() => {
        form.submit();
      }}
      okText="Сохранить"
      cancelText="Отмена"
    >
      <Form<AddProductFormValues>
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Наименование"
          name="title"
          rules={[{ required: true, message: "Введите наименование" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Цена"
          name="price"
          rules={[{ required: true, message: "Введите цену" }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={0}
            precision={2}
            decimalSeparator=","
          />
        </Form.Item>
        <Form.Item
          label="Вендор"
          name="brand"
          rules={[{ required: true, message: "Введите вендора" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Артикул"
          name="sku"
          rules={[{ required: true, message: "Введите артикул" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

