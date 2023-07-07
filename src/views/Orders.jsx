import AppTabs from "../component/AppTabs";
import { Typography, Avatar, Divider } from "antd";
import { FolderAddOutlined } from "@ant-design/icons";
import { actions, useStore } from "../store";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Service from "../service";

function Orders() {
  const [state, dispatch] = useStore();
  const { orders } = state;
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
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
  ];
  useEffect(() => {
    async function getApi() {
      setLoading(true);
      const service = new Service("cart");
      const data = await service.getAll();
      setDataSource(data);
      dispatch(actions.setOrders(data));
    }
    getApi();
    setLoading(false);
  }, [dispatch, orders]);

  return (
    <div direction="vertical">
      <Divider>
        <Typography.Title level={3} className="text-center">
          Sản Phẩm order
        </Typography.Title>
      </Divider>
      <AppTabs dataSource={dataSource} columns={columns} loading={loading} />
    </div>
  );
}
export default Orders;
