import { useEffect, useRef, useState } from "react";
import ReactECharts from "echarts-for-react";

interface ChartData {
  name: string;
  value: (string | number)[];
}

function Osmosis() {
  const [data, setData] = useState<ChartData[]>([]);
  const [showArea, setShowArea] = useState(false);
  const nowRef = useRef(new Date(1997, 9, 3));
  const valueRef = useRef(Math.random() * 1000);
  const oneDay = 24 * 3600 * 1000;

  const randomData = (): ChartData => {
    nowRef.current = new Date(+nowRef.current + oneDay);
    valueRef.current = valueRef.current + Math.random() * 21 - 10;
    return {
      name: nowRef.current.toString(),
      value: [
        [
          nowRef.current.getFullYear(),
          nowRef.current.getMonth() + 1,
          nowRef.current.getDate(),
        ].join("/"),
        Math.round(valueRef.current),
      ],
    };
  };

  useEffect(() => {
    const initialData: ChartData[] = [];
    for (let i = 0; i < 1000; i++) {
      initialData.push(randomData());
    }
    setData(initialData);

    const timer = setTimeout(() => {
      setShowArea(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const option = {
    tooltip: {
      trigger: "axis",
      formatter: (params: { name: string; value: (string | number)[] }[]) => {
        const param = params[0];
        const date = new Date(param.name);
        return `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()} : ${param.value[1]}`;
      },
      axisPointer: { animation: false },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "10%",
      top: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "time",
      splitLine: { show: false },
      axisLabel: {
        fontSize: 10,
        rotate: 45,
      },
    },
    yAxis: {
      type: "value",
      boundaryGap: [0, "100%"],
      splitLine: { show: false },
      axisLabel: {
        fontSize: 10,
      },
    },
    series: [
      {
        name: "Fake Data",
        type: "line",
        showSymbol: false,
        data,
        lineStyle: {
          width: 2,
        },
        animation: true,
        animationDuration: 1000,
        animationEasing: "linear",
        areaStyle: showArea
          ? {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#4375FF33",
                  },
                  {
                    offset: 1,
                    color: "#4375FF00",
                  },
                ],
              },
            }
          : undefined,
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      style={{ width: "100%", height: "100%" }}
      opts={{ renderer: "canvas" }}
      notMerge={true}
    />
  );
}

export default Osmosis;
