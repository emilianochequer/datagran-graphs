import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  Container,
  Form,
  TextArea,
  Header,
  Button,
  Segment,
  Select,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import { readString } from "react-papaparse";

const Home = () => {
  const [chartOptions, setChartOptions] = useState({
    xAxis: {
      categories: [],
    },
    series: [],
    title: {
      text: "Line chart",
    },
  });
  const [csvContent, setCsvContent] = useState("");
  const [itemsAxisX, setItemsAxisX] = useState([]);
  const [itemsAxisY, setItemsAxisY] = useState([]);
  const [xAxisValue, setXAxisValue] = useState("");
  const [yAxisValue, setYAxisValue] = useState("");
  const handleContentCsv = (e) => setCsvContent(e.target.value);
  const processAxis = async () => {
    const { data } = readString(csvContent);
    const dataForAxis = data[0].map((result) => ({
      key: result,
      value: result,
      text: result,
    }));
    setItemsAxisX(dataForAxis);
    setItemsAxisY(dataForAxis);
  };

  const handleXAxisValue = (e, data) => {
    setXAxisValue(data.value);
  };

  const handleYAxisValue = (e, data) => {
    setYAxisValue(data.value);
  };

  const sleep = (time = 2500) => {
    return new Promise((r) => setTimeout(r, time));
  };

  const createChart = () => {
    const results = readString(csvContent, {
      delimiter: ",",
      header: true,
    });

    const categories = results.data.map((res) => res[xAxisValue]);
    const series = results.data.map((res) => Number(res[yAxisValue]));
    setChartOptions({
      ...chartOptions,
      xAxis: {
        categories: categories,
      },
      series: [{ data: series }],
    });
  };

  return (
    <Container>
      <Form>
        <Segment>
          <Header>CSV file content:</Header>
          <TextArea
            placeholder="csv content"
            onChange={handleContentCsv}
            rows={5}
          />
          <Button
            disabled={!csvContent}
            primary
            style={{ marginTop: 20 }}
            onClick={processAxis}
          >
            Process
          </Button>
        </Segment>
      </Form>

      {itemsAxisX.length > 0 && itemsAxisY.length > 0 && (
        <Segment style={{ display: "flex", flexDirection: "column" }}>
          <Header>Select X Axis:</Header>
          <Select
            placeholder="X Axis"
            options={itemsAxisX}
            onChange={handleXAxisValue}
          />
          <Header>Select Y Axis:</Header>
          <Select
            placeholder="Y Axis"
            options={itemsAxisY}
            onChange={handleYAxisValue}
          />
          <Button
            disabled={!csvContent}
            primary
            style={{ marginTop: 20, width: 100 }}
            onClick={createChart}
          >
            Apply
          </Button>
        </Segment>
      )}
      {chartOptions.xAxis.categories.length > 0 &&
        chartOptions.series.length > 0 && (
          <Segment>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          </Segment>
        )}
    </Container>
  );
};

export default Home;
