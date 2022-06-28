import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Drawer, Button, Col, Row } from "antd";
import DeviceCard from "./Card_Device";
import EmergingThreatsCard from "./CardEmergingThreats";
import StatsDevice from "./StatisticsDevice";
import ThreatsTable from "./TableThreats";

// Function to render the Drawer component to display the device information
function DeviceDrawer({
  deviceDetails,
  deviceDrawerStatus,
  closeDeviceDrawer,
  alertData,
  deviceConnected,
  setPopoverSelectedNode,
}) {
  return (
    <div>
      <Drawer
        title={
          <div>
            Home / <b>Device Statistics</b>
          </div>
        }
        style={{ color: "white" }}
        headerStyle={{
          backgroundColor: "#16151B",
          borderBlockColor: "#16151B",
        }}
        bodyStyle={{
          backgroundColor: "#16151B",
          color: "white",
        }}
        width={"650px"}
        placement="right"
        closable={true}
        mask={false}
        keyboard={true}
        visible={deviceDrawerStatus}
        onClose={closeDeviceDrawer}
      >
        <div>
          <Row gutter={25}>
            <Col span={12}>
              <DeviceCard
                deviceDetails={deviceDetails}
                deviceConnected={deviceConnected}
                setPopoverSelectedNode={setPopoverSelectedNode}
              />
            </Col>
            <Col span={12}>
              <EmergingThreatsCard alertData={alertData} />
            </Col>
          </Row>
        </div>
        <br />
        <StatsDevice deviceDetails={deviceDetails} />
        <br />
        <ThreatsTable alertData={alertData} deviceDetails={deviceDetails} />
      </Drawer>
    </div>
  );
}

export default DeviceDrawer;
