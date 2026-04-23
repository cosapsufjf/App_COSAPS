import { View, Image, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
const MainHeader : React.FC = () => {
    return(
        <View style={styles.header_container}>
            <Text style={styles.txt}>Olá, Nome </Text>
            <TouchableOpacity>
                <Image source={require("@/assets/images/android-icon-foreground.png")} style={styles.img}/>
            </TouchableOpacity>
            
        </View>
    )
}


export default MainHeader;