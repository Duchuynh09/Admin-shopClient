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
  CheckOutlined,
} from "@ant-design/icons";
import { useState, useEffect, useCallback, useMemo } from "react";
import { actions, useStore } from "../../store";
import Service from "../../service";
function AppHeader() {
  const [state, dispatch] = useStore();
  const [carts, setCarts] = useState([]);
  const [comments, setComments] = useState([]);
  const [notificationOpen, setnotificationOpen] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  useEffect(() => {
    setCarts(state.orders);
  }, [state.orders]);
  const countOrder = () => {
    var count = carts
      .map((pro) => (!pro.order ? 1 : 0))
      .reduce((acc, next) => acc + next, 0);
    return count;
  };
  const exceptOrder = async (id) => {
    await new Service("cart").update(id);
    dispatch(actions.exceptOrder(state.orders));
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
          dataSource={carts}
          renderItem={(item) => {
            return !item.order ? (
              <List.Item key={item._id}>
                <Card
                  actions={[
                    <CheckOutlined 
                      onClick={() => exceptOrder(item._id)}
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
