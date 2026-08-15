import { View, Image, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@/app/types/navigation";


const MainHeader: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();
    
    return(
        <View style={styles.header_container}>
            <Text style={styles.txt}>Olá, Nome </Text>
            <TouchableOpacity onPress={() => navigation.navigate("MainPage")}>
                <Image source={require("@/assets/images/android-icon-foreground.png")} style={styles.img}/>
            </TouchableOpacity>
            
        </View>
    )
}


export default MainHeader;