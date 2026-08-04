import { View, Text, ScrollView, Image } from "react-native";
import { useState, useMemo } from "react";
import { useSleepData } from "./hooks/useSleepData";
import Chart, { ChartType } from "./Chart";
import LogData from "./LogData/LogData";
import styles from "./styles";
import AddButton from "./Inputs/AddButton/AddButton";

const diasDaSemana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];
const horarios = ["20h","21h","22h","23h","00h","01h","02h","03h","04h","05h","06h"];

const NoData = () => (
  <View style={styles.chart}>
    <Text style={[styles.text, { textAlign: "justify" }]}>
      Ainda não há dados disponíveis. Tente adicionar registros!
    </Text>
    <Image source={require("@/assets/images/sleep.png")} style={styles.icon} />
  </View>
);

const SleepGraphs = () => {
  const [showLogData, setShowLogData] = useState(false);
  const { rawTime, rawDuration, weeklyTime, weeklyDuration, loading, error, refresh } = useSleepData();

  const dataDLW = useMemo(() => weeklyDuration, [weeklyDuration]);
  const dataTLW = useMemo(() => weeklyTime, [weeklyTime]);
  const dataDuration = useMemo(() => rawDuration, [rawDuration]);
  const dataTime = useMemo(() => rawTime, [rawTime]);

  if (loading) {
    return <View><Text>Carregando...</Text></View>;
  }

  if (error) {
    return <View><Text>Erro: {error.message}</Text></View>;
  }


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.charts_container}>
        <ChartSection title="Sono na última semana" data={dataDLW} type={ChartType.Bar} xAxisLabels={diasDaSemana} />
        <ChartSection title="Horário de dormir" data={dataTime} type={ChartType.Line} xAxisLabels={diasDaSemana} yAxisLabels={horarios} />
        <ChartSection title="Sono no ano" data={dataDuration} type={ChartType.Bar} xAxisLabels={diasDaSemana} />
      </ScrollView>
    </View>
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