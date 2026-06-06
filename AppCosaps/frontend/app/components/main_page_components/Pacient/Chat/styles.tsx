import { StyleSheet } from "react-native";
import { BaseStyles, Colors } from "@/app/MainStyle";


const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Cor_2,
    width: "100%",
    height: "100%",
  },
  messageContainer: {
    flexDirection: "row",
    marginBottom: 10,
    flexWrap: "wrap",
    padding: 10,
  },
  message: {
    backgroundColor: Colors.Fundo_Claro_2,
    padding: 10,
    borderRadius: 20,
    width: "50%",
  },
  text: {
    fontSize: 16,
    textAlign: "justify",
  }
});

export default styles;

