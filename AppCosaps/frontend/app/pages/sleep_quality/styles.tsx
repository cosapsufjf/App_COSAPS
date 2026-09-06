import { StyleSheet, Dimensions } from "react-native";
import { Colors, BaseStyles } from "@/app/MainStyle";


const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: Colors.Cor_2,
    ...BaseStyles.centerContent,
    justifyContent: "flex-start",
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
  text: {
    fontSize: Dimensions.get("window").width * 0.045,
  },
});
    
export default styles;