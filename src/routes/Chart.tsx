import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../api";
import ApenxChart from "react-apexcharts";
import { faBlackboard } from "@fortawesome/free-solid-svg-icons";
import { useRecoilValue } from "recoil";
import { isDark } from "../atoms";

interface ChartProps {
  coinId: string;
}

interface ChartCoin {
  time_open : number;
  time_close : number;
  open : string;
  high : string;
  low : string;
  close : string;
  volume : string;
  market_cap : number;
}

const Chart = ({ coinId }: ChartProps) => {
  const { isLoading, data } = useQuery<ChartCoin[]>(["chart", coinId], () =>
    fetchCoinHistory(coinId)
  );
  // console.log(data);

  const chartData = data?.map((value)=>({
    x : new Date(value.time_open),
    y : [value.open,value.high,value.low,value.close]
  }))

  const toggle = useRecoilValue(isDark)

  return (<div>
    {isLoading ? "Loading chart..." : (
      <ApenxChart
        type ="candlestick"
        series={[
          {
            name : "price",
            data : chartData 
          }
        ] as unknown as number[]
      }
        options = {{
          theme:{
            mode:toggle ? "dark":"light"
          },
          chart:{
            height: 400,
            width:500,
            background: "transparent",
            foreColor : "gray"
          },
          colors : ['#2E93fA'],
          title : {
            text : "CandleStick Chart",
            align : "left"
          },
          xaxis : {
            type : 'datetime'
          },
          yaxis : {
            tooltip:{
              enabled : true
            }
          },
        }}
      />
    )}
  </div>);
};

export default Chart;
