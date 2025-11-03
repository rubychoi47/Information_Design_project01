// src/components/osmosis-graph.tsx
import { useEffect, useMemo, useState } from "react";
import ReactECharts from "echarts-for-react";
import Papa from "papaparse";

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
        console.log("[Osmosis] headers:", Object.keys(parsed.data?.[0] ?? {}));
        console.log("[Osmosis] sample rows:", parsed.data.slice(0, 3));
        setRows(parsed.data);
        const t = setTimeout(() => setShowArea(true), 400);
        return () => clearTimeout(t);
      })
      .catch((e) => {
        console.error("[Osmosis CSV fetch error]", e);
        alert("Osmosis CSV를 불러오지 못했어요. 경로/BASE_URL을 확인해주세요.");
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
      // 'YYYY-MM-DD hh:mm:ss' → ISO 'YYYY-MM-DDThh:mm:ss'
      if (/^\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}(:\d{2})?$/.test(s)) s = s.replace(" ", "T");
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
      // active: 여러 표기 허용
      const activeKey =
        keyMap["activeaccountcount"] ??
        keyMap["active_accounts"] ??
        keyMap["activeaccountcount "];
      // price: 여러 표기 허용
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

    console.log("[Osmosis] points:", { active: a.length, price: p.length });
    if (a.length === 0 && p.length === 0) {
      console.warn("Osmosis 데이터가 비어 있어요. CSV 컬럼명과 timestamp 포맷을 확인해 주세요.");
    }

    return { activeSeries: a, priceSeries: p };
  }, [rows]);

  const option = {
    tooltip: { trigger: "axis", axisPointer: { type: "line" } },
    grid: { left: "3%", right: "4%", bottom: "10%", top: "6%", containLabel: true },
    xAxis: { type: "time", splitLine: { show: false }, axisLabel: { fontSize: 10, rotate: 45 } },
    yAxis: { type: "value", splitLine: { show: true }, axisLabel: { fontSize: 10 } },
    legend: { top: 0 },
    series: [
      {
        name: "activeAccountCount",
        type: "line",
        showSymbol: false,
        smooth: true,
        lineStyle: { width: 2 },
        data: activeSeries, // [ms, value]
        emphasis: { focus: "series" },
      },
      {
        name: "marketPrice_scaled",
        type: "line",
        showSymbol: false,
        smooth: true,
        lineStyle: { width: 2 },
        data: priceSeries, // [ms, value]
        emphasis: { focus: "series" },
        areaStyle: showArea ? { opacity: 0.15 } : undefined,
      },
    ],
    animation: true,
    animationDuration: 800,
    animationEasing: "linear",
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