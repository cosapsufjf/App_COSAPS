import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "@/app/MainStyle";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: Dimensions.get("window").width * 0.9,
    borderRadius: 25,
    justifyContent: "flex-start",
    backgroundColor: Colors.Cor_5,
    padding: "3%",
    margin:10,
  },
  side: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  text: {
    fontSize: 22,
    textAlign: "justify",
    color: "#fff",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: Colors.Cor_4,
    padding: "8%",
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  }
});

export default styles;