import { StyleSheet } from "react-native";
import { BaseStyles, Colors } from "@/app/MainStyle";

const styles = StyleSheet.create({
  container:{
      backgroundColor: Colors.Cor_2,
      ...BaseStyles.column,
      ...BaseStyles.centerContent,
    margin: 0,
    height: "100%",
    justifyContent: "flex-start",
  },
  diet_container:{
    backgroundColor: Colors.Cor_2,
    ...BaseStyles.column,
    ...BaseStyles.centerContent,
    margin:0
  },
  Section: {
    fontSize: 35,
    fontWeight: "bold",
  }
});

export default styles;