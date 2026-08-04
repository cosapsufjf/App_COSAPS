import { useState, useEffect, useCallback } from "react";
import { getData } from "./ChartData";
import { ChartType } from "../Chart";

type RawData = Awaited<ReturnType<typeof getData>>;

interface UseSleepDataReturn {
  rawTime: RawData;
  rawDuration: RawData;
  weeklyTime: RawData;
  weeklyDuration: RawData;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<any>;
}

export const useSleepData: () => UseSleepDataReturn = () => {
  const [rawTime, setRawTime] = useState<RawData>(null);
  const [rawDuration, setRawDuration] = useState<RawData>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [res, setRes] = useState<{ time: RawData; duration: RawData; tlw: RawData; dlw: RawData } | null>(null);
  
  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [time, duration, tlw, dlw] = await Promise.all([
        getData("SleepTime", ChartType.Line),
        getData("SleepDuration", ChartType.Bar),
        getData("SleepTime", ChartType.Line, true),
        getData("SleepDuration", ChartType.Bar, true),
      ]);
      
      setRawTime(time);
      setRawDuration(duration);
      
      setRes({ time, duration, tlw, dlw });
      return { time, duration, tlw, dlw };
      
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Falha ao carregar dados"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    rawTime,
    rawDuration,
    weeklyTime: res?.tlw || null,
    weeklyDuration: res?.dlw || null,
    loading,
    error,
    refresh: fetchAll,
  };
}