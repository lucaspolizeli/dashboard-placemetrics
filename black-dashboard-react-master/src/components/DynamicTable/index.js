import React from "react";
import { Col, Card, CardHeader, CardTitle, CardBody, Table } from "reactstrap";
import PropTypes from "prop-types";

function DynamicTable({ dataToTable, size, title, columnHeader }) {
  //FIXME: Refactor to be full dynamic
  function renderRows() {
    let dataToTableInHTML = [];

    for (let i = 0; i < dataToTable.length; i++) {
      const currentData = dataToTable[i];
      if (i === 15) break;

      dataToTableInHTML.push(
        <tr key={i}>
          <td>{currentData.temperature}</td>
          <td>{currentData.humidity}</td>
          <td>{currentData.createdAt.split("T")[0]}</td>
          <td>{currentData.createdAt.split(".")[0].split("T")[1]}</td>
        </tr>
      );
    }

    return dataToTableInHTML.reverse();
  }

  function renderColumnHeader() {
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
