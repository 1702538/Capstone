import { Statistic, Card, Row, Col } from "antd";
import "../CustomCSS.css";
import moment from "moment";
function StatisticsBoxes({ deviceDetails }) {
  return (
    <div className="site-statistic-demo-card">
      <Row gutter={25}>
        <Col span={6}>
          <Card bodyStyle={{ background: "#1F1E26" }}>
            <Statistic
              title="IP Address"
              value={deviceDetails.id}
              valueStyle={{ color: "white", fontWeight: "bold" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bodyStyle={{ background: "#1F1E26" }}>
            <Statistic
              title="Subnet Mask"
              value={deviceDetails.subnet}
              valueStyle={{ fontWeight: "bold" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bodyStyle={{ background: "#1F1E26" }}>
            <Statistic
              title="Default Gateway"
              value={deviceDetails.gateway}
              valueStyle={{ fontWeight: "bold" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bodyStyle={{ background: "#1F1E26" }}>
            <Statistic
              title="Connected Since"
              value={moment(
                deviceDetails.connected_since,
                "HH:MM:SS"
              ).fromNow()}
              valueStyle={{ fontWeight: "bold" }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default StatisticsBoxes;
