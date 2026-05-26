import { ScrollView,View, Text, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/app/MainStyle";

import styles from "./styles";
const PacientInfo = () => {

    const Info_Item : React.FC = ()=>{
        return(
            <View style={styles.item}>
                <Text style={styles.text}>Todo:</Text>
                <Text style={styles.text}>Todo</Text>
            </View>
        )
    }

    const PacientTile = ({bgcolor}: {bgcolor: string}) => {
      return (
        <TouchableOpacity style={[styles.tile, { backgroundColor: bgcolor }]}>
              <Text style={styles.text}>
                Paciente
              </Text>
        </TouchableOpacity>
        )
    }
    
    return(
        <SafeAreaProvider style={{flexDirection: "row"}}>
            <SafeAreaView style={styles.container}>
              <ScrollView contentContainerStyle={{alignItems: 'center'}}>
                <Text style={styles.text}>Informações</Text>
                <Info_Item/>
                <Info_Item/>
                <Info_Item/>
                <Info_Item/>
                <Info_Item/>
                <Info_Item/>
                <Info_Item/>
                <Info_Item/>
              </ScrollView>
            </SafeAreaView>
            <SafeAreaView style={styles.tiles_container}>
              <SafeAreaView style={{flexDirection: "row", width: "100%", justifyContent:"flex-start"}}>
                <PacientTile bgcolor={Colors.Cor_7} />
              </SafeAreaView>
              <SafeAreaView style={{flexDirection: "row", width: "100%", justifyContent:"flex-end"}}>
                <PacientTile bgcolor={Colors.Cor_5}/>
              </SafeAreaView>
        </SafeAreaView>
        </SafeAreaProvider>
    );
};  


export default PacientInfo;