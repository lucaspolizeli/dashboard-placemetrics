import React from "react";
import PropTypes from "prop-types";
import { Card, Col, CardHeader, CardTitle } from "reactstrap";

function CardToViewValue({ size, title, value, icon }) {
  return (
    <Col xs={size}>
      <Card className="card-chart">
        <CardHeader>
          <h5 className="card-category">{title}</h5>
          <CardTitle tag="h3">
            <i className={icon} /> {value}
          </CardTitle>
        </CardHeader>
      </Card>
    </Col>
  );
}

CardToViewValue.propTypes = {
  size: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  icon: PropTypes.string.isRequired
};

export default CardToViewValue;
