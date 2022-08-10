import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../api";

interface ChartProps {
  coinId: string;
}

interface ChartCoin {
  close: string;
  high: string;
  low: string;
  market_cap: number;
  time_open: number;
  volume: string;
}

const Chart = ({ coinId }: ChartProps) => {
  const { isLoading, data } = useQuery<ChartCoin[]>(["chart", coinId], () =>
    fetchCoinHistory(coinId)
  );
  console.log(data);
  return <>{coinId}</>;
};

export default Chart;
