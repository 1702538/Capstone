import { Table } from "antd";

function ThreatsTable({ alertData, deviceDetails }) {
  var date;

  const month_array = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  if (deviceDetails !== undefined) {
    alertData = alertData.filter((record) =>
      record.destination.includes(deviceDetails.id)
    );
  }

  Object.keys(alertData).forEach((key) => {
    date = new Date(alertData[key]["timestamp"]);
    alertData[key]["timestamp"] =
      date.getDate() +
      " " +
      month_array[date.getMonth()] +
      " " +
      date.getFullYear() +
      " " +
      (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
      ":" +
      (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
      ":" +
      (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
  });

  return (
    <div>
      <h3 style={{ color: "white" }}>Detected Cyber Security Threats</h3>
      <Table
        dataSource={alertData}
        columns={columns}
        pagination={{
          defaultPageSize: 10,
        }}
      />
    </div>
  );
}

const dataSource = [];

const columns = [
  {
    title: "Timestamp",
    dataIndex: "timestamp",
    key: "timestamp",
    sorter: (a, b) => a.timestamp - b.timestamp,
  },
  {
    title: "Source",
    dataIndex: "source",
    key: "source",
  },
  {
    title: "Destination",
    dataIndex: "destination",
    key: "destination",
  },
  {
    title: "Threat Info",
    dataIndex: "threatinfo",
    render: (text, record) => (
      <span>
        <b>Threat Category: </b>
        {record.threat_category} <br />
        <b>Threat Name: </b>
        {record.threat_name} <br />
      </span>
    ),
    key: "threat",
    filters: [
      {
        text: "Policy Violation",
        value: "Policy Violation",
      },
      {
        text: "Suspicious",
        value: "Suspicious",
      },
    ],
    onFilter: (value, record) => record.threat_category.includes(value),
    filterMode: "tree",
    filterSearch: true,
  },
  // {
  //   title: "Threat Type",
  //   dataIndex: "threat",
  //   key: "threat",
  //   filters: [
  //     {
  //       text: "Trojan",
  //       value: "Trojan",
  //     },
  //     {
  //       text: "Rootkit",
  //       value: "Rootkit",
  //     },
  //   ],
  //   onFilter: (value, record) => record.threat.includes(value),
  //   filterMode: "tree",
  //   filterSearch: true,
  // },
];

export default ThreatsTable;
