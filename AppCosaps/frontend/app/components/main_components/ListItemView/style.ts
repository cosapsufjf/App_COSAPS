import { StyleSheet } from "react-native";
import { Colors } from "@/app/MainStyle";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  view_container: {
    flexDirection: "row",
    width: "100%",
  },
  view_item: {
    borderRadius: 30,
    padding: 10,
    margin:3,
    backgroundColor: Colors.Cor_2,
    width: "50%",
    height:"auto",
  },
  text: {
    fontSize: 18,
    fontWeight:"600"
  },
  img: {
    margin:0,
    width: "100%",
    height: "45%",
    borderRadius:30,
  }
});