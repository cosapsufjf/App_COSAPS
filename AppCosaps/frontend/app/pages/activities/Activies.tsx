import { View,ScrollView, Text } from "react-native";
import styles from "./styles";
import ListItem from "@/app/components/main_components/List_Item/List_Item";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Line from "@/app/components/main_components/line/Line";
import PacientArea from "@/app/components/main_page_components/pacient_area/PacientArea";
import MainHeader from "@/app/components/main_page_components/main_header/main_header";

const exemplo_desc = `Exercicio simples composto por movimentos que podem ser feitos usando o corpo
repetições: xxxx
séries: xxxx
peso: xxxx`;


const Activities = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View>
          <MainHeader />
          <PacientArea />
        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Line />
          <Text style={styles.Section}>Série 1</Text>
          <Line />
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <ListItem name="Correr 2km" description={exemplo_desc} minHeight={80} />
            <ListItem name="Agachamentos" description={exemplo_desc} minHeight={80} />
            <ListItem name="Extensão corporal" description={exemplo_desc} minHeight={80} />
            <ListItem name="Flexões" description={exemplo_desc} minHeight={80} />
    
          </ScrollView>
          <Line />
          <Text style={styles.Section}>Série 2</Text>
          <Line />
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <ListItem name="Arroz com bacalhau" description={exemplo_desc} minHeight={80} />
          </ScrollView>
          <Line />
  
        </ScrollView>
      </SafeAreaView> 
    </SafeAreaProvider>
 );
};

export default Activities;