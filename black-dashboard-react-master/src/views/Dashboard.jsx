import React from "react";
import { Row } from "reactstrap";
import CardToViewValue from "./../components/CardToViewValue";
import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import DynamicTable from "../components/DynamicTable";

function Dashboard() {
  return (
    <>
      <div className="content">
        <Row>
          {/* Actual Temperature */}
          <CardToViewValue />
          {/* Actual Humidity */}
          <CardToViewValue />
          {/* Users Online */}
          <CardToViewValue />
        </Row>
        <Row>
          {/* Temperature And Humidity Per Time */}
          <LineChart />
        </Row>
        <Row>
          {/* Max Temperature And Humidity Per Day */}
          <BarChart />
          {/* Requests Per Day */}
          <LineChart size={6} />
        </Row>
        <Row>
          {/* This not will be here */}
          <DynamicTable />
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
