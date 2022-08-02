import { useQuery } from "@tanstack/react-query";
// import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IHistorical {
  close: string;
  high: string;
  low: string;
  market_cap: number;
  open: string;
  time_close: number;
  time_open: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );

  console.log(data);

  return <div>{isLoading ? "Loading chart..." : "Loading"}</div>;
}

export default Chart;
