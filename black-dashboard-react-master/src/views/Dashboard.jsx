import React, { useEffect, useState } from "react";
import { Row } from "reactstrap";
import CardToViewValue from "./../components/CardToViewValue";
import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import DynamicTable from "../components/DynamicTable";
import api from "./../services/api";
import options from "./../components/LineChart/options";

function Dashboard() {
  const [dataFromService, setDataFromService] = useState([]);

  useEffect(() => {
    async function onLoad() {
      const responseFromAPI = await getDataFromService();
      setDataFromService(responseFromAPI);
    }

    onLoad();

    setInterval(() => {
      onLoad();
    }, 10000);
  }, []);

  async function getDataFromService() {
    const responseFromAPI = await api.get("/");
    if (responseFromAPI.status === 200) {
      return responseFromAPI.data.userData;
    }

    return [];
  }

  function renderLastTemperatureValue() {
    if (!dataFromService.length || !dataFromService) return 0;

    const lastValue = dataFromService.length - 1;
    return dataFromService[lastValue].temperature;
  }

  function renderLastValueHumidity() {
    if (!dataFromService.length || !dataFromService) return 0;

    const lastValue = dataFromService.length - 1;
    return dataFromService[lastValue].humidity;
  }

  function renderDataToRealtimeLineChart() {
    if (!dataFromService.length || !dataFromService) return {};

    const newDataFromService = dataFromService.reverse();

    // formatted array to last time values
    let lastTimes = [];
    for (let i = 0; i < newDataFromService.length; i++) {
      if (i === 10) break;
      const currentData = newDataFromService[i];

      const removeDataFromCreatedAt = currentData.createdAt
        .split("T")[1]
        .split(":");

      const formattedHour = `${removeDataFromCreatedAt[0]}:${
        removeDataFromCreatedAt[1]
      }`;

      lastTimes.push(formattedHour);
    }

    // formatted array to last temperature values
    let lastTemperatures = [];
    for (let i = 0; i < newDataFromService.length; i++) {
      if (i === 10) break;
      const currentData = newDataFromService[i];
      lastTemperatures.push(currentData.temperature);
    }

    // formatted array to last humidity values
    let lastHumidity = [];
    for (let i = 0; i < newDataFromService.length; i++) {
      if (i === 10) break;
      const currentData = newDataFromService[i];
      lastHumidity.push(currentData.humidity);
    }

    const formattedJSON = {
      data: canvas => {
        let ctx = canvas.getContext("2d");

        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
        gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
        gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

        return {
          labels: lastTimes,
          datasets: [
            {
              label: "Temperatura (\u00B0C)",
              fill: true,
              backgroundColor: gradientStroke,
              borderColor: "#1f8ef1",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: "#1f8ef1",
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: "#1f8ef1",
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: lastTemperatures
            },
            {
              label: "Umidade (%)",
              fill: true,
              backgroundColor: gradientStroke,
              borderColor: "red",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: "red",
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: "red",
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: lastHumidity
            }
          ]
        };
      }
    };

    return formattedJSON;
  }

  return (
    <>
      <div className="content">
        <Row>
          <CardToViewValue
            size={4}
            title="Temperatura Atual"
            icon="tim-icons icon-cloud-download-93"
            value={`${renderLastTemperatureValue()} \u00B0C`}
          />
          <CardToViewValue
            size={4}
            icon="tim-icons icon-cloud-download-93"
            title="Umidade Atual"
            value={`${renderLastValueHumidity()}%`}
          />
          <CardToViewValue
            size={4}
            icon="tim-icons icon-single-02"
            title="Usuários no Local"
            value={0}
          />
        </Row>
        <Row>
          <LineChart
            title="Tempo Real"
            subtitle="TEMPERATURA E UMIDADE AO LONGO DO DIA"
            size={12}
            height={80}
            option={options}
            dataToChart={renderDataToRealtimeLineChart().data}
          />
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
