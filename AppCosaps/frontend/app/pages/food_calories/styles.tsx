import { StyleSheet } from "react-native";
import colors from "@/app/conf/colors";
const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.Cor_2,
        width:"100%",
        minHeight:"100%",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"flex-start",
        margin:0
    },
    Input_txt:{
        backgroundColor:"#fff",
        width:"100%",
        minHeight:50,
    },
  list_item_container: {
    backgroundColor: colors.Fundo_Claro_2,
    flexDirection: "column",
    padding: 10,
    borderRadius: 30,
    height: "50%",
    width: "85%",
    alignSelf: "center",
    margin:0
  },
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
    fontSize: 16,
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
    flex:1,
    padding: 5,
    margin: 3,
    fontSize:18,
    backgroundColor: colors.Cor_6,
    borderRadius: 10,
    width: "100%",

  }
})

export default styles;