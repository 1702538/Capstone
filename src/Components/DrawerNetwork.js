import React, { useState } from "react";
import "antd/dist/antd.css";
import { Drawer, Button, Col, Row } from "antd";
import TestCard from "./Card";
import EmergingThreatsCard from "./CardEmergingThreats";
import StatisticsBoxes from "./Statistics";
import ThreatsTable from "./TableThreats";
import relation_data from "./Data/relation_data.json";

function NetworkDrawer({
  networkDetails,
  networkDrawerStatus,
  closeNetworkDrawer,
  groupByDevice,
  deviceCounter,
  alertData,
}) {
  let thisIsTest = [];
  for (let a = 0; a < relation_data.length; a++) {
    thisIsTest.push(relation_data[a]["source"]);
  }

  return (
    <div>
      <Drawer
        title={
          <div>
            Home / <b>Network Statistics</b>
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
        width={"650px"}
        placement="right"
        closable={true}
        mask={false}
        keyboard={true}
        visible={networkDrawerStatus}
        onClose={closeNetworkDrawer}
      >
        <div>
          <Row gutter={25}>
            <Col span={12}>
              <TestCard networkDetails={networkDetails} alertData={alertData} />
            </Col>
            <Col span={12}>
              <EmergingThreatsCard alertData={alertData} />
            </Col>
          </Row>
        </div>
        <br />
        <StatisticsBoxes
          networkDeviceCounter={deviceCounter}
          networkStatisticsObject={groupByDevice}
        />
        <br />
        <ThreatsTable alertData={alertData} />
      </Drawer>
    </div>
  );
}

export default NetworkDrawer;

// <div
//       style={{
//         display: "block",
//         width: 700,
//         padding: 30,
//       }}
//     >
//       <h4>Test Drawer</h4>
//       <Button
//         type="primary"
//         onClick={() => {
//           setVisible(true);
//         }}
//       >
//         Open Drawer
//       </Button>
//       <br />
//       <br />
//       <Button
//         type="primary"
//         onClick={() => {
//           setVisible(false);
//         }}
//       >
//         Close Drawer
//       </Button>
