import { Card, Table } from "antd";
// import alerts from "./Data/alert.json";

// var counter = alerts.reduce(function (prev, cur) {
//   if (prev.hasOwnProperty(cur.type)) prev[cur.type] += 1;
//   else prev[cur.type] = 1;

//   return prev;
// }, {});

// alert(JSON.stringify(groupByThreatCategory));

// for (const [key, value] of Object.entries(groupByThreatCategory)) {
//   console.log(`${key}: ${value}`);
// }

function EmergingThreatsCard({ alertData }) {
  // Group the alerts by their Threat Category (store in threat_counter)
  const groupByThreatCategory = () => {
    var threat_counter = {};
    for (var i = 0; i < alertData.length; i++) {
      if (!threat_counter[alertData[i]["threat_category"]]) {
        threat_counter[alertData[i]["threat_category"]] = 0;
      }
      threat_counter[alertData[i]["threat_category"]]++;
    }
    return threat_counter;
  };

  const columns = [
    {
      title: "Threat Category",
      dataIndex: "threat_category",
      key: "threat_category",
      sorter: (a, b) => a.threat_category.localeCompare(b.threat_category),
    },
    {
      title: "Frequency",
      dataIndex: "frequency",
      key: "frequency",
      sorter: (a, b) => a.frequency - b.frequency,
    },
  ];

  // Sort the groups (of Threat Category) by highest to lowest frequency (no. of occurances)
  const sortByFrequency = Object.entries(groupByThreatCategory())
    .sort(([, b], [, a]) => a - b) // Sort from highest to lowest
    .splice(0, 4); // Select the top four (frequency)

  // Add the key values using the result ofsortByFrequency for the dataSource in the table
  const dataToTable = (data) => {
    var result = [];
    for (var k in data)
      result.push({ threat_category: data[k][0], frequency: data[k][1] });
    return result;
  };

  return (
    <div>
      <Card
        headStyle={{
          color: "white",
          background: "#3E3D40",
        }}
        title="Emerging Threats"
        style={{
          width: "100%",
          overflow: "hidden",
          color: "white",
          margin: "0 auto",
        }}
        bodyStyle={{ background: "#1F1E26" }}
      >
        <Table
          dataSource={dataToTable(sortByFrequency)}
          rowKey={"123"}
          columns={columns}
          size="small"
          pagination={false}
        />
        <ul id="abcd"></ul>
      </Card>
    </div>
  );
}

export default EmergingThreatsCard;

// <div>
//   {alerts.map((threats, key) => {
//     return <p key={key}>{threats.threat_category}</p>;
//   })}
// </div>;

// const groupByThreatCategory1 = alerts.reduce((alertData, alertCounter) => {
//   alertData[alertCounter.threat_category] =
//     alertData[alertCounter.threat_category] + 1 || 1;
//   return alertData;
// }, {});

// {
//   Object.entries(sortByFrequency).map((entry) => {
//     return (
//       <p>
//         <span key={entry[0]}>{`${entry[1][0]}`}</span>{" "}
//         <span
//           style={{ position: "absolute", right: 30 }}
//         >{`${entry[1][1]}`}</span>
//         <br />
//       </p>
//     );
//   });
// }

// {
//   Object.entries(sortByFrequency).map((entry) => {
//     return (
//       <p>
//         <span>{`${entry[1][0]}`}</span>{" "}
//         <span
//           style={{ position: "absolute", right: 30 }}
//         >{`${entry[1][1]}`}</span>
//         <br />
//       </p>
//     );
//   });
// }
