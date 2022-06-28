import "antd/dist/antd.css";
import { Layout, Button, Affix } from "antd";

import React, { useState, useRef, useCallback, useEffect } from "react";

import { ForceGraph3D } from "react-force-graph";
import * as THREE from "three";

import networkData from "./Components/Data/network.json";
import device_data from "./Components/Data/device_data.json";
import relation_data from "./Components/Data/relation_data.json";

import DeviceDrawer from "./Components/DrawerDevice";
import NetworkDrawer from "./Components/DrawerNetwork";

// Functional Component for Network Topology Graph Page UI
function AppNetworkTopology() {
  // UseState() functions for maintaining the states
  const [deviceDrawerStatus, setDeviceDrawerStatus] = useState(false); // To open / close the Device Drawer component
  const [networkDrawerStatus, setNetworkDrawerStatus] = useState(false); // To open / close the Network Drawer component
  const [networkDetails, setNetworkDetails] = useState({}); // To store / set the network details for rendering
  const [groupByDevice, setGroupByDevice] = useState(); // To store the number of devices by device type (for statistical boxes)
  const [deviceCounter, setDeviceCounter] = useState(); // To store the total number devices (for statistical boxes)
  const [hoverNode, setHoverNode] = useState(); // To store the details of the selected network node (Network Topology Graph)
  const [deviceConnected, setDeviceConnected] = useState({}); // To store the adjacent devices (after user click on the network node)
  const [alertData, setAlertData] = useState([]); // To store the alerts information
  const [popoverSelectedNode, setPopoverSelectedNode] = useState({}); // To store the selected network node (selected from popover)

  // Run functions onload (similar to componentDidMount)
  useEffect(() => {
    setGroupByDevice(groupByDeviceType()); // Counts the number of devices (sort by statuses). Stores output into groupByDevice (via setGroupByDevice)
    setDeviceCounter(device_data.length); // Store the number of devices (determined by length of device_data) into deviceCounter (via setDeviceCounter)
    setNetworkDetails(networkData[0]); // Store the network details (determined by networkData[0]) into networkDetails (via setNetworkDetails)
    getData(); // Retrieves alerts data from JSON Server and stores output into alertData (via setAlertData())
  }, []);

  // getData() function that utilises the fetch API to retrieve data from the JSON Server
  // After data is retrieved, data is stored in alertData (via setAlertData)
  const getData = async () => {
    await fetch("http://localhost:3001/alerts")
      .then((response) => response.json())
      .then((data) => setAlertData(data))
      .catch((err) => console.log(err));
  };

  // Function to set the Device Drawer's "visible" state to "true"
  const openDeviceDrawer = () => {
    setDeviceDrawerStatus(true);
  };

  // Function to set the Device Drawer's "visible" state to "false"
  const closeDeviceDrawer = () => {
    setDeviceDrawerStatus(false);
  };

  // Function to set the Network Drawer's "visible" state to "true"
  const openNetworkDrawer = () => {
    setNetworkDrawerStatus(true);
  };

  // Function to set the Network Drawer's "visible" state to "false"
  const closeNetworkDrawer = () => {
    setNetworkDrawerStatus(false);
  };

  // Function to open the Network Drawer Component and closes the Device Drawer Component
  // closeDeviceDrawer() - Closes the Device Drawer component
  // openNetworkDrawer() - Opens the Network Drawer Component
  const handleNetworkStatisticsButton = () => {
    closeDeviceDrawer();
    openNetworkDrawer();
  };

  // Function to sort the devices by statuses
  // Returns array containing the number of devices by statuses
  const groupByDeviceType = () => {
    let result = {};
    for (let i = 0; i < device_data.length; i++) {
      if (!result[device_data[i]["status"]]) {
        result[device_data[i]["status"]] = 0;
      }
      result[device_data[i]["status"]]++;
    }
    return result;
  };

  // Function that counts the number of adjacent devices connected to the selected network node
  const connectedDeviceCounter = (hoverNode) => {
    let connectedDeviceArray = [];

    for (let d = 0; d < relation_data.length; d++) {
      if (relation_data[d].source.id === hoverNode.id) {
        connectedDeviceArray.push(relation_data[d].target.id);
      }
      // else if (relation_data[d].target.id === hoverNode.id) {
      //   connectedDeviceArray.push(relation_data[d].source.id);
      // }
    }
    return connectedDeviceArray;
  };

  // graphUseRef hook to allow data persistence
  const graphUseRef = useRef();

  // Function to zoom towards the selected network node and opens Device Drawer Component
  // setHoverNode() - Store the selected node's details into the hoverNode (via setHoverNode())
  // openDeviceDrawer() - Opens the Device Drawer Component
  // closeNetworkDrawer() - Closes the Network Drawer Component
  const zoomInNode = useCallback(
    (node) => {
      setHoverNode(node);
      openDeviceDrawer();
      closeNetworkDrawer();
      setDeviceConnected(connectedDeviceCounter(node));

      //   // Camera distance of node
      //   const distance = 150;
      //   const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

      //   graphUseRef.current.cameraPosition(
      //     {
      //       x: node.x * distRatio,
      //       y: node.y * distRatio,
      //       z: node.z * distRatio,
      //     }, // new position
      //     node, // lookAt ({ x, y, z })
      //     1500 // ms transition duration
      //   );
      // },
    },
    [graphUseRef]
  );

  // Function that returns the "selected" PC icon based on status
  function selectedNodePC(hoverNode) {
    const iconList = {
      Active: "assets/online_pc_selected.png",
      Inactive: "assets/inactive_pc_selected.png",
      Offline: "assets/offline_pc_selected.png",
    };

    return iconList[hoverNode.status] ?? "NA";
  }

  // Function that returns the "selected" DB icon based on status
  function selectedNodeDB(hoverNode) {
    const iconList = {
      Active: "assets/online_db_selected.png",
      Inactive: "assets/inactive_db_selected.png",
      Offline: "assets/offline_db_selected.png",
    };

    return iconList[hoverNode.status] ?? "NA";
  }

  // Function that returns the "selected" router icon based on status
  function selectedNodeRouter(hoverNode) {
    const iconList = {
      Active: "assets/online_router_selected.png",
      Inactive: "assets/inactive_router_selected.png",
      Offline: "assets/offline_router_selected.png",
    };

    return iconList[hoverNode.status] ?? "NA";
  }

  // For updating of "selected" icons only
  // Function that runs the respective function (based on device type)
  // Returns icon URL based on device and status
  function selectedNodeDeviceType(hoverNode) {
    const deviceList = {
      DB: selectedNodeDB(hoverNode),
      PC: selectedNodePC(hoverNode),
      Router: selectedNodeRouter(hoverNode),
    };

    return deviceList[hoverNode.type];
  }

  // Function that returns the DB icon based on status
  function nodeDB(hoverNode) {
    const iconList = {
      Active: "assets/online_db.png",
      Inactive: "assets/inactive_db.png",
      Offline: "assets/offline_db.png",
    };

    return iconList[hoverNode.status] ?? "NA";
  }

  // Function that returns the PC icon based on status
  function nodePC(hoverNode) {
    const iconList = {
      Active: "assets/online_pc.png",
      Inactive: "assets/inactive_pc.png",
      Offline: "assets/offline_pc.png",
    };

    return iconList[hoverNode.status] ?? "NA";
  }

  // Function that returns the router icon based on status
  function nodeRouter(hoverNode) {
    const iconList = {
      Active: "assets/online_router.png",
      Inactive: "assets/inactive_router.png",
      Offline: "assets/offline_router.png",
    };

    return iconList[hoverNode.status] ?? "NA";
  }

  // For updating of "non-selected" icons only
  // Function that runs the respective function (based on device type)
  // Returns icon URL based on device and status
  function nodeDeviceType(hoverNode) {
    const deviceList = {
      DB: nodeDB(hoverNode),
      PC: nodePC(hoverNode),
      Router: nodeRouter(hoverNode),
    };

    return deviceList[hoverNode.type];
  }

  // Function that updates all the icons in the Network Topology Graph Component
  const updateNodeIcons = useCallback(
    (node) => {
      let imgTexture = null; // Resets the imgTexture (image used for icon design)

      // Update "selected" network node icon
      if (node === hoverNode)
        imgTexture = new THREE.TextureLoader().load(
          selectedNodeDeviceType(node)
        );
      // Update other network node icon (not "selected")
      else imgTexture = new THREE.TextureLoader().load(nodeDeviceType(node));

      // Rendering of the sprite via THREE
      const material = new THREE.SpriteMaterial({ map: imgTexture });
      const sprite = new THREE.Sprite(material);
      sprite.scale.set(12, 12);
      return sprite;
    },
    [hoverNode]
  );

  // UseEffect hook to listen to changes to popoverSelectedNode
  // The popoverSelectedNode variable is changed when user selects an IP address from the popover (Connected Devices List)
  useEffect(() => {
    if (popoverSelectedNode.id !== undefined) {
      var newSelectedNode = device_data.find(
        (el) => el.id === popoverSelectedNode.id
      );
      zoomInNode(newSelectedNode);
    }
  }, [popoverSelectedNode]);

  return (
    <div>
      <Layout>
        {/* Network Topology Graph Component */}
        <ForceGraph3D
          width={window.innerWidth}
          height={window.innerHeight - 1}
          ref={graphUseRef}
          graphData={{
            nodes: device_data,
            links: relation_data,
          }}
          nodeLabel={(node) =>
            `<div style="background: #1F1E26; padding: 5px 10px 8px 10px; border-radius: 10px; user-select: none">
            <span>Name: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>${node.name}</b></span><br/>
            <span>IP Addr: &nbsp;&nbsp;&nbsp;&nbsp;<b>${node.id}</b></span><br/>
            <span>Mac Addr: &nbsp;<b>${node.mac_addr}</b></span>
            </div>`
          }
          linkWidth={1}
          onNodeRightClick={zoomInNode}
          // onNodeHover={handleNodeHover}
          // linkDirectionalParticles={1}
          // linkDirectionalParticleSpeed={0.01}
          // onNodeHover={handleHover}
          // onNodeDragEnd={(node) => {
          //   node.fx = node.x;
          //   node.fy = node.y;
          //   node.fz = node.z;
          // }}
          nodeThreeObject={updateNodeIcons}
        />
      </Layout>
      {/* Show Network Statistics Button */}
      <Affix style={{ position: "absolute", top: 120, left: 10, zIndex: 1 }}>
        <Button type="primary" onClick={handleNetworkStatisticsButton}>
          Show Network Statistics
        </Button>
      </Affix>
      {/* Device Drawer Component */}
      <DeviceDrawer
        deviceDrawerStatus={deviceDrawerStatus}
        deviceDetails={hoverNode}
        closeDeviceDrawer={closeDeviceDrawer}
        alertData={alertData}
        deviceConnected={deviceConnected}
        setPopoverSelectedNode={setPopoverSelectedNode}
      />
      {/* Network Drawer Component */}
      <NetworkDrawer
        networkDrawerStatus={networkDrawerStatus}
        networkDetails={networkDetails}
        groupByDevice={groupByDevice}
        deviceCounter={deviceCounter}
        closeNetworkDrawer={closeNetworkDrawer}
        alertData={alertData}
      />
    </div>
  );
}

export default AppNetworkTopology;
