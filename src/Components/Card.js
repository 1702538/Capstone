import { Card, Space } from "antd";

function TestCard({ networkDetails, alertData }) {
  return (
    <div>
      <Card
        headStyle={{
          color: "white",
          background: "#3E3D40",
        }}
        title={<p>Network Details</p>}
        style={{
          width: "100%",
          overflow: "hidden",
          color: "white",
          margin: "0 auto",
        }}
        bodyStyle={{ background: "#1F1E26", height: "176px" }}
      >
        <Space size={21}>
          <p>Network SSID</p>{" "}
          <p>
            <b>{networkDetails.ssid}</b>
          </p>
        </Space>
        <Space size={14}>
          <p>Default Gateway</p>{" "}
          <p>
            <b>{networkDetails.default_gateway}</b>
          </p>
        </Space>
        <Space size={16}>
          <p>Total Volume In</p>{" "}
          <p>
            <b>{networkDetails.volume_in}</b>
          </p>
        </Space>
        <Space size={11}>
          <p>Total Volume Out</p>{" "}
          <p>
            <b>{networkDetails.volume_out}</b>
          </p>
        </Space>
        <Space size={6}>
          <p>Total Threat Alert(s)</p>{" "}
          <p>
            <b>{alertData.length}</b>
          </p>
        </Space>
      </Card>
      <Card
        headStyle={{
          color: networkDetails.status !== "Offline" ? "#16151b" : "#ffffff",
          textAlign: "center",
          background:
            networkDetails.status === "Online" ? "#63D196" : "#F1544D",
        }}
        title={
          <div>
            {networkDetails.status === "Online" ? (
              <b>ACTIVE NETWORK</b>
            ) : (
              <b>OFFLINE NETWORK</b>
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

export default TestCard;
