import {
  Badge,
  Drawer,
  Image,
  List,
  Avatar,
  Card,
  Space,
  Typography,
} from "antd";
import {
  BellFilled,
  UserOutlined,
  RightOutlined,
  MailOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useState, useEffect, useCallback } from "react";
import { actions, useStore } from "../../store";
import Service from "../../service";
function AppHeader() {
  const [state, dispatch] = useStore();
  const [orders, setOrders] = useState([...state.orders]);
  const [comments, setComments] = useState([]);
  const [notificationOpen, setnotificationOpen] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const API = useCallback(async () => {
    setOrders(await new Service("cart").getAll());
  }, []);
  useEffect(() => {
    API();
  }, [API]);
  const countOrder = () => {
    var count = orders
      .map((pro) => (!pro.order ? 1 : 0))
      .reduce((acc, next) => acc + next, 0);
    return count;
  };
  const exceptOrder = async (id,item) => {
    // await new Service("cart").update(id);
    dispatch(actions.setOrders(item));
    setOrders(await new Service("cart").getAll());
  };
  const renderItem = (dataSource) => {
    return (
      <List.Item
        key={dataSource.userId._id}
        // style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      ></List.Item>
    );
  };
  return (
    <div className="AppHeader">
      <Image></Image>
      <Typography.Title>Quản lí bán hàng</Typography.Title>
      <Space>
        <Badge count={comments.length} dot>
          <MailOutlined
            style={{ fontSize: 24 }}
            onClick={() => {
              setCommentsOpen(true);
            }}
          />
        </Badge>
        <Badge count={countOrder()}>
          <BellFilled
            onClick={() => {
              setnotificationOpen(true);
            }}
            style={{ fontSize: 24 }}
          />
        </Badge>
      </Space>

      <Drawer
        className=""
        title="Đơn hàng"
        open={notificationOpen}
        onClose={() => setnotificationOpen(false)}
        maskClosable
        closeIcon={<RightOutlined />}
      >
        <List
          dataSource={orders}
          renderItem={(item) => {
            return !item.order ? (
              <List.Item key={item._id}>
                <Card
                  actions={[
                    <EditOutlined
                      onClick={() => exceptOrder(item._id,item)}
                      className="btn btn-success text-white"
                    />,
                  ]}
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
              </List.Item>
            ) : null;
          }}
        />
      </Drawer>
      <Drawer
        title="Ý kiến phản hồi"
        open={commentsOpen}
        onClose={() => setCommentsOpen(false)}
        maskClosable
      ></Drawer>
    </div>
  );
}
export default AppHeader;
