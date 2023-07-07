import { Space, Typography, Divider } from "antd";
import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  ShoppingCartOutlined,
  UserOutlined,
  ShopOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import DashBoardChart from "../component/Dashboard/DashBoardChart.jsx";
import Service from "../service";
import { RecentOrders } from "../component/RecentOrders.jsx";
import { DashBroadCard } from "../component/Dashboard/DashBroadCard.jsx";
import { useStore } from "../store/hooks.js";

function DashBroad() {
  // const [state,dispatch] = useStore()
  const [orders, setOrders] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [reveneu, setReveneu] = useState(0);
  const [dataSource, setDataSource] = useState([]);
  const carts = useRef([]);
  const getStock = (products) => {
    const totalStock = products
      .map((p) => p.stock)
      .reduce((acc, next) => acc + next);
    return totalStock;
  };
  const getOrder = () => {
    return carts.current.length > 0
      ? carts.current
          .map((cart) => {
            return cart.delivered
              ? cart.products
                  .map((pro) => pro.quantity)
                  .reduce((acc, next) => acc + next)
              : 0;
          })
          .reduce((acc, next) => acc + next)
      : 0;
  };
  const getRevenu = () => {
    return carts.current.length > 0
      ? carts.current
          .map((cart) => cart.total)
          .reduce((acc, next) => acc + next)
      : 0;
  };
  const API = useCallback(async () => {
    const productService = new Service("");
    const userService = new Service("users");
    const cartService = new Service("cart");
    // =======================
    const productsAPIData = await productService.getAll();
    carts.current = await cartService.getAll();

    // ================================
    setDataSource(carts.current.slice(-3));
    setOrders(getOrder());
    setReveneu(getRevenu());
    setInventory(getStock(productsAPIData));
    setCustomers((await userService.getAll()).length);
  }, []);

  useEffect(() => {
    API();
  }, [API]);
  const itemCards = [
    {
      title: "Sản Phẩm Orders",
      value: orders,
      icon: (
        <ShoppingCartOutlined
          className="IconDashBoardCard"
          style={{
            color: "green",
            backgroundColor: "rgba(0,255,0,0.25)",
          }}
        />
      ),
    },
    {
      title: "Người dùng",
      value: customers,
      icon: (
        <UserOutlined
          className="IconDashBoardCard"
          style={{
            color: "purple",
            backgroundColor: "rgba(0,255,255,0.25)",
          }}
        />
      ),
    },
    {
      title: "Sản phẩm tồn kho",
      value: inventory,
      icon: (
        <ShopOutlined
          className="IconDashBoardCard"
          style={{
            color: "green",
            backgroundColor: "rgba(0,255,0,0.25)",
          }}
        />
      ),
    },
    {
      title: "Doanh thu",
      value: reveneu,
      icon: (
        <DollarCircleOutlined
          className="IconDashBoardCard"
          style={{
            // wordBreak: "keep-all",
            color: "red",
            backgroundColor: "rgba(255,0,0,0.25)",
          }}
        />
      ),
    },
  ];
  return (
    <div>
      <Divider>
        <Typography.Title level={3} className="text-center">
          Dashboard
        </Typography.Title>
      </Divider>
      <div className="d-flex">
        {itemCards.map((item, index) => (
          <DashBroadCard {...item} keyData={index} key={index} />
        ))}
      </div>
      <Space>
        <RecentOrders dataSource={dataSource} />
        <DashBoardChart carts={carts.current} />
      </Space>
    </div>
  );
}
export default DashBroad;
