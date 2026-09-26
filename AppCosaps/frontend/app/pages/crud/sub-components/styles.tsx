import { StyleSheet } from "react-native";
import { Colors as colors } from "@/app/MainStyle";

const styles = StyleSheet.create({
  content: {
      backgroundColor: colors.Fundo_3,
      height: "90%",
      width: "100%",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingHorizontal: 20,
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
  },
  Inputs: {
      width: "100%",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "stretch",
      gap: 12,
  },
  forgotPassword: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0003c9ff",
    alignSelf: "center",
  },
  btn: {
    flex: 1,                
    height: 50,       
    backgroundColor: colors.Cor_4,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
  btnContainer: {
    marginTop: 30,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  passwordStrength: {
    alignSelf: "center",
    padding: 3,
    width: 150,
    height: 25,
    borderRadius: 5,
    backgroundColor: colors.Cor_6,
  },
});

export default styles;