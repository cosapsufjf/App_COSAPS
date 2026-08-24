import { StyleSheet, Dimensions } from "react-native";
import { BaseStyles, Colors } from "@/app/MainStyle";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: Dimensions.get("window").width * 0.97,
    minHeight: Dimensions.get("window").height * 0.7,
    borderRadius: Dimensions.get("window").width * 0.1,
    backgroundColor: Colors.Fundo_1,
    alignItems: "center",
  },
  btn_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor:Colors.Fundo_Claro_1,
    width: Dimensions.get("window").width * 0.85,
    borderRadius: Dimensions.get("window").width * 0.1,
    marginTop: Dimensions.get("window").height * 0.02,
    padding: Dimensions.get("window").width * 0.01,
  },
  btn: {
    backgroundColor: Colors.Cor_6,
    padding: Dimensions.get("window").width * 0.03,
    borderRadius: Dimensions.get("window").width * 0.1,
  },
  text: {
    fontSize: Dimensions.get("window").width * 0.045,
  },
  title: {
    fontSize: Dimensions.get("window").width * 0.03,
    fontWeight:"bold"
  },
  icon: {
    width: Dimensions.get("window").width * 0.09,
    height: Dimensions.get("window").width * 0.09,
  },
  charts_container: {
    padding:"4%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor:Colors.Fundo_Claro_1,
    width: Dimensions.get("window").width * 0.95,
    minHeight: Dimensions.get("window").height * 0.6,
    borderRadius: Dimensions.get("window").width * 0.08,
    marginTop: Dimensions.get("window").height * 0.02,
  },
  chart: {
    marginBottom: Dimensions.get("window").height * 0.02,
    width: Dimensions.get("window").width * 0.8,
    backgroundColor: Colors.Cor_6,
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: Dimensions.get("window").width * 0.03,
  },
  log_data: {
    backgroundColor: Colors.Fundo_Claro_1,
    width: Dimensions.get("window").width * 0.85,
    minHeight: Dimensions.get("window").height * 0.5,
    borderRadius: Dimensions.get("window").width * 0.08,
    marginTop: Dimensions.get("window").height * 0.02,
    padding: Dimensions.get("window").width * 0.02,
  },
  scroll_input_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: Dimensions.get("window").width * 0.75,
    height: "20%",
    margin: Dimensions.get("window").width * 0.025,
  },
  inner_inputs: {
    backgroundColor:Colors.Cor_5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: Dimensions.get("window").width * 0.25,
    borderRadius: Dimensions.get("window").width * 0.01,
  },
  checkbox_container: {
    padding: Dimensions.get("window").width * 0.02,
    borderRadius: Dimensions.get("window").width * 0.08,
    width: Dimensions.get("window").width * 0.8,
    backgroundColor: Colors.Cor_2,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default styles;
