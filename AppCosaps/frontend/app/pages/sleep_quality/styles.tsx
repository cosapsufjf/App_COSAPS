import { StyleSheet } from "react-native";
import { Colors, BaseStyles } from "@/app/MainStyle";


const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: Colors.Cor_2,
    ...BaseStyles.centerContent,
  },
});
    
export default styles;