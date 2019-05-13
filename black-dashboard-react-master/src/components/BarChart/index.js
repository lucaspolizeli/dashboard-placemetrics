import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody, CardHeader, Col, CardTitle } from "reactstrap";
import { Bar } from "react-chartjs-2";
import optionsFromBarChart from "./options";

function BarChart({ title, icon, value, data, options, size, height }) {
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
            <Bar
              data={!data ? {} : data}
              height={height}
              options={!options ? optionsFromBarChart : options}
            />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
}

BarChart.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  height: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
  data: PropTypes.func,
  options: PropTypes.object,
  size: PropTypes.number.isRequired
};

export default BarChart;
