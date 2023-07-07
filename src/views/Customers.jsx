import { Divider, Table, Typography } from "antd";
import React, { useState, useEffect, useCallback } from "react";
import Service from "../service";
function Customers() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const API = useCallback(async () => {
    const userService = new Service("users");
    const users = await userService.getAll();
    setDataSource(users);
    setLoading(false);
  }, []);
  useEffect(() => {
    setLoading(true);
    API().catch(console.error());
  }, [API]);
  return (
    <div className="text-center">
      <Divider>
        <Typography.Title level={3}>Khách hàng</Typography.Title>
      </Divider>
      <Table
        pagination={
          dataSource.length < 5
            ? false
            : { position: ["bottomLeft"], pageSize: 5 }
        }
        columns={[
          { title: "Họ", dataIndex: "firstName" },
          { title: "Tên", dataIndex: "lastName" },
          {
            title: "Tuổi",
            dataIndex: "age",
            widthshouldCellUpdate: false,
            defaultSortOrder: "descend",
            sorter: (a, b) => a.age - b.age,
          },
          { title: "Giới tính", dataIndex: "gender" },
          { title: "SDT", dataIndex: "phone" },
          { title: "Email", dataIndex: "email" },
          { title: "Ngày sinh", dataIndex: "birthDate" },
        ]}
        loading={loading}
        dataSource={dataSource}
      ></Table>
    </div>
  );
}
export default Customers;
