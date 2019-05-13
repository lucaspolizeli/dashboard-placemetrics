import React, { useEffect, useState } from "react";
import { Row } from "reactstrap";
import CardToViewValue from "./../components/CardToViewValue";
import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import api from "./../services/api";
import options from "../variables/options";

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

    lastTemperatures.reverse();
    lastHumidity.reverse();
    lastTimes.reverse();

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

  function renderDataToMaxTemperaturePerDay() {
    if (!dataFromService.length || !dataFromService) return {};

    let dayWithYourMaxTemperature = [];
    for (let i = 0; i < dataFromService.length; i++) {
      const currentData = dataFromService[i];

      const formattedCurrentData = currentData.createdAt
        .split("T")[0]
        .split("-");
      const formattedInStringCurrentData = `${formattedCurrentData[2]}/${
        formattedCurrentData[1]
      }`;
      const allTheDatesVerified = dayWithYourMaxTemperature.map(date => {
        return date.day;
      });

      if (!allTheDatesVerified.includes(formattedInStringCurrentData)) {
        let valuesWithSameDate = [];
        for (let i = 0; i < dataFromService.length; i++) {
          const currentDataToGetValuesWithSameDate = dataFromService[i];
          if (
            currentDataToGetValuesWithSameDate.createdAt.split("T")[0] ===
            currentData.createdAt.split("T")[0]
          ) {
            valuesWithSameDate.push(currentDataToGetValuesWithSameDate);
          }
        }

        let temperatures = [];
        for (let i = 0; i < valuesWithSameDate.length; i++) {
          const currentData = valuesWithSameDate[i];
          const currentDate = currentData.createdAt.split("T")[0];

          if (currentDate === valuesWithSameDate[0].createdAt.split("T")[0]) {
            temperatures.push(currentData.temperature);
          }
        }

        const maxTemperatureFromValuesWithSameDate = Math.max.apply(
          null,
          temperatures
        );

        const oneDateFromValuesWithSameDate = valuesWithSameDate[0].createdAt
          .split("T")[0]
          .split("-");

        const formattedOneDateFromValuesWithSameDate = `${
          oneDateFromValuesWithSameDate[2]
        }/${oneDateFromValuesWithSameDate[1]}`;

        dayWithYourMaxTemperature.push({
          day: formattedOneDateFromValuesWithSameDate,
          value: maxTemperatureFromValuesWithSameDate
        });
      }
    }

    let labelsToChart = [];
    let valuesToChart = [];
    for (let i = 0; i < dayWithYourMaxTemperature.length; i++) {
      const currentDayWIthYourMaxTemperature = dayWithYourMaxTemperature[i];
      if (i === 6) break;

      labelsToChart.push(currentDayWIthYourMaxTemperature.day);
      valuesToChart.push(currentDayWIthYourMaxTemperature.value);
    }

    labelsToChart = labelsToChart.reverse();
    valuesToChart = valuesToChart.reverse();

    const formattedJSON = {
      data: canvas => {
        let ctx = canvas.getContext("2d");

        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
        gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
        gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

        return {
          labels: labelsToChart,
          datasets: [
            {
              label: "Temperatura (\u00B0C)",
              fill: true,
              backgroundColor: gradientStroke,
              hoverBackgroundColor: gradientStroke,
              borderColor: "#d048b6",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: valuesToChart
            }
          ]
        };
      }
    };

    return formattedJSON;
  }

  function renderDataToMaxHumidityPerDay() {
    if (!dataFromService.length || !dataFromService) return {};

    let dayWithYourMaxHumidity = [];
    for (let i = 0; i < dataFromService.length; i++) {
      const currentData = dataFromService[i];

      const formattedCurrentData = currentData.createdAt
        .split("T")[0]
        .split("-");
      const formattedInStringCurrentData = `${formattedCurrentData[2]}/${
        formattedCurrentData[1]
      }`;
      const allTheDatesVerified = dayWithYourMaxHumidity.map(date => {
        return date.day;
      });

      if (!allTheDatesVerified.includes(formattedInStringCurrentData)) {
        let valuesWithSameDate = [];
        for (let i = 0; i < dataFromService.length; i++) {
          const currentDataToGetValuesWithSameDate = dataFromService[i];
          if (
            currentDataToGetValuesWithSameDate.createdAt.split("T")[0] ===
            currentData.createdAt.split("T")[0]
          ) {
            valuesWithSameDate.push(currentDataToGetValuesWithSameDate);
          }
        }

        let humidities = [];
        for (let i = 0; i < valuesWithSameDate.length; i++) {
          const currentData = valuesWithSameDate[i];
          const currentDate = currentData.createdAt.split("T")[0];

          if (currentDate === valuesWithSameDate[0].createdAt.split("T")[0]) {
            humidities.push(currentData.humidity);
          }
        }

        const maxHumiditiesFromValuesWithSameDate = Math.max.apply(
          null,
          humidities
        );

        const oneDateFromValuesWithSameDate = valuesWithSameDate[0].createdAt
          .split("T")[0]
          .split("-");

        const formattedOneDateFromValuesWithSameDate = `${
          oneDateFromValuesWithSameDate[2]
        }/${oneDateFromValuesWithSameDate[1]}`;

        dayWithYourMaxHumidity.push({
          day: formattedOneDateFromValuesWithSameDate,
          value: maxHumiditiesFromValuesWithSameDate
        });
      }
    }

    let labelsToChart = [];
    let valuesToChart = [];
    for (let i = 0; i < dayWithYourMaxHumidity.length; i++) {
      const currentDayWIthYourMaxTemperature = dayWithYourMaxHumidity[i];
      if (i === 6) break;

      labelsToChart.push(currentDayWIthYourMaxTemperature.day);
      valuesToChart.push(currentDayWIthYourMaxTemperature.value);
    }

    labelsToChart = labelsToChart.reverse();
    valuesToChart = valuesToChart.reverse();

    const formattedJSON = {
      data: canvas => {
        let ctx = canvas.getContext("2d");

        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
        gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
        gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

        return {
          labels: labelsToChart,
          datasets: [
            {
              label: "Umidade (%)",
              fill: true,
              backgroundColor: gradientStroke,
              hoverBackgroundColor: gradientStroke,
              borderColor: "red",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: valuesToChart
            }
          ]
        };
      }
    };

    return formattedJSON;
  }

  function getMaxTemperatureToday() {
    if (!dataFromService.length || !dataFromService) return 0;

    const currentDate = new Date();

    let temperatures = [];
    for (let i = 0; i < dataFromService.length; i++) {
      const currentData = dataFromService[i];
      const formattedDay = currentData.createdAt.split("T")[0].split("-")[2];
      const formattedMonth = currentData.createdAt.split("T")[0].split("-")[1];

      if (
        parseInt(formattedDay) === currentDate.getDate() &&
        parseInt(formattedMonth) === currentDate.getMonth() + 1
      ) {
        temperatures.push(currentData.temperature);
      }
    }

    const maxTemperature = Math.max.apply(null, temperatures);
    return maxTemperature === Infinity ? 0 : maxTemperature;
  }

  function getMaxHumidityToday() {
    if (!dataFromService.length || !dataFromService) return 0;

    const currentDate = new Date();

    let humidities = [];
    for (let i = 0; i < dataFromService.length; i++) {
      const currentData = dataFromService[i];
      const formattedDay = currentData.createdAt.split("T")[0].split("-")[2];
      const formattedMonth = currentData.createdAt.split("T")[0].split("-")[1];

      if (
        parseInt(formattedDay) === currentDate.getDate() &&
        parseInt(formattedMonth) === currentDate.getMonth() + 1
      ) {
        humidities.push(currentData.humidity);
      }
    }

    const maxHumidities = Math.max.apply(null, humidities);
    return maxHumidities === Infinity ? 0 : maxHumidities;
  }

  function getHowManyDataNODEMCUSent() {
    let dateAndYourRequests = [];
    for (let i = 0; i < dataFromService.length; i++) {
      const currentData = dataFromService[i];

      const formattedCurrentData = currentData.createdAt
        .split("T")[0]
        .split("-");
      const formattedInStringCurrentData = `${formattedCurrentData[2]}/${
        formattedCurrentData[1]
      }`;
      const allTheDatesVerified = dateAndYourRequests.map(date => {
        return date.day;
      });

      if (!allTheDatesVerified.includes(formattedInStringCurrentData)) {
        let valuesWithSameDate = [];
        for (let i = 0; i < dataFromService.length; i++) {
          const currentDataToGetValuesWithSameDate = dataFromService[i];
          if (
            currentDataToGetValuesWithSameDate.createdAt.split("T")[0] ===
            currentData.createdAt.split("T")[0]
          ) {
            valuesWithSameDate.push(currentDataToGetValuesWithSameDate);
          }
        }

        const oneDateFromValuesWithSameDate = valuesWithSameDate[0].createdAt
          .split("T")[0]
          .split("-");

        const formattedOneDateFromValuesWithSameDate = `${
          oneDateFromValuesWithSameDate[2]
        }/${oneDateFromValuesWithSameDate[1]}`;

        dateAndYourRequests.push({
          day: formattedOneDateFromValuesWithSameDate,
          value: valuesWithSameDate.length
        });

        dateAndYourRequests = dateAndYourRequests.reverse();
      }
    }

    let labelToChart = [];
    let requestsToChart = [];
    for (let i = 0; i < dateAndYourRequests.length; i++) {
      const currentDateAndRequestsByNode = dateAndYourRequests[i];
      if (i === 10) break;

      labelToChart.push(currentDateAndRequestsByNode.day);
      requestsToChart.push(currentDateAndRequestsByNode.value);
    }

    const formattedJSON = {
      data: canvas => {
        let ctx = canvas.getContext("2d");

        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
        gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
        gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

        return {
          labels: labelToChart,
          datasets: [
            {
              label: "Dados Enviados",
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
              data: requestsToChart
            }
          ]
        };
      }
    };

    return formattedJSON;
  }

  function getMaxSentsNodeMCUPErDay() {
    if (!dataFromService.length || !dataFromService) return 0;

    const currentDate = new Date();

    let requests = 0;
    for (let i = 0; i < dataFromService.length; i++) {
      const currentData = dataFromService[i];
      const formattedDay = currentData.createdAt.split("T")[0].split("-")[2];
      const formattedMonth = currentData.createdAt.split("T")[0].split("-")[1];

      if (
        parseInt(formattedDay) === currentDate.getDate() &&
        parseInt(formattedMonth) === currentDate.getMonth() + 1
      ) {
        requests++;
      }
    }

    return requests;
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
            icon="tim-icons icon-alert-circle-exc"
            title="Dados Enviados Hoje"
            value={getMaxSentsNodeMCUPErDay()}
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
          <BarChart
            title="Maior Temperatura do Dia"
            size={6}
            height={135}
            value={getMaxTemperatureToday()}
            data={renderDataToMaxTemperaturePerDay().data}
            icon="tim-icons icon-chart-bar-32"
          />
          <BarChart
            title="Maior Umidade do Dia"
            size={6}
            height={135}
            value={`${getMaxHumidityToday()}%`}
            data={renderDataToMaxHumidityPerDay().data}
            icon="tim-icons icon-chart-bar-32"
          />
        </Row>
        <Row>
          <LineChart
            title="Envios Hardware"
            subtitle="QUANTIDADE DE DADOS ENVIADOS POR DIA"
            size={12}
            height={80}
            option={options}
            dataToChart={getHowManyDataNODEMCUSent().data}
          />
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
