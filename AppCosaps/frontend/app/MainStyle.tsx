import {DimensionValue, StyleSheet, Dimensions } from "react-native";

export const Colors = {
    Fundo_1: "#8d83b6",
    Fundo_2: "#9d82b5",
    Fundo_3: "#8d83b6",
    Fundo_Claro_1: "#f7f1f8",
    Fundo_Claro_2: "#f1f0f7",
    Cor_1: "#36397f",
    Cor_2: "#d3cded",
    Cor_4: "#4c3780",
    Cor_5: "#616280",
    Cor_6: "#beb5e5",
    Cor_7: "#37677f",
}

export const BaseStyles = StyleSheet.create({
  fullScreen: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  fullScreenContainer: {
    flex: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: Colors.Fundo_3,
  },
  fullScreenFlexContainer: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: Colors.Fundo_3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  column: {
    flexDirection: "column",
    alignItems: "center",
  },
  border_radius_medium: {
    borderRadius: 30,
  },
  border_radius_big: {
    borderRadius: 50,
  },
  centerContent: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  leftContent: {
    alignContent: "flex-start",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  whiteText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "sans-serif",
    fontWeight: "normal",
  },
  Pressable: {
    width: Dimensions.get("window").width * 0.45,
    height: Dimensions.get("window").height * 0.2,
    margin:10,
    borderRadius: 40,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});

type FlexDir = {
    row: "row",
    column: "column",
    column_reverse: "column-reverse",
    row_reverse: "row-reverse",
}

export const ContainerStyle = (
  backgroundColor?: string, dimensions?: { width?: number|DimensionValue; height?: number|DimensionValue, margin?: number|DimensionValue },
  flex?: number, direction?: FlexDir[keyof FlexDir],
) => StyleSheet.create({
  Container: {
    flex: flex ?? 0,
    width: dimensions?.width ?? "auto",
    height: dimensions?.height ?? "auto",
    margin: dimensions?.margin ?? undefined,
    backgroundColor: backgroundColor ?? undefined,
    flexDirection: direction,
  },
  full_sizes: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

});

export const BorderStyle = (
  border_radius?: number | DimensionValue,
  top_left?: number | DimensionValue, top_right?: number | DimensionValue,
    bottom_left?: number | DimensionValue, bottom_right?: number | DimensionValue,
) => StyleSheet.create({
    Borders: {
      borderRadius: border_radius ?? undefined,
      borderTopEndRadius: top_right ?? undefined,
      borderBottomEndRadius: bottom_right ?? undefined,
      borderTopStartRadius: top_left ?? undefined,
      borderBottomStartRadius: bottom_left ?? undefined,
    },
});

export const ContentAlignment = (
  
) => StyleSheet.create({
  center: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  left: {
    alignContent: "flex-start",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});

export const TextStyle = (
  color?: string,
  fontSize?: number,
  textAlign?: "left" | "center" | "right",
  fontFamily?: string,
  fontWeight?: "normal" | "bold",
) => StyleSheet.create({
  text: {
    color: color ?? "black",
    fontSize: fontSize ?? 16,
    textAlign: textAlign ?? "left",
    fontFamily: fontFamily ?? "sans-serif",
    fontWeight: fontWeight ?? "normal",
  },
});

export type MainStyleType = typeof ContainerStyle;