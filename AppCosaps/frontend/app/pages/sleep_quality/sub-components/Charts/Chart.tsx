import { Dimensions } from "react-native";
import { BarChart, LineChart } from "react-native-gifted-charts";
import { Colors } from "@/app/MainStyle";
import { ChartType } from "@/app/enum/ChartType";

const Chart = ({ data, type, xAxisLabelTexts, yAxisLabelTexts }: ChartProps) => {
  const commonProps = {
    width: Dimensions.get("window").width * 0.6,
    data,
    frontColor: Colors.Cor_7,
    gradientColor: Colors.Cor_1,
    stepValue: 1,
    noOfSections: 10,
    showGradient: true,
    showLine: true,
    xAxisLabelTexts: xAxisLabelTexts ?? ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],
    yAxisLabelTexts: yAxisLabelTexts ?? [],
    spacing: 25,
    lineConfig: {
      color: Colors.Cor_2,
      thickness: 3,
      curved: true,
      hideDataPoints: true,
      shiftY: 10,
      initialSpacing: 15,
    },
  };

  switch (type) {
    case ChartType.Bar:
      return <BarChart {...commonProps} />;
    case ChartType.Line:
      return <LineChart {...commonProps} />;
    default:
      return null;
  }
};

export default Chart;
