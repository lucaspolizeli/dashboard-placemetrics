import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody, CardHeader, Col, CardTitle } from "reactstrap";
import { Bar } from "react-chartjs-2";

function BarChart({ title, icon, value, dataToChart, options, size }) {
  return (
    <Col lg={size}>
      <Card className="card-chart">
        <CardHeader>
          <h5 className="card-category">{title}</h5>
          <CardTitle tag="h3">
            <i className={icon} /> {value}
          </CardTitle>
        </CardHeader>
        <CardBody>
          <div className="chart-area">
            <Bar data={dataToChart} options={options} />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
}

BarChart.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
  dataToChart: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  size: PropTypes.number.isRequired
};

export default BarChart;
