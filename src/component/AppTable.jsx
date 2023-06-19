import { Form, InputNumber, Input, Table, Typography } from "antd";
import { useState, useCallback, useEffect } from "react";
import {
  EditOutlined,
  RollbackOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import Service from "../service";
const AppTable = ({ col }) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [fitSizeInput, setFitSizeInput] = useState(false);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const API = useCallback(async () => {
    const service = new Service("");
    setDataSource(await service.getAll());
    setLoading(false);
  }, []);
  useEffect(() => {
    setLoading(true);
    API().catch(console.error());
  }, [API]);
  const isEditing = (record) => record._id === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record._id);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const save = async (key) => {
    try {
      const service = new Service("");
      const row = await form.validateFields();
      const newData = [...dataSource];
      const index = newData.findIndex((item) => key === item._id);
      if (index > -1) {
        const item = newData[index];
        // Cắt xong rùi gán lại chổ đó
        newData.splice(index, 1, {
          ...item,
          ...row,
        });

        console.log(
          await service.updata(key, {
            ...item,
            ...row,
          })
        );
        setDataSource(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setDataSource(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const columns = [
    ...col,
    {
      title: "operation",
      dataIndex: "operation",

      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <SaveOutlined
              className="text-success"
              onClick={() => save(record._id)}
              style={{
                marginRight: 8,
              }}
            />
            <RollbackOutlined className="text-muted" onClick={cancel} />
          </span>
        ) : (
          <EditOutlined
            className="text-warning"
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          />
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      if (!col.editable) {
        col.visible = true;
      }
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType:
          col.dataIndex === "price" || col.dataIndex === "stock"
            ? "number"
            : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        rowKey={(record) => record._id}
        loading={loading}
        components={{
          body: {
            cell: ({
              editing,
              dataIndex,
              title,
              inputType,
              record,
              index,
              children,
              ...restProps
            }) => {
              const inputNode =
                inputType === "number" ? (
                  <InputNumber />
                ) : (
                  <Input.TextArea autoSize={true} />
                );
              return (
                <td {...restProps}>
                  {editing ? (
                    <Form.Item
                      name={dataIndex}
                      style={{
                        margin: 0,
                      }}
                      rules={[
                        {
                          required: true,
                          message: `Please Input ${title}!`,
                        },
                      ]}
                    >
                      {inputNode}
                    </Form.Item>
                  ) : (
                    children
                  )}
                </td>
              );
            },
          },
        }}
        bordered
        dataSource={dataSource}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={
          dataSource.length < 5
            ? false
            : { position: ["bottomLeft"], pageSize: 5 }
        }
      />
    </Form>
  );
};
export default AppTable;
