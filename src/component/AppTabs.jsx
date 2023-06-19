import React, { useCallback, useEffect, useMemo, useState } from "react";
import Service from "../service";
import { Table, Tabs } from "antd";
import { useStore } from "../store";
function AppTabs({ routeAPI, columns }) {
  const [state,dispatch] = useStore()
  const {orders} = state
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  useMemo(()=>{
    setDataSource(orders)
    setLoading(false);
  },[orders])
  return (
    <Tabs
      items={dataSource.map((record, index) => {
        if (record) {
          return {
            label: <strong className="">{record.userId.lastName}</strong>,
            key: record._id,
            children: (
              <Table
                pagination={false}
                rowKey={(record) => record._id}
                columns={columns}
                loading={loading}
                dataSource={record.products}
              />
            ),
          };
        }
        return null;
      })}
    />
  );
}
export default AppTabs;
