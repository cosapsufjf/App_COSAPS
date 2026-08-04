import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "@/app/MainStyle";

export const styles = StyleSheet.create({
  scroll_input_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: Dimensions.get("window").width * 0.75,
    height: Dimensions.get("window").height * 0.1,
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
  text: {
    fontSize: Dimensions.get("window").width * 0.045,
  },
  btn: {
    backgroundColor: Colors.Cor_6,
    padding: Dimensions.get("window").width * 0.03,
    borderRadius: Dimensions.get("window").width * 0.1,
  },
  icon: {
    width: Dimensions.get("window").width * 0.09,
    height: Dimensions.get("window").width * 0.09,
  },
});