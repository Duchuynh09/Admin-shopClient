import { Card, Space, Statistic } from "antd";
import React from "react";

export function DashBroadCard({ title, value, icon, keyData }) {
  return (
    <Card className="">
      <Space direction="horizontal">
        {icon}
        <Statistic
          title={title}
          value={keyData === 3 ? `$${value}` :   value }
        ></Statistic>
      </Space>
    </Card>
  );
}
