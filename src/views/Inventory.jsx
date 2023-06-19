import { Divider, Rate, Space, Table, Typography } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import Avatar from "antd/es/avatar/avatar";
import ProductService from "../service";
import AppTable from "../component/AppTable";
function Inventory() {
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
        console.log(value);
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
      render: (value) => <span>{value} (sản phẩm)</span>,
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
      <Typography.Title level={3} className="text-center">
        <Divider>Inventory</Divider>
      </Typography.Title>
      <AppTable col={columns}></AppTable>
    </Space>
  );
}
export default Inventory;
