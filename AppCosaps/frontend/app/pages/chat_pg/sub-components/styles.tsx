import { StyleSheet } from "react-native";
import { BaseStyles, Colors } from "@/app/MainStyle";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Cor_2,
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  messageTileContainer: {
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
  Tile: {
    backgroundColor: Colors.Fundo_Claro_1,
    margin: 8,
    padding:5,
    width: "95%",
    height: "10%",
    justifyContent: "space-between",
    flexDirection:"row",
  },
  cosaps_icon: {
    width: 50,
    height: 50,
  },
  emmet_cont: {
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
  },
  TileContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height:"100%"
  },
  big_text: {
    fontSize: 14,
    fontWeight: "bold",
    color:"black",
  },
  text_container: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-start",
    height: "100%",
  },
  small_text_container: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
  },
  small_text: {
    fontSize: 11,
    color:"gray"
  }
});

export default styles;