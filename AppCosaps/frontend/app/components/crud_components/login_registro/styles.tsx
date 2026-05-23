import { StyleSheet } from "react-native"
import { BaseStyles, Colors as colors } from "@/app/MainStyle";

const styles = StyleSheet.create({
  content: {
        ...BaseStyles.centerContent,
        ...BaseStyles.fullScreenContainer,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        
    },
  Inputs: {
    position: "absolute",
    top: 0,
    left: "5%",
    width: "100%",
    minHeight:"80%",
    height:"auto",
    flexDirection:"column",
  },
  forgotPassword:{
    fontSize:14,
    fontWeight:"bold",
    color:"#0003c9ff"  
  },
  btn:{
    width:250,
    height:"30%",
    backgroundColor:colors.Cor_4,
    borderRadius:30,
    padding:"5%"
  },
  btnContainer: {
    marginTop:"10%",
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  passwordStrength:{
    alignSelf: "center",
    padding: 3,
    width: 150,
    height: 25,
    borderRadius:5,
    backgroundColor: colors.Cor_6,
  }
})

export default styles;