import { Typography, Avatar, Divider, List, Card, Skeleton } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { actions, useStore } from "../store";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Service from "../service";
function Delivery() {
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
          Đơn đã giao
        </Typography.Title>
      </Divider>
      <List
        dataSource={dataSource}
        renderItem={(item) => {
          return (
            <List.Item key={item._id}>
              <Skeleton loading={!item.delivered} active avatar>
                <Card
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.07)" }}
                  extra={<span>Tổng tiền : ${item.total} </span>}
                  title={
                    <span
                      className="IconDashBoardCard"
                      style={{
                        backgroundColor: "rgba(0,255,255,0.25)",
                        color: "purple",
                      }}
                    >
                      {item.userId.lastName}
                    </span>
                  }
                  description={item.userId.email}
                >
                  {item.products.map((pro) => (
                    <Card.Meta
                      style={{ paddingTop: 10 }}
                      avatar={<Avatar src={pro.productId.thumbnail} />}
                      title={
                            <span
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <small style={{ fontWeight: "bold" }}>
                                {pro.productId.title}
                              </small>
                              <small
                                style={{ display: "flex", flexDirection: "column" }}
                              >
                                <span>
                                  quantity: <strong>{pro.quantity}</strong>
                                </span>
                                <span className="text-success">
                                  price: $<strong>{pro.price}</strong>
                                </span>
                              </small>
                            </span>
                      }
                      description={pro.productId.description}
                    ></Card.Meta>
                  ))}
                </Card>
              </Skeleton>
            </List.Item>
          );
        }}
      />
    </div>
  );
}
export default Delivery;
