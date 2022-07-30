import { useQuery } from "@tanstack/react-query";
// import { useParams } from "react-router-dom";
import { chartupdate } from "../api";

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery(["chart"], () => chartupdate(coinId));

  console.log(isLoading);
  console.log(data);

  return <h1>Chart</h1>;
}

export default Chart;
