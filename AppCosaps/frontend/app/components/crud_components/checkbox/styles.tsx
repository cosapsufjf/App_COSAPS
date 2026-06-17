import { StyleSheet } from "react-native";
import { Colors as colors } from "../../../MainStyle";

const styles = (flex_dir: "row" | "column" = "row", txt_size: number = 18, size: number = 25, color: string = "#fff") => StyleSheet.create({
  container: {
    flexDirection: flex_dir,
    alignItems: "center",
  },
  checkbox: {
    borderColor: color,
    borderWidth: 1,
    width: size,
    height: size,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxInner: {
    backgroundColor: colors.Cor_4,
    borderRadius:10,
    width: size*0.8,
    height: size*0.8,
  },
  text: {
    fontSize: txt_size,
    fontWeight: "bold",
    marginLeft: 10,
    color: color ?? colors.Fundo_Claro_1,
  },
});

export default styles;
