import React from "react";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import { DesktopOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

class NavigationMenu extends React.Component {
  state = {
    current: "Home",
  };

  handleClick = (e) => {
    console.log("click ", e);
    this.setState({ current: e.key });
  };

  render() {
    const { current } = this.state;
    const { Sider } = Layout;
    return (
      <div style={{ position: "absolute", zIndex: 1 }}>
        <Layout hasSider>
          <Sider
            style={{
              overflow: "none",
              height: "100vh",
              position: "fixed",
              left: 0,
              top: 0,
              bottom: 0,
            }}
          >
            <Menu
              onClick={this.handleClick}
              defaultSelectedKeys={["network"]}
              // selectedKeys={[current]}
              mode="inline"
            >
              <Menu.Item key="network" icon={<DesktopOutlined />}>
                <Link to="/">
                  <span>Network Topology</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="manage" icon={<DesktopOutlined />}>
                <Link to="/manage">
                  <span>Manage Devices</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
        </Layout>
      </div>
    );
  }
}

export default NavigationMenu;
