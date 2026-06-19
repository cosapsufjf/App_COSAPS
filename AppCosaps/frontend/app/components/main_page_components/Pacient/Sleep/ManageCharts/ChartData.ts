import ManageStorage from "@/app/conf/AsyncStorage";

//TODO: REIMPLEMENTAR A PARTIR DO BACKEND
export const getData =
  async (type: "SleepTime" | "SleepDuration", chartType: "bar" | "line", last_week: boolean = false) => {
  const StorageData = await ManageStorage.get_From_Async_Storage("sleep_log", true,);
  let data: any[] | null = orderData(StorageData)
  
  if (StorageData && Array.isArray(StorageData)) {
    if (last_week) {
      data = get_last_week(data);
    }
    
    console.log(data)
    if (data === null || data === undefined || data.length === 0) return null;
    
    if (chartType === "bar") {
      return data?.map((item: any) => ({
        value: item[type].hour,
        label: item.SleepDate,
        barWidth: 16,
        barBorderRadius: 4,
      }));
    } else {
      return data?.map((item: any) => ({
        value: parseInt(item[type].hour),
      }));
    }
  }
  return null;
};

const orderData = (StorageData: any[]) => {
  const ordered_month = StorageData.sort((a: any, b: any) => {
    return (a.SleepDate.localeCompare(b.SleepDate))
  });
  return ordered_month.sort((a: any, b: any) => {
    return (a.SleepDate.substring(2).localeCompare(b.SleepDate.substring(2)))
  })
};

const getFirstDayOfWeek = (date: Date = new Date()) => {
  const d = new Date(date);
  const day = d.getDay();
  const offset = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() - day + offset);
  return d;
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
  await setData();
};