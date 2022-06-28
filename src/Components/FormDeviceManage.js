import React from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Select } from "antd";
const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export default function DeviceManageForm({
  manageDeviceDetails,
  deviceForm,
  updatedFormValues,
}) {
  // When user save changes, run onFinish()
  const onFinish = (values) => {
    // console.log(values);
    localStorage.setItem("newUpdate", JSON.stringify(values));

    let storedData = localStorage.getItem("newUpdate");
    storedData = JSON.parse(storedData);
    console.log(storedData);

    // updatedFormValues passed the updated data back to the parent (ManageDevices)
    updatedFormValues(storedData);
  };

  // Function that will reset the values in the Form
  const resetFields = () => {
    deviceForm.setFieldsValue({
      hostname: manageDeviceDetails.name,
      device_type: manageDeviceDetails.type,
      os_version: manageDeviceDetails.os,
      mac_address: manageDeviceDetails.mac_addr,
      ownership: manageDeviceDetails.ownership,
    });
  };

  return (
    <div>
      <Form
        form={deviceForm}
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        initialValues={{
          hostname: manageDeviceDetails.name,
          device_type: manageDeviceDetails.type,
          os_version: manageDeviceDetails.os,
          mac_address: manageDeviceDetails.mac_addr,
          ownership: manageDeviceDetails.ownership,
        }}
      >
        {/* Form Item for Device IP*/}
        <Form.Item
          name="hostname"
          label="Hostname"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input></Input>
        </Form.Item>

        {/* Form Item for Device Type */}
        <Form.Item
          name="device_type"
          label="Device Type"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select>
            <Option value="PC">PC</Option>
            <Option value="Router">Router</Option>
            <Option value="Server">Server</Option>
          </Select>
        </Form.Item>

        {/* Form Item for OS Version*/}
        <Form.Item
          name="os_version"
          label="OS Version"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select>
            <Option value="Windows 11">Windows 11</Option>
            <Option value="Windows 10">Windows 10</Option>
            <Option value="Windows 7">Windows 7</Option>
            <Option value="MacOS">MacOS</Option>
            <Option value="Linux">Linux</Option>
            <Option value="Others">Others</Option>
          </Select>
        </Form.Item>

        {/* Form Item for Mac Address*/}
        <Form.Item
          name="mac_address"
          label="Mac Address"
          rules={[
            {
              required: true,
              min: 17,
              max: 17,
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Form Item for device ownership*/}
        <Form.Item
          name="ownership"
          label="Device Ownership"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select>
            <Option value="Corporate">Corporate</Option>
            <Option value="Personal">Personal</Option>
          </Select>
        </Form.Item>

        {/* Form Item for device ownership*/}
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
          <Button
            htmlType="button"
            style={{
              margin: "0 8px",
            }}
            onClick={resetFields}
          >
            Revert
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

// Function to update the values in the Form
// const handleButton = () => {
//   deviceForm.setFieldsValue({
//     hostname: manageDeviceDetails.name,
//     device_type: manageDeviceDetails.type,
//     os_version: manageDeviceDetails.os,
//     mac_address: manageDeviceDetails.mac_addr,
//     ownership: manageDeviceDetails.ownership,
//   });
// };
