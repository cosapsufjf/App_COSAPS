import { ScrollView,View, Text} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import styles from "./styles";
const PacientInfo = () => {
    const Info_Item = ({text}: {text: string})=>{
        return(
            <View style={styles.item}>
                <Text style={styles.text}>{text}</Text>
            </View>
        )
    }
    
    return(
        <SafeAreaProvider style={{flexDirection: "row"}}>
            <SafeAreaView style={styles.container}>
              <ScrollView contentContainerStyle={{alignItems: 'center'}}>
                <Text style={styles.text}>Últimos dias de sono</Text>
                <Info_Item text="Seu sono é: TODO" />
                <Info_Item text="Total de sono nos últimos 7 dias: TODO" />
              </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};  


export default PacientInfo;