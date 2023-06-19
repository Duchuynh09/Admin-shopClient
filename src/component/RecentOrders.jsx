import { Table } from "antd";
import React from "react";
import {} from "../service";

export function RecentOrders({ dataSource }) {
  return (
    <Table
      rowKey={(record) => record._id}
      pagination={
        dataSource.length < 5
          ? false
          : { position: ["bottomLeft"], pageSize: 5 }
      }
      columns={[
        {
          title: "Người mua",
          dataIndex: "userId",
          render: (user) => <span>{user.lastName}</span>,
        },
        {
          title: "Sản phẩm",
          dataIndex: "products",
          render: (products) =>
            products.map((pro) => <p>{pro.productId.title}</p>),
        },
        {
          title: "Tổng tiền",
          dataIndex: "total",
          render: (value) => <span>${value}</span>,
        },
      ]}
      bordered
      loading={dataSource ? false : true}
      dataSource={dataSource}
    />
  );
}
