import { View, Text, ScrollView, Image } from "react-native";
import { useMemo, useState } from "react";
import { useSleepData } from "../../../../hooks/sleepData/useSleepData";
import Chart  from "./Chart";
import { ChartType } from "@/app/enum/ChartType";
import styles from "../styles";
import { getData } from "@/app/hooks/sleepData/ChartData";
import ManageStorage from "@/app/conf/AsyncStorage";
const diasDaSemana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];

const NoData = () => (
  <View style={styles.chart}>
    <Text style={[styles.text, { textAlign: "justify" }]}>
      Ainda não há dados disponíveis. Tente adicionar registros!
    </Text>
    <Image source={require("@/assets/images/sleep.png")} style={styles.icon} />
  </View>
);

const mean_sleep = (data: number[]) => {
  return data.reduce((a, b) => Number(a) + Number(b), 0) / data.length;
}

const get_mean_sleep = async (week: boolean) => {
    let dmean = await ManageStorage.get_From_Async_Storage(week ? "dmeanlw" : "dmean");
    if (dmean) return Number(dmean);
    else
    {
      dmean = await getData("SleepDuration", ChartType.Bar, week, true).then(val => mean_sleep(val as number[]))
      await ManageStorage.Save_In_Async_Storage(week ? "dmeanlw" : "dmean", String(dmean));
      return dmean;
    }
}

const SleepGraphs = () => {
  const {weeklyDuration, rawDuration} = useSleepData();

  const dataDLW = useMemo(() => weeklyDuration, [weeklyDuration]);
  const [dataDMeanDLW, setDataDMeanDLW] = useState(get_mean_sleep(true));
  const [dataDMeanRaw, setDataDMeanRaw] = useState(get_mean_sleep(false));

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <ScrollView contentContainerStyle={styles.charts_container}>
        <ChartSection title="Sono na última semana" data={dataDLW} type={ChartType.Bar} xAxisLabels={diasDaSemana} />
        <Text style={styles.strong_txt}>Seu sono médio na última semana é de {dataDMeanDLW} Horas</Text>
        <ChartSection title="Sono ao longo do tempo" data={rawDuration} type={ChartType.Bar} xAxisLabels={diasDaSemana} />
        <Text style={styles.strong_txt}>Seu sono médio ao longo do tempo é de {dataDMeanRaw} Horas</Text>

      </ScrollView>
    </ScrollView>
  );
};

const ChartSection = ({ 
  title, 
  data, 
  type, 
  xAxisLabels, 
  yAxisLabels 
}: {
  title: string;
  data: any;
  type: ChartType;
  xAxisLabels?: string[];
  yAxisLabels?: string[];
}) => (
  <View style={styles.chart}>
    <Text style={styles.title}>{title}</Text>
    {data ? (
      <Chart data={data} type={type} xAxisLabelTexts={xAxisLabels} yAxisLabelTexts={yAxisLabels} />
    ) : (
      <NoData />
    )}
  </View>
);


export default SleepGraphs;