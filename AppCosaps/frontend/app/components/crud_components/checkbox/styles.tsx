import { StyleSheet } from "react-native";
import colors from "@/app/conf/colors";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    margin: 0,
    position: "absolute",
    bottom: 100,
    left: 40,
  },
  checkbox: {
    borderColor: "#fff",
    borderWidth: 1,
    width: 30,
    height: 30,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxInner: {
    backgroundColor: colors.Cor_4,
    borderRadius:10,
    width: 25,
    height: 25,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    color: colors.Fundo_Claro_1,
  },
});

export default styles;
