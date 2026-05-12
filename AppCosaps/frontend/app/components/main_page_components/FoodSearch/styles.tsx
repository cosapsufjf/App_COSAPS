import { StyleSheet } from "react-native";
import colors from "@/app/conf/colors";

const styles = StyleSheet.create({
  list_item: {
    flexDirection: "column",
    justifyContent: "center",
    borderColor: colors.Cor_1,
    borderWidth: 1,
    borderRadius: 30,
    margin: 15,
    padding:15
  },
  item_description: {
    flex: 1,
    padding: 10,
    margin: 10,
    fontSize:18,
    width: "100%",
    justifyContent: "space-around",
  },
  item_properties: {
    flexDirection: "row",
  },
  propertie_container: {
    flex: 1,
    width: "100%",
    margin:10,
  },
  text_box: {
    padding: 5,
    margin: 3,
    fontSize: 18,
    backgroundColor: colors.Cor_6,
    borderRadius: 10,
    width: "100%",
  },
  propertie_text_box: {
    borderRadius: 25,
    textAlign: "center",
    fontSize: 25,
    width: "100%",
  },
  desc_item: {
    backgroundColor: colors.Fundo_2,
    borderRadius: 25,
    padding: 5,
    margin: 3,
    fontSize: 22,
    textAlign: "center",
    color:colors.Fundo_Claro_1
  },
});

export default styles;
