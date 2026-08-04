import ManageStorage from "@/app/conf/AsyncStorage";
import { ChartType } from "../Chart";

const CHART_TYPE_MAP: Record<ChartType, "bar" | "line"> = {
  [ChartType.Bar]: "bar",
  [ChartType.Line]: "line",
};

export const getData = async (
  type: "SleepTime" | "SleepDuration", 
  chartType: ChartType,
  lastWeek: boolean = false
) => {
  const storageData = await ManageStorage.get_From_Async_Storage("sleep_log", true);
  
  if (!storageData || !Array.isArray(storageData)) return null;

  const orderedData = orderData(storageData);
  const filteredData = lastWeek ? get_last_week(orderedData) : orderedData;

  if (filteredData.length === 0) return null;

  const chartTypeStr = CHART_TYPE_MAP[chartType];
  
  if (chartTypeStr === "bar") {
    return filteredData.map(item => ({
      value: item[type].hour,
      label: item.SleepDate,
      barWidth: 16,
      barBorderRadius: 4,
    }));
  } else {
    return filteredData.map(item => ({
      value: parseInt(item[type].hour),
    }));
  }
};

const orderData = (StorageData: any[]) => {
  const ordered_month = StorageData.sort((a: any, b: any) => {
    return (a.SleepDate.localeCompare(b.SleepDate))
  });
  return ordered_month.sort((a: any, b: any) => {
    return (a.SleepDate.substring(2).localeCompare(b.SleepDate.substring(2)))
  })
};

const get_last_week = (ordered: any[]) => {
  const current = new Date();
  return ordered.filter((item: any) => {
    const item_month = Number(item.SleepDate.substring(3, 5));
    const item_day = Number(item.SleepDate.substring(0, 2));

    const current_month = current.getMonth() + 1;
    const current_day = current.getDate();
    const calc = (Number(current_month*30 + current_day) - Number((item_month)*30 + item_day))
    console.log(calc)
    return calc <= 7 && calc >= 0;
  });
};

//TODO: REIMPLEMENTAR A PARTIR DO BACKEND
export const sendData = async (
  selectedDay: any,
  ValuesTime: any,
  ValuesDuration: any,
  reset_states: () => void,
  setData: () => void
) => {
  const StorageData = await ManageStorage.get_From_Async_Storage(
    "sleep_log",
    true,
  );

  if (!selectedDay) return;
  
  const newEntry = {
    SleepTime: ValuesTime,
    SleepDate: `${selectedDay.day.toString().padStart(2, "0")}/${selectedDay.month.toString().padStart(2, "0")}`,
    SleepDuration: ValuesDuration,
  };

  const updatedData =
    StorageData && Array.isArray(StorageData)
      ? [...StorageData, newEntry]
      : [newEntry];

  await ManageStorage.Save_In_Async_Storage(
    "sleep_log",
    JSON.stringify(updatedData),
  );
  
  reset_states();
  setData();
};