import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Table, Tag, Space } from "antd";
import ManageDrawer from "../Components/DrawerManage";

const { Column, ColumnGroup } = Table;

const data = [
  {
    device_ip_addr: "192.168.1.100",
    mac_addr: "255.255.255.0",
    hostname: "PC-1001",
    device_type: ["workStation"],
    device_status: ["online"],
  },
  {
    device_ip_addr: "192.168.1.101",
    mac_addr: "255.255.255.0",
    hostname: "PC-1002",
    device_type: ["workStation"],
    device_status: ["offline"],
  },
  {
    device_ip_addr: "192.168.1.102",
    mac_addr: "255.255.255.0",
    hostname: "PC-1003",
    device_type: ["workStation"],
    device_status: ["online"],
  },
];

function Help() {
  return (
    <div style={{ width: 1000 }}>
      <ManageDrawer />
      <Table dataSource={data}>
        <Column
          title="IP Address"
          dataIndex="device_ip_addr"
          key="device_ip_addr"
        />
        <Column title="Mac Address" dataIndex="mac_addr" key="mac_addr" />
        <Column title="Hostname" dataIndex="hostname" key="hostname" />
        <Column
          title="Device Type"
          dataIndex="device_type"
          key="device_type"
          width={250}
          render={(tags) => (
            <>
              {tags.map((tag) => {
                let color = "geekblue";
                if (tag === "workStation") {
                  color = "volcano";
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          )}
        />
        <Column
          title="Device Status"
          dataIndex="device_status"
          key="device_status"
          width={120}
          render={(tags) => (
            <>
              {tags.map((tag) => {
                let color = "green";
                if (tag === "offline") {
                  color = "volcano";
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <a>Edit Device</a>
              <a>Remove</a>
            </Space>
          )}
        />
      </Table>
    </div>
  );
}

export default Help;
