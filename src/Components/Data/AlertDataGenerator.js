const { faker } = require("@faker-js/faker");
const fs = require("fs");
const path = require("path");

// Function to generate mock alert data for the alert_temp.JSON file
function GenerateMockDataAlert() {
  // Using fs, find and read the data from alert_temp.json
  let rawdata = fs.readFileSync(path.resolve(__dirname, "alert_temp.json"));
  // Store rawdata (as JSON) to alerts_data
  let alerts_data = JSON.parse(rawdata);

  // Array of threats_category
  var threat_category = ["Category A", "Category B", "Category C"];

  // Array of threat_name
  var threat_name = ["Threat Name A", "Threat Name B", "Threat Name C"];

  // Upon running this function, unshift (add to top of array) new threat alert
  alerts_data.unshift({
    timestamp: faker.time.recent(),
    source: "10.0.0.1",
    destination: "192.168.2.1",
    protocol: "TCP",
    application: "Remote/MSRDP/SSL",
    threat_category: threat_category[Math.floor(Math.random() * 3)],
    threat_name: threat_name[Math.floor(Math.random() * 3)],
  });

  // Once function is done, write the new data (+ existing data) to alert_temp.json
  fs.writeFileSync(
    path.resolve(__dirname, "alert_temp.json"),
    JSON.stringify(alerts_data, null, 2),
    "utf-8"
  );

  return { alerts: alerts_data };
}
module.exports = GenerateMockDataAlert;

//var employees = alerts;

//   var type = ["a", "b", "c"];

//   for (var id = 1; id <= 5; id++) {
//     employees.push({
//       timestamp: faker.time.recent(),
//       type: type[Math.floor(Math.random() * 3)],
//     });
//   }
