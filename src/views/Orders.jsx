import React from "react";
import AppTabs from "../component/AppTabs";
import { Typography, Avatar } from "antd";
function Orders() {
  const columns = [
    {
      title: "Xem trước",
      dataIndex: "productId",
      render: (value) => <Avatar src={value.thumbnail} />,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productId",
      render: (value) => {
        return value.title;
      },
    },
    {
      title: "Giá",
      dataIndex: "productId",
      render: (value) => <span>${value.price}</span>,
    },

    {
      title: "Hãng",
      dataIndex: "productId",
      render: (product) => {
        return product.brand;
      },
    },
    {
      title: "Loại",
      dataIndex: "productId",
      render: (product) => {
        return product.category;
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      render: (value) => <span>{value} (sản phẩm)</span>,
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      render: (val) => <span>${val}</span>,
    },
    {title:"Action",dataIndex:"operation",render:(_,record)=>{
      return <a href="">Xác nhận đơn hàng</a>
    }}
  ];
  return (
    <div direction="vertical">
      <Typography.Title level={3} className="text-center">
        Sản Phẩm order
      </Typography.Title>
      <AppTabs routeAPI="cart" columns={columns} />
    </div>
  );
}
export default Orders;
