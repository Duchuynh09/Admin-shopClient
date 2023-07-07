import {
  CarOutlined,
  AppstoreOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
function SideMenu() {
  const location = useLocation();
  const [selectKey, setSelectKey] = useState("/");
  useEffect(() => {
    const pathName = location.pathname;
    setSelectKey(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="SideMenu col-2">
      <Menu
        className="SideMenuVertical"
        onClick={(item) => {
          navigate(item.key);
        }}
        selectedKeys={selectKey}
        items={[
          {
            label: "DashBroad",
            key: "/",
            icon: <AppstoreOutlined />,
          },
          {
            label: "Inventory",
            key: "/Inventory",
            icon: <ShopOutlined />,
          },
          {
            label: "Orders",
            key: "/Orders",
            icon: <ShoppingCartOutlined />,
          },
          {
            label: "Delivery",
            key: "/Delivery",
            icon: <CarOutlined />,
          },
          {
            label: "Customers",
            key: "/Customers",
            icon: <UserOutlined />,
          },
        ]}
      ></Menu>
    </div>
  );
}
export default SideMenu;
