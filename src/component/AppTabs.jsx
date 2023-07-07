import React, { useCallback, useEffect, useMemo, useState } from "react";
import Service from "../service";
import { Spin, Table, Tabs, Result, Card, Empty } from "antd";
import { actions, useStore } from "../store";
import { CarOutlined } from "@ant-design/icons";
// import { CheckCircleTwoTone}from '@ant-design/icons';
function AppTabs({ dataSource, columns, loading }) {
  // const [state, dispatch] = useStore();
  // const { orders } = state;
  // const [dataSource, setDataSource] = useState([]);
  // const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   async function getApi() {
  //     setLoading(true);
  //     const service = new Service("cart");
  //     const data = await service.getAll();
  //     setDataSource(data);
  //     dispatch(actions.setOrders(data));
  //   }
  //   getApi();
  //   setLoading(false);
  // }, [dispatch, orders]);
  return (
    <Tabs
      type="card"
      items={dataSource.map((record, index) => {
        return {
          label: <strong className="">{record.userId.lastName}</strong>,
          key: record._id,
          // !true == false , !flase == true
          children: !record.delivered ? (
            <Spin tip="Chờ duyệt ... " spinning={!record.order}>
              <Table
                pagination={false}
                rowKey={(record) => record._id}
                columns={columns}
                loading={loading}
                dataSource={record.products}
              />
            </Spin>
          ) : (
            <Spin tip="Đơn hàng đã giao ... " spinning={record.delivered}>
              <Table
                pagination={false}
                rowKey={(record) => record._id}
                columns={columns}
                loading={loading}
                dataSource={record.products}
              />
            </Spin>
          ),
        };
        // if (record.order) {
        //   return {
        //     label: <strong className="">{record.userId.lastName}</strong>,
        //     key: record._id,
        //     children: (
        //       <Table
        //         pagination={false}
        //         rowKey={(record) => record._id}
        //         columns={columns}
        //         loading={loading}
        //         dataSource={record.products}
        //       />
        //     ),
        //   };
        // }
      })}
    />
  );
}
export default AppTabs;
