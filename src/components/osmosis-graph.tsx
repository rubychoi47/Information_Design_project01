import { useEffect, useMemo, useState } from "react";
import ReactECharts from "echarts-for-react";
import Papa from "papaparse";
import * as echarts from "echarts";

type AnyRow = Record<string, any>;

function Osmosis() {
  const [rows, setRows] = useState<AnyRow[]>([]);
  const [showArea, setShowArea] = useState(false);

  useEffect(() => {
    const csvUrl = `${import.meta.env.BASE_URL}data/merged_osmosis.csv`;

    fetch(csvUrl, { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })
      .then((text) => {
        const parsed = Papa.parse<AnyRow>(text, {
          header: true,
          skipEmptyLines: true,
        });
        setRows(parsed.data);
        const t = setTimeout(() => setShowArea(true), 400);
        return () => clearTimeout(t);
      });
  }, []);

  const { activeSeries, priceSeries } = useMemo(() => {
    const normKey = (s: string) => s?.toString().trim().toLowerCase();

    const toNum = (v: any) => {
      if (v === null || v === undefined || v === "") return null;
      const n = Number(String(v).replace(/,/g, ""));
      return Number.isFinite(n) ? n : null;
    };

    const parseTs = (v: any) => {
      if (!v) return NaN;
      let s = String(v).trim();
      if (/^\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}(:\d{2})?$/.test(s))
        s = s.replace(" ", "T");
      const t = Date.parse(s);
      if (!Number.isNaN(t)) return t;
      if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return Date.parse(s + "T00:00:00");
      return NaN;
    };

    const a: [number, number][] = [];
    const p: [number, number][] = [];

    for (const r of rows) {
      const keyMap: Record<string, string> = {};
      for (const k of Object.keys(r)) keyMap[normKey(k)] = k;

      const tsKey = keyMap["timestamp"];
      const activeKey =
        keyMap["activeaccountcount"] ??
        keyMap["active_accounts"] ??
        keyMap["activeaccountcount "];
      const priceKey =
        keyMap["marketprice_scaled"] ??
        keyMap["marketprice scaled"] ??
        keyMap["market_price_scaled"];

      const t = parseTs(tsKey ? r[tsKey] : undefined);
      if (Number.isNaN(t)) continue;

      const active = activeKey ? toNum(r[activeKey]) : null;
      const price = priceKey ? toNum(r[priceKey]) : null;

      if (active !== null) a.push([t, active]);
      if (price !== null) p.push([t, price]);
    }

    a.sort((x, y) => x[0] - y[0]);
    p.sort((x, y) => x[0] - y[0]);

    return { activeSeries: a, priceSeries: p };
  }, [rows]);

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "line" },
      renderMode: "html",
      className: "chart-tooltip",
      confine: true, // (선택) 차트 영역 밖으로 안 나가게

      formatter: (items: any[]) => {
        // 1) 면(__fill) 시리즈 제외
        const rows = items.filter(
          (it) => !String(it.seriesName).includes("__fill")
        );

        // 2) 원하는 표시 이름(단위 포함)
        const labelMap: Record<string, string> = {
          activeAccountCount: "Active Account(계정수)",
          marketPrice_scaled: "Market Price(USD)",
        };

        // 3) 값 포맷터 (천단위 콤마)
        const fmt = (v: any) => {
          const n = Number(Array.isArray(v) ? v[1] : v);
          return Number.isFinite(n) ? n.toLocaleString() : v;
        };

        // 4) 출력 순서 고정 (Active → Market)
        const order = ["activeAccountCount", "marketPrice_scaled"];
        rows.sort(
          (a, b) =>
            order.indexOf(String(a.seriesName)) -
            order.indexOf(String(b.seriesName))
        );

        // 5) 두 줄 생성 (아이콘/마커 없음, 날짜 없음)
        const lines = rows.map((it) => {
          const key = String(it.seriesName);
          const label = labelMap[key] ?? key;
          const val = Array.isArray(it.data) ? it.data[1] : it.value ?? it.data;
          return `${label} ${fmt(val)}`;
        });

        return lines.join("<br/>");
      },
    },
    grid: {
      left: "5%",
      right: "4%",
      bottom: "10%",
      top: "6%",
      containLabel: false,
    },
    xAxis: {
      type: "time",
      splitLine: { show: false },
      axisLabel: { fontSize: 10, rotate: 45 },
    },
    yAxis: {
      type: "value",
      splitLine: { show: true },
      axisLabel: { fontSize: 10 },
    },
    legend: {
      top: 0,
      selector: false,
      data: ["activeAccountCount", "marketPrice_scaled"],
    },

    series: [
      {
        name: "activeAccountCount",
        type: "line",
        showSymbol: false,
        smooth: false,
        lineStyle: { width: 2, color: "#4C8BF5" },
        itemStyle: { color: "#4C8BF5" },
        data: activeSeries,
        emphasis: { focus: "series" },
        zlevel: 2, // 라인이 위
        animationDuration: 800,
        animationEasing: "linear",
        animationDelay: 0,
      },
      ...(showArea
        ? [
            {
              name: "activeAccountCount__fill",
              type: "line",
              showSymbol: false,
              smooth: false,
              lineStyle: { width: 0, color: "transparent" },
              data: activeSeries,
              silent: true,
              zlevel: 1,
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#4C8BF533" },
                  { offset: 1, color: "#4C8BF500" },
                ]),
              },
              animationDuration: 900,
              animationEasing: "elasticOut", // ← 살짝 스프링 느낌
              animationDelay: 600, // ← 라인보다 늦게 등장
            },
          ]
        : []),

      {
        name: "marketPrice_scaled",
        type: "line",
        showSymbol: false,
        smooth: false,
        lineStyle: { width: 2, color: "#47D1C6" },
        itemStyle: { color: "#47D1C6" },
        data: priceSeries,
        emphasis: { focus: "series" },
        zlevel: 2,
        animationDuration: 800,
        animationEasing: "linear",
        animationDelay: 0,
      },

      ...(showArea
        ? [
            {
              name: "marketPrice_scaled__fill",
              type: "line",
              showSymbol: false,
              smooth: false,
              lineStyle: { width: 0, color: "transparent" },
              data: priceSeries,
              silent: true,
              zlevel: 1,
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#47D1C633" },
                  { offset: 1, color: "#47D1C600" },
                ]),
              },
              animationDuration: 900,
              animationEasing: "elasticOut",
              animationDelay: 600,
            },
          ]
        : []),
    ],

    animation: true,
    animationDuration: 800,
    animationEasing: "linear",
    animationDurationUpdate: 600,
    animationEasingUpdate: "linear",
  };

  return (
    <ReactECharts
      option={option}
      style={{ width: "100%", height: "100%" }}
      opts={{ renderer: "canvas" }}
      notMerge
    />
  );
}

export default Osmosis;
