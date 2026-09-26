import { View, ScrollView, Text } from "react-native";
import styles from "./styles";
import ListItem from "@/app/components/main_components/List_Item/List_Item";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Line from "@/app/components/main_components/line/Line";
import PacientArea from "@/app/components/main_page_components/pacient_area/PacientArea";
import MainHeader from "@/app/components/main_page_components/main_header/main_header";
import ViewActivity from "../../components/main_components/ListItemView/ListItemView";
import AppImages from "@/app/conf/GetImages";

const exemplo_desc = `Alimento que deve ser ingerido na reifeição`;

const Diet = () => {
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
          <Text style={styles.Section}>Almoço</Text>
          <Line />

          <View>
            <ListItem
              name="Arroz com bacalhau"
              minHeight={80}
              extraComponent={<ViewActivity description={exemplo_desc} repeat={"Segunda a Sexta"} image={AppImages.template_meal} />}
            />
            <ListItem
              name="Feijão"
              minHeight={80}
              extraComponent={<ViewActivity description={exemplo_desc} repeat={"Segunda a Sexta"} image={AppImages.template_meal} />}
            />
            <ListItem
              name="Salada"
              minHeight={80}
              extraComponent={<ViewActivity description={exemplo_desc} repeat={"Segunda a Sexta"} image={AppImages.template_meal} />}
            />
            <ListItem
              name="Bife"
              minHeight={80}
              extraComponent={<ViewActivity description={exemplo_desc} repeat={"Segunda a Sexta"} image={AppImages.template_meal} />}
            />
          </View>

          <Line />
          <Text style={styles.Section}>Janta</Text>
          <Line />

          <View>
            <ListItem
              name="Arroz com bacalhau"
              minHeight={80}
              extraComponent={<ViewActivity description={exemplo_desc} repeat={"Segunda a Sexta"} image={AppImages.template_meal} />}
            />
            <ListItem
              name="Feijão"
              minHeight={80}
              extraComponent={<ViewActivity description={exemplo_desc} repeat={"Segunda a Sexta"} image={AppImages.template_meal} />}
            />
            <ListItem
              name="Bife"
              description={exemplo_desc}
              minHeight={80}
              extraComponent={<ViewActivity repeat={"Segunda a Sexta"} image={AppImages.template_meal} />}
            />
          </View>

          <Line />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Diet;