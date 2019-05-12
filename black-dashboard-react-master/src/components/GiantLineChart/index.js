import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody, CardHeader, Row, Col, CardTitle } from "reactstrap";
import { Line } from "react-chartjs-2";

function GiantLineChart({ subtitle, title, size, dataToChart, options }) {
  return (
    <Col xs={size}>
      <Card className="card-chart">
        <CardHeader>
          <Row>
            <Col className="text-left" sm="6">
              <h5 className="card-category">{subtitle}</h5>
              <CardTitle tag="h2">{title}</CardTitle>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <div className="chart-area">
            <Line data={dataToChart} options={options} />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
}

GiantLineChart.propTypes = {
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired
};

export default GiantLineChart;
