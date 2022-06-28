import "antd/dist/antd.css";
import React from "react";
import { Layout, Button, Affix } from "antd";
import { ForceGraph3D } from "react-force-graph";
import DeviceDrawer from "../Components/DrawerDevice";
import NetworkDrawer from "../Components/DrawerNetwork";
import * as THREE from "three";
import networkData from "../Components/Data/network.json";
import device_data from "../Components/Data/device_data.json";
import relation_data from "../Components/Data/relation_data.json";

const groupByDeviceType = device_data.reduce((thisData, dev) => {
  thisData[dev.status] = thisData[dev.status] + 1 || 1;
  return thisData;
}, {});

function FocusGraph() {
  const fgRef = React.useRef;

  const handleClick = React.useCallback(
    (node) => {
      const distance = 40;
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

      fgRef.current.cameraPosition(
        { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
        node, // lookAt ({ x, y, z })
        3000 // camera transition duration (in ms)
      );
    },
    [fgRef]
  );
}

// ForceGraphComponent with React.memo implementation (Prevents unnecessary re-rendering)
const ForceGraphComponent = React.memo((props) => {
  console.log("Child rendered"); // For verification purposes
  console.log(device_data);

  // Layout to add margin left to the Networok Topology Graph
  return (
    <Layout style={{ marginLeft: 199 }}>
      <ForceGraph3D
        width={window.innerWidth - 200}
        graphData={{
          nodes: device_data,
          links: relation_data,
        }}
        onNodeRightClick={props.handleRightClick}
        // linkDirectionalParticles={1}
        // linkDirectionalParticleSpeed={0.01}
        onNodeHover={props.handleHover}
        onNodeDragEnd={(node) => {
          node.fx = node.x;
          node.fy = node.y;
          node.fz = node.z;
        }}
        nodeThreeObject={({ type }) => {
          let imgTexture = null;
          if (type === "DB") {
            imgTexture = new THREE.TextureLoader().load("assets/img_db.png");
          } else if (type === "PC") {
            imgTexture = new THREE.TextureLoader().load("assets/img_pc.png");
          } else if (type === "Router") {
            imgTexture = new THREE.TextureLoader().load(
              "assets/img_router.png"
            );
          }

          const material = new THREE.SpriteMaterial({ map: imgTexture });
          const sprite = new THREE.Sprite(material);
          sprite.scale.set(12, 12);

          return sprite;
        }}
      />
    </Layout>
  );
});

export default class AppNetworkTopology extends React.Component {
  // Initial state
  state = {
    deviceDrawerStatus: false,
    networkDrawerStatus: false,
    deviceDetailsObject: {},
    networkDetailObject: networkData[0],
    networkStatisticsObject: groupByDeviceType,
    networkDeviceCounter: device_data.length,
  };

  // shouldComponentUpdate = (nextProps, nextState) => {
  //   console.log(nextProps);
  //   console.log(nextState);
  //   return false;
  // };

  // On right-click on icon on network topology, the function will pass the object to handleRightClick()
  // This function wil then set the state of "deviceDrawerStatus" to "true"
  // This function will also set the state of "networkDrawerStatus" to false
  handleRightClick = (node) => {
    this.setState({
      deviceDetailsObject: node,
      deviceDrawerStatus: true,
      networkDrawerStatus: false,
    });
  };

  handleHover = (node) => {
    // console.log(this.state.deviceDetailsObject);
    if (node != null && node != this.state.deviceDetailsObject) {
      this.setState({
        deviceDetailsObject: node,
      });
    }
  };

  // This function set the state of "networkDrawerStatus" will be "true"
  // This function will also set the state of "deviceDrawerStatus" to false
  // This function will only be invoked when the "Show Network Statistics" button is pressed
  handleNetworkStatistcsButton = () => {
    this.setState({
      networkDrawerStatus: true,
      deviceDrawerStatus: false,
    });
  };

  // This function sets the state of "deviceDrawerStatus" to "false"
  // This funtion is passed to the child component "DeviceDrawer"
  // When clicking on the "X" symbol in "DeviceDrawer", this function will run
  closeDeviceDrawer = () => {
    this.setState({ deviceDrawerStatus: false });
  };

  // This function sets the state of "networkDrawerStatus" to "false"
  // This funtion is passed to the child component "NetworkDrawer"
  // When clicking on the "X" symbol in "NetworkDrawer", this function will run
  closeNetworkDrawer = () => {
    this.setState({ networkDrawerStatus: false });
  };

  render() {
    return (
      <div>
        <div
          id="tester"
          style={{
            padding: 10,
            position: "absolute",
            top: 10,
            left: 210,
            zIndex: 1,
            background: "white",
            height: 200,
            width: 200,
          }}
        >
          <p>IP: {this.state.deviceDetailsObject.id}</p>
          <p>Name: {this.state.deviceDetailsObject.name}</p>
          <p>Type: {this.state.deviceDetailsObject.type}</p>
          <p>OS: {this.state.deviceDetailsObject.os}</p>
          <p>Mac: {this.state.deviceDetailsObject.mac_addr}</p>
        </div>
        <Affix style={{ position: "absolute", top: 120, left: 10 }}>
          <Button type="primary" onClick={this.handleNetworkStatistcsButton}>
            Show Network Statistics
          </Button>
        </Affix>

        <NetworkDrawer
          networkDetailObject={this.state.networkDetailObject}
          networkDrawerStatus={this.state.networkDrawerStatus}
          networkStatisticsObject={this.state.networkStatisticsObject}
          networkDeviceCounter={this.state.networkDeviceCounter}
          closeNetworkDrawerFunction={this.closeNetworkDrawer}
        />
        <DeviceDrawer
          deviceDetails={this.state.deviceDetailsObject}
          deviceDrawerStatus={this.state.deviceDrawerStatus}
          closeDeviceDrawerFunction={this.closeDeviceDrawer}
        />
        <ForceGraphComponent
          style={{ zIndex: -1 }}
          handleRightClick={this.handleRightClick}
          handleHover={this.handleHover}
          handleClick={this.FocusGraph}
        />
      </div>
    );
  }
}

// handleClick = (node) => {
//   const getHostName = testingData.filter((thisDevice) =>
//     thisDevice.id.includes(node.id)
//   );
//   getHostName.map((deviceDetails) => {
//     // alert(deviceDetails.os);
//     this.setState({ deviceDetailsObject: deviceDetails });
//   });
// };

// import NetworkDrawer from "./Components/DrawerNetwork";

// function AppNetworkTopology() {
//   const [name] = useState("Tarun");

//   const handleClick = (node) => {
//     const getHostName = testingData.filter((thisDevice) =>
//       thisDevice.id.includes(node.id)
//     );
//     getHostName.map((deviceDetails) => {
//       alert(deviceDetails.os);
//       return <DeviceDrawer name={name} />;
//     });
//   };
//   return (
//     <div>
//       <DeviceDrawer />
//       <ForceGraph3D
//         graphData={{
//           nodes: [
//             {
//               id: "192.168.1.100",
//               name: "DB-01",
//               type: "DB",
//               value: "1",
//               os: "Linux",
//               mac_addr: "aa:aa:aa:aa:aa:aa",
//             },
//             {
//               id: "192.168.1.101",
//               name: "PC-01",
//               type: "PC",
//               value: "1",
//               mac_addr: "bb:bb:bb:bb:bb:bb",
//             },
//             {
//               id: "192.168.1.102",
//               name: "PC-02",
//               type: "PC",
//               value: "1",
//               mac_addr: "cc:cc:cc:cc:cc:cc",
//             },
//           ],
//           links: [
//             {
//               source: "192.168.1.100",
//               target: "192.168.1.101",
//             },
//             {
//               source: "192.168.1.101",
//               target: "192.168.1.102",
//             },
//             {
//               source: "192.168.1.100",
//               target: "192.168.1.102",
//             },
//           ],
//         }}
//         onNodeRightClick={handleClick}
//         linkDirectionalParticles={1}
//         linkDirectionalParticleSpeed={0.01}
//         onNodeDragEnd={(node) => {
//           node.fx = node.x;
//           node.fy = node.y;
//           node.fz = node.z;
//         }}
//         nodeThreeObject={({ type }) => {
//           let imgTexture = null;
//           if (type === "DB") {
//             imgTexture = new THREE.TextureLoader().load("assets/img_db.png");
//           } else if (type === "PC") {
//             imgTexture = new THREE.TextureLoader().load("assets/img_pc.png");
//           }

//           const material = new THREE.SpriteMaterial({ map: imgTexture });
//           const sprite = new THREE.Sprite(material);
//           sprite.scale.set(12, 12);

//           return sprite;
//         }}
//       />
//     </div>
//   );
// }

// export default AppNetworkTopology;
