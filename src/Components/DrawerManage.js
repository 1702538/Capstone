import React, { useRef } from "react";
import "antd/dist/antd.css";
import "../CustomCSS.css";
import { Drawer, Button, Col, Row } from "antd";
import DeviceManageForm from "./FormDeviceManage";

function ManageDrawer({
  manageDrawerStatus,
  manageDeviceDetails,
  closeMangeDeviceDrawer,
  deviceForm,
  updatedFormValues,
}) {
  return (
    <div>
      <Drawer
        title={
          <div>
            Home / <b>Manage Devices</b>
          </div>
        }
        style={{ color: "white" }}
        maskStyle={{
          color: "white",
        }}
        headerStyle={{
          backgroundColor: "#16151B",
          borderBottomWidth: 0,
        }}
        bodyStyle={{
          backgroundColor: "#16151B",
          color: "white",
        }}
        width={"500px"}
        placement="right"
        closable={true}
        mask={false}
        keyboard={true}
        visible={manageDrawerStatus}
        onClose={closeMangeDeviceDrawer}
      >
        <div>
          <h2 className="manage-device-drawer-title">
            Edit Device Information ({manageDeviceDetails.id})
          </h2>
          <br />
          <DeviceManageForm
            manageDeviceDetails={manageDeviceDetails}
            deviceForm={deviceForm}
            updatedFormValues={updatedFormValues}
          />
        </div>
      </Drawer>
    </div>
  );
}

export default ManageDrawer;
