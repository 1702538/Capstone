import "antd/dist/antd.css";
import "./index.css";
import React, { useState } from "react";
import { Form, Layout, Table, Space, Popconfirm } from "antd";

import ManageDrawer from "./Components/DrawerManage";
import device_data from "./Components/Data/device_data.json";

// Functional Component for Network Topology Graph Page UI
function AppManageDevice() {
  // UseState() functions for maintaining the states
  const [manageDrawerStatus, setManageDrawerStatus] = useState(false); // To open / close the Manage Device Drawer Component
  const [manageDeviceDetails, setManageDeviceDetails] = useState({}); // To store the device details for rendering
  const [thisDeviceData, updateDeviceTableData] = useState(device_data); // To maintain the state of the data (datasource) & update table data
  const [deviceForm] = Form.useForm(); // To declare the variable for the Form component

  // Declaring of columns for the Manage Device table
  const columns = [
    {
      title: "Action",
      key: "action",
      width: 150,
      render: (record) => (
        <Space size="middle">
          <a onClick={() => onEditClick(record)}>Edit</a>
          <Popconfirm
            title="Are you sure?"
            okText="Yes"
            cancelText="No"
            placement="bottom"
            onConfirm={() => deleteRow(record)}
          >
            <a>Remove</a>
          </Popconfirm>
        </Space>
      ),
    },
    {
      title: "IP Address",
      dataIndex: "id",
      key: "id",
      width: 150,
    },
    {
      title: "Hostname",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Device Type",
      dataIndex: "type",
      key: "type",
      width: 150,
    },
    {
      title: "OS Version",
      dataIndex: "os",
      key: "os",
      width: 150,
    },
    {
      title: "Mac Address",
      dataIndex: "mac_addr",
      key: "mac_addr",
      width: 150,
    },
    {
      title: "Ownership",
      dataIndex: "ownership",
      key: "ownership",
      width: 150,
    },
  ];

  // Function to pass the selected device details to the Manage Device Drawer Component
  // When user clicks on "Edit", two functions will run:
  // - openManageDrawerStatus - To open device drawer
  // - setManageDeviceDetails - Pass the record to FormDeviceMange page (for the Revert button)
  // - setFormValue - Directly update the values in the Form component
  const onEditClick = (record) => {
    openManageDrawerStatus();
    setManageDeviceDetails(record);
    setFormValues(record);
  };

  // Function to set the Manage Device Drawer's "visible" state to true
  const openManageDrawerStatus = () => {
    setManageDrawerStatus(true);
  };

  // Function to set the Manage Device Drawer's "visible" state to false
  const closeMangeDeviceDrawer = () => {
    setManageDrawerStatus(false);
  };

  // Function to set the values in the Form component (passed in from the state)
  const setFormValues = (record) => {
    deviceForm.setFieldsValue({
      hostname: record.name,
      device_type: record.type,
      os_version: record.os,
      mac_address: record.mac_addr,
      ownership: record.ownership,
    });
  };

  // To update the values in the table based on the new data
  const updatedFormValues = (updated) => {
    // Sample console log for verification only
    console.log(
      "Updated hostname to",
      updated.hostname,
      "where IP Address is",
      manageDeviceDetails.id
    );

    updateTableValues(updated);
  };

  // Function to update the table with the updated values from the user
  // This function iterate through all the rows in the data until it find the correct row
  function updateTableValues(updated) {
    for (var i = 0; i < thisDeviceData.length; i++) {
      if (thisDeviceData[i].id === manageDeviceDetails.id) {
        thisDeviceData[i].name = updated.hostname;
        thisDeviceData[i].type = updated.device_type;
        thisDeviceData[i].os = updated.os_version;
        thisDeviceData[i].mac_addr = updated.mac_address;
        thisDeviceData[i].ownership = updated.ownership;
        break;
      }
    }
    updateDeviceTableData([...thisDeviceData]);
    console.log("Table Updated:", thisDeviceData[i].name);
    console.log(thisDeviceData);
  }

  // Function to delete the record from the data
  // This function iterates through all the rows in the data until it finds the correct row
  function deleteRow(recordToDelete) {
    for (var i = 0; i < thisDeviceData.length; i++) {
      if (thisDeviceData[i].id === recordToDelete.id) {
        thisDeviceData.splice(i, 1);
        break;
      }
    }
    console.log(recordToDelete.id, "has been deleted");
    console.log(thisDeviceData);
    updateDeviceTableData([...thisDeviceData]);
  }

  return (
    <div>
      {/* Manage Device Drawer Component */}
      <ManageDrawer
        manageDrawerStatus={manageDrawerStatus}
        manageDeviceDetails={manageDeviceDetails}
        closeMangeDeviceDrawer={closeMangeDeviceDrawer}
        deviceForm={deviceForm}
        updatedFormValues={updatedFormValues}
      />
      {/* Manage Device Table Component */}
      <Layout style={{ marginLeft: 199 }}>
        <Table dataSource={[...thisDeviceData]} columns={columns} />
      </Layout>
    </div>
  );
}

export default AppManageDevice;
