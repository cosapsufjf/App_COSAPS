import { View,ScrollView, Text } from "react-native";
import styles from "./styles";
import FoodTile from "@/app/components/main_page_components/Diet/Food_tile";
import Line from "@/app/components/main_page_components/line/Line";
import PacientArea from "@/app/components/main_page_components/Pacient/pacient_area/PacientArea";
import MainHeader from "@/app/components/main_page_components/main_header/main_header";

const exemplo_desc = `Refeição simples de arroz com bacalhau, pode ser servida usando arroz e bacalhau
calorias: xxxx
gorduras trans: xxxx
gorduras saturadas: xxxx`;

const exemplo_repeat = `Refeição nos dias:
  Segunda a Sexta`;

const Diet = () => {
  return (
    <View style={styles.container}>
      <View>
        <MainHeader />
        <PacientArea />
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Line />
        <Text style={styles.Section}>Café da manhã</Text>
        <Line />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <FoodTile name="Arroz com bacalhau" description={exemplo_desc} repeat={exemplo_repeat} />
          <FoodTile name="Arroz com bacalhau" description={exemplo_desc} repeat={exemplo_repeat} />
          <FoodTile name="Arroz com bacalhau" description={exemplo_desc} repeat={exemplo_repeat} />
          <FoodTile name="Arroz com bacalhau" description={exemplo_desc} repeat={exemplo_repeat} />
  
        </ScrollView>
        <Line />
        <Text style={styles.Section}>Almoço</Text>
        <Line />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <FoodTile name="Arroz com bacalhau" description={exemplo_desc} repeat={exemplo_repeat} />
        </ScrollView>
        <Line />
        <Text style={styles.Section}>Jantar</Text>
        <Line />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <FoodTile name="Arroz com bacalhau" description={exemplo_desc} repeat={exemplo_repeat} />
        </ScrollView>
        <FoodTile name="Arroz com bacalhau" description={exemplo_desc} repeat={exemplo_repeat} />
        
      </ScrollView>
    </View>  );
};

export default Diet;