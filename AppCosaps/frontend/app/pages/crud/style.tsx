import { StyleSheet } from "react-native";
import { Colors, BaseStyles } from "@/app/MainStyle";

const styles = StyleSheet.create({
  // Container principal com SafeArea
  container: {
    ...BaseStyles.fullScreenContainer,
    ...BaseStyles.centerContent,
    backgroundColor: Colors.Cor_6,
  },

  // Header com imagem
  imgHeader: {
    width: 350,
    height: 80,
    margin: 20,
    resizeMode: "contain",
  },

  // Container de conteúdo dinâmico
  pageContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default styles;