import React, { useEffect, useState } from "react";
import { Row } from "reactstrap";
import DynamicTable from "../components/DynamicTable";
import api from "./../services/api";
import CardToViewValue from "./../components/CardToViewValue";

function DataHistory() {
  const [dataFromService, setDataFromService] = useState([]);

  useEffect(() => {
    async function onLoad() {
      const responseFromAPI = await getDataFromService();
      setDataFromService(responseFromAPI);
    }

    onLoad();

    setInterval(() => {
      onLoad();
    }, 4000);
  }, []);

  async function getDataFromService() {
    const responseFromAPI = await api.get("/");
    if (responseFromAPI.status === 200) {
      return responseFromAPI.data.userData;
    }

    return [];
  }

  return (
    <>
      <div className="content">
        <Row>
          <CardToViewValue
            size={4}
            title="Quantidade de Envios"
            icon="tim-icons icon-cloud-download-93"
            value={dataFromService.length}
          />
          <DynamicTable
            size={12}
            title="Histórico de Envios"
            columnHeader={["Temperatura", "Umidade", "Data", "Hora"]}
            dataToTable={dataFromService}
          />
        </Row>
      </div>
    </>
  );
}

export default DataHistory;
