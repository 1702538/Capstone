import { Statistic, Card, Row, Col } from "antd";
import "../CustomCSS.css";
function StatisticsBoxes({ networkDeviceCounter, networkStatisticsObject }) {
  return (
    <div className="site-statistic-demo-card">
      <Row gutter={25}>
        <Col span={6}>
          <Card bodyStyle={{ background: "#1F1E26" }}>
            <Statistic
              title="Total Devices"
              value={networkDeviceCounter}
              valueStyle={{
                color: "white",
                fontWeight: "bolder",
                fontSize: "18px",
              }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bodyStyle={{ background: "#1F1E26" }}>
            <Statistic
              title="Active Devices"
              value={JSON.stringify(networkStatisticsObject["Active"])}
              valueStyle={{
                color: "#45D5C9",
                fontWeight: "bolder",
                fontSize: "18px",
              }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bodyStyle={{ background: "#1F1E26" }}>
            <Statistic
              title="Inactive Devices"
              value={JSON.stringify(networkStatisticsObject["Inactive"])}
              valueStyle={{
                color: "#FFC130",
                fontWeight: "bolder",
                fontSize: "18px",
              }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bodyStyle={{ background: "#1F1E26" }}>
            <Statistic
              title="Offline Devices"
              value={JSON.stringify(networkStatisticsObject["Offline"])}
              valueStyle={{
                color: "#FA816E",
                fontWeight: "bolder",
                fontSize: "18px",
              }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default StatisticsBoxes;
