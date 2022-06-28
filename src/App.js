import "antd/dist/antd.css";
import NetworkDrawer from "./Components/DrawerNetwork";
import NavigationMenu from "./Components/MenuNavigation";
import AppNetworkTopology from "./NetworkTopology";
import AppDeviceManager from "./ManageDevices";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <div>
          <NavigationMenu />
          <Routes>
            {/* <Route path="/" element={<NetworkDrawer />} /> */}
            <Route path="/" element={<AppNetworkTopology />} />
            <Route path="/manage" element={<AppDeviceManager />} />
          </Routes>
        </div>
      </Router>
      {/* <AppNetworkTopology /> */}
    </div>
  );
}

export default App;
