import { Card, Space, Popover } from "antd";

// Function to display the statistical data of devices
// deviceDetails - Contains the device statistical data
// deviceConnected - Contains the number of devices the node is connected to
function DeviceCard({
  deviceDetails,
  deviceConnected,
  setPopoverSelectedNode,
}) {
  return (
    <div>
      <Card
        headStyle={{
          color: "white",
          background: "#3E3D40",
        }}
        title={<div>Device Details</div>}
        style={{
          width: "100%",
          overflow: "hidden",
          color: "white",
          margin: "0 auto",
        }}
        bodyStyle={{ background: "#1F1E26" }}
      >
        <Space size={28}>
          <p>Device Name</p>{" "}
          <p>
            <b>{deviceDetails.name}</b>
          </p>
        </Space>
        <Space size={32}>
          <p>Device Type</p>{" "}
          <p>
            <b>{deviceDetails.type}</b>
          </p>
        </Space>
        <Space size={35}>
          <p>OS Version</p>{" "}
          <p>
            <b>{deviceDetails.os}</b>
          </p>
        </Space>
        <Space size={29}>
          <p>Mac Address</p>{" "}
          <p>
            <b>{deviceDetails.mac_addr}</b>
          </p>
        </Space>
        <Space size={18}>
          <p id="abc" style={{ whiteSpace: "nowrap" }}>
            Connected Device(s)
          </p>
          <Space size={9}>
            <Popover
              title={"Adjacent Device List"}
              placement={"bottomLeft"}
              content={
                deviceConnected.length > 0
                  ? deviceConnected.map((id) => (
                      <p>
                        <a
                          onClick={() => {
                            setPopoverSelectedNode({ id });
                          }}
                        >
                          {id}
                        </a>
                      </p>
                    ))
                  : null
              }
              trigger="hover"
            >
              <p>
                <b>
                  {deviceConnected.length > 0 ? deviceConnected.length : 0}{" "}
                  device(s)
                </b>
              </p>
            </Popover>
          </Space>
        </Space>
      </Card>
      <Card
        headStyle={{
          color: deviceDetails.status !== "Offline" ? "#16151b" : "white",
          textAlign: "center",
          background:
            deviceDetails.status === "Active"
              ? "#63D196"
              : deviceDetails.status === "Inactive"
              ? "#F9D14D"
              : "#F1544D",
        }}
        title={
          <div>
            {deviceDetails.status === "Active" ? (
              <b>CONNECTED DEVICE</b>
            ) : deviceDetails.status === "Inactive" ? (
              <b>INACTIVE DEVICE</b>
            ) : (
              <b>DEVICE IS OFFLINE</b>
            )}
          </div>
        }
        style={{
          width: "100%",
          overflow: "hidden",
          color: "white",
          margin: "0 auto",
        }}
        bodyStyle={{ background: "#16151b" }}
      ></Card>
    </div>
  );
}

export default DeviceCard;
