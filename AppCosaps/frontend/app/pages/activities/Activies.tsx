import { View, ScrollView, Text } from "react-native";
import styles from "./styles";
import ListItem from "@/app/components/main_components/List_Item/List_Item";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Line from "@/app/components/main_components/line/Line";
import PacientArea from "@/app/components/main_page_components/pacient_area/PacientArea";
import MainHeader from "@/app/components/main_page_components/main_header/main_header";
import ViewActivity from "../../components/main_components/ListItemView/ListItemView";
import AppImages from "@/app/conf/GetImages";

const exemplo_desc = `Exercicio simples composto por movimentos que podem ser feitos usando o corpo`;

const Activities = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View>
          <MainHeader />
          <PacientArea />
        </View>

        <ScrollView
          style={{ flex: 1 }}                          // 🔑 ocupa só o espaço restante
          contentContainerStyle={{ paddingBottom: 24 }} // 🔑 sem flexGrow
          showsVerticalScrollIndicator={false}
        >
          <Line />
          <Text style={styles.Section}>Série 1</Text>
          <Line />

          <View>
            <ListItem
              name="Correr 2km"
              minHeight={80}
              extraComponent={<ViewActivity description={exemplo_desc} repeat={10} loads={15} image={AppImages.template_exc} />}
            />
            <ListItem
              name="Agachamentos"
              minHeight={80}
              extraComponent={<ViewActivity description={exemplo_desc} repeat={10} loads={15} image={AppImages.template_exc} />}
            />
            <ListItem
              name="Extensão corporal"
              minHeight={80}
              extraComponent={<ViewActivity description={exemplo_desc} repeat={10} loads={15} image={AppImages.template_exc} />}
            />
            <ListItem
              name="Flexões"
              minHeight={80}
              extraComponent={<ViewActivity description={exemplo_desc} repeat={10} loads={15} image={AppImages.template_exc} />}
            />
          </View>

          <Line />
          <Text style={styles.Section}>Série 2</Text>
          <Line />

          <View>
            <ListItem
              name="Barra aberta"
              description={exemplo_desc}
              minHeight={80}
              extraComponent={<ViewActivity repeat={8} image={AppImages.template_exc} />}
            />
          </View>

          <Line />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Activities;