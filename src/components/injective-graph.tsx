import { useEffect, useMemo, useState } from "react";
import ReactECharts from "echarts-for-react";
import Papa from "papaparse";

type AnyRow = Record<string, any>;

function Injective() {
  const [rows, setRows] = useState<AnyRow[]>([]);
  const [showArea, setShowArea] = useState(false);

  useEffect(() => {
    const csvUrl = `${import.meta.env.BASE_URL}data/merged_injective.csv`;
    fetch(csvUrl)
      .then((r) => r.text())
      .then((csv) => {
        const parsed = Papa.parse<AnyRow>(csv, { header: true, skipEmptyLines: true });
        console.log("[Injective] headers:", Object.keys(parsed.data?.[0] ?? {}));
        console.log("[Injective] raw rows:", parsed.data.slice(0, 3));
        setRows(parsed.data);
        const t = setTimeout(() => setShowArea(true), 500);
        return () => clearTimeout(t);
      })
      .catch((e) => {
        console.error(e);
        alert("CSV 로드 실패: " + e.message);
      });
  }, []);

  const { activeSeries, priceSeries } = useMemo(() => {
    // key 정규화: 공백 제거, 소문자
    const normKey = (s: string) => s?.toString().trim().toLowerCase();

    const toNum = (v: any) => {
      if (v === null || v === undefined || v === "") return null;
      const n = Number(String(v).replace(/,/g, ""));
      return Number.isFinite(n) ? n : null;
    };

    const parseTs = (v: any) => {
      if (!v) return NaN;
      let s = String(v).trim();
      // 'YYYY-MM-DD hh:mm:ss' → 'YYYY-MM-DDThh:mm:ss'
      if (/^\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}(:\d{2})?$/.test(s)) {
        s = s.replace(" ", "T");
      }
      const t = Date.parse(s);
      if (!Number.isNaN(t)) return t;
      // 'YYYY-MM-DD' 만 온 경우 자정으로 보정 (로컬 기준)
      if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return Date.parse(s + "T00:00:00");
      return NaN;
    };

    const a: [number, number][] = [];
    const p: [number, number][] = [];

    for (const r of rows) {
      // 컬럼명 탐지 (대소문자/스네이크/카멜 혼용 방어)
      const keys = Object.keys(r);
      const keyMap: Record<string, string> = {};
      for (const k of keys) keyMap[normKey(k)] = k;

      const tsKey = keyMap["timestamp"];
      const activeKey =
        keyMap["activeaccountcount"] ??
        keyMap["active_accounts"] ??
        keyMap["activeaccountcount "]; // 혹시 공백
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

    console.log("[Injective] points:", { active: a.length, price: p.length });
    if (a.length === 0 && p.length === 0) {
      console.warn("데이터가 비어 있어요. CSV 컬럼명과 timestamp 포맷을 확인해 주세요.");
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

export default Injective;