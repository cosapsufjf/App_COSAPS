import { ScrollView,View, Text} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import styles from "./styles";
import { ReactNode } from "react";

const PacientInfo = ({title, content}: {content: any; title: string}) => {    
    return(
        <SafeAreaProvider style={{flexDirection: "row"}}>
            <SafeAreaView style={styles.container}>
              <ScrollView contentContainerStyle={{alignItems: 'center'}}>
                <Text style={styles.text}>{title}</Text>
                {content}
              </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};  


export default PacientInfo;