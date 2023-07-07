import { Divider, Rate, Result, Space, Button, Typography } from "antd";
import React, { useState } from "react";
import Avatar from "antd/es/avatar/avatar";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  WarningFilled,
} from "@ant-design/icons";
import AppTable from "../component/AppTable";
import ModelAdd from "../component/ModelAdd";
import Service from "../service";
function Inventory() {
  const [openModel, setOpenModel] = useState(false);
  const onSave = async (values) => {
    const service = new Service("");
    await service.create(values);
    setOpenModel(false);
  };
  const columns = [
    {
      title: "Xem trước",
      dataIndex: "thumbnail",
      render: (link) => <Avatar src={link} />,
    },
    {
      title: "Title",
      dataIndex: "title",
      editable: true,
      filterSearch: true,
      onFilter: (value, record) => {
        record.title.includes(value);
      },
    },
    {
      title: "Giá",
      dataIndex: "price",
      render: (value) => <span>${value}</span>,
      editable: true,
    },
    {
      title: "Còn",
      dataIndex: "stock",
      render: (value) => (
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          {value}
          {value > 40 ? (
            <CheckCircleFilled className="text-success" />
          ) : value > 10 ? (
            <WarningFilled className="text-warning" />
          ) : (
            <CloseCircleFilled className="text-danger" />
          )}
        </span>
      ),
      editable: true,
    },
    {
      title: "Đánh Giá",
      dataIndex: "rating",
      render: (value) => <Rate value={value} allowHalf disabled />,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      editable: true,
    },
    {
      title: "Loai",
      dataIndex: "category",
      editable: true,
    },
  ];
  return (
    <Space direction="vertical">
      <Divider>
        <Typography.Title level={3} className="text-center">
          Sản phẩm
        </Typography.Title>
      </Divider>
      <Button
        type="primary "
        onClick={() => {
          setOpenModel(true);
        }}
      >
        Thêm sản phẩm
      </Button>
      <ModelAdd
        openModel={openModel}
        onSave={onSave}
        onCancel={() => {
          setOpenModel(false);
        }}
      />
      <AppTable col={columns} addItem={openModel}></AppTable>
    </Space>
  );
}
export default Inventory;
