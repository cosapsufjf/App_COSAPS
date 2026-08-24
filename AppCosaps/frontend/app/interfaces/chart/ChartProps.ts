import { ChartType } from "@/app/enum/ChartType";
export interface ChartProps {
  data: any;
  type: ChartType;
  xAxisLabelTexts?: string[];
  yAxisLabelTexts?: string[];
  
}