import { ScrollView,View, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
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


    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Text style={styles.text}>Informações</Text>
                <ScrollView>
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
        </SafeAreaProvider>
    );
};  


export default PacientInfo;