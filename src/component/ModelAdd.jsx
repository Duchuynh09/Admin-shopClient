import { Modal, Form, Input, Radio, InputNumber } from "antd";
// import { useEffect } from "react";
const ModelAdd = ({ state, openModel, onSave, onCancel }) => {
  const [form] = Form.useForm();
  const Items = [
    {
      name: "title",
      label: "Tên sản phẩm",
      rules: [
        {
          required: true,
          message: "Vui lòng không để trống",
        },
      ],
      children: <Input />,
    },
    {
      name: "price",
      label: "Giá sản phẩm",
      rules: [
        {
          required: true,
          message: "Vui lòng không để trống",
        },
      ],
      children: <InputNumber min={0} />,
    },
    {
      name: "discountPercentage",
      label: "Giá giảm còn",
      children: <InputNumber min={0} />,
    },
    {
      name: "brand",
      label: "Hãng sản phẩm",
      rules: [
        {
          required: true,
          message: "Vui lòng không để trống",
        },
      ],
      children: <Input placeholder="iphone,samsung..." />,
    },
    {
      name: "category",
      label: "Loại sản phẩm",
      rules: [
        {
          required: true,
          message: "Vui lòng không để trống",
        },
      ],
      children: <Input placeholder="smartphones,mens-watches..." />,
    },
    {
      name: "description",
      label: "Mô tả sản phẩm",
      children: <Input.TextArea />,
    },
  ];
  return (
    <Modal
      open={openModel}
      title="Thêm sản phẩm mới"
      okText="Thêm mới"
      cancelText="Đóng"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onSave(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        {Items.map((item) => (
          <Form.Item {...item}>{item.children}</Form.Item>
        ))}
      </Form>
    </Modal>
  );
};
export default ModelAdd;
