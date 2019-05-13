import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody, CardHeader, Row, Col, CardTitle } from "reactstrap";
import { Line } from "react-chartjs-2";

function LineChart({ subtitle, title, size, dataToChart, options, height }) {
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
          <div>
            <Line
              height={height}
              data={!dataToChart ? {} : dataToChart}
              options={options}
            />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
}

LineChart.propTypes = {
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  data: PropTypes.object,
  options: PropTypes.object
};

export default LineChart;
