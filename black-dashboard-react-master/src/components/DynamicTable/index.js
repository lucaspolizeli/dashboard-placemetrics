import React from "react";
import { Col, Card, CardHeader, CardTitle, CardBody, Table } from "reactstrap";
import PropTypes from "prop-types";

function DynamicTable({ dataToTable, size, title, columnHeader }) {
  //FIXME: Refactor to be full dynamic
  function renderRows() {
    if (!dataToTable || !dataToTable.lenght) return [];

    return dataToTable.map(currentData => (
      <tr>
        <td>{currentData.temperature}</td>
        <td>{currentData.humidity}</td>
        <td>{currentData.createdAt.split("T")[0]}</td>
        <td>{currentData.createdAt.split(".")[0]}</td>
      </tr>
    ));
  }

  function renderColumnHeader() {
    if (!columnHeader || !columnHeader.lenght) return [];

    return columnHeader.map(currentHeader => <th>{currentHeader}</th>);
  }

  return (
    <Col lg={size} md={size}>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">{title}</CardTitle>
        </CardHeader>
        <CardBody>
          <Table className="tablesorter" responsive>
            <thead className="text-primary">
              <tr>{renderColumnHeader()}</tr>
            </thead>
            <tbody>{renderRows()}</tbody>
          </Table>
        </CardBody>
      </Card>
    </Col>
  );
}

DynamicTable.propType = {
  size: PropTypes.number.isRequired,
  dataToTable: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  columnHeader: PropTypes.array.isRequired
};

export default DynamicTable;
