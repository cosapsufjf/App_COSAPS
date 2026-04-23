import { ScrollView,FlatList,View, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
const Pacient_Overview = () => {
    //As atividades tem que ser obtidas apartir do backend, no formato do objeto
    const activities = [
        { id: 1, name: "Todo1" },
        { id: 2, name: "Todo2" },
        { id: 3, name: "Todo3" },
        { id: 4, name: "Todo4" },
        { id: 5, name: "Todo5" },
    ];

    const Status_icon = ()=>{
        return(
            <View style={styles.status_icon}/>
        )
    }
    const Overview_Item : React.FC<{title:string}> = ({title})=>{
        return(
            <View style={styles.list_item}>
                <Text style={styles.txt}>{title}:</Text>
                <Status_icon/>
            </View>
        )
    }

    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Text style={styles.txt}>Para Hoje</Text>
                <FlatList 
                data={activities} 
                renderItem={({item})=> <Overview_Item title={item.name}/>}
                keyExtractor={(item) => item.id.toString()}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default Pacient_Overview