import { TouchableOpacity, Image } from "react-native";
import styles from "../styles";

const AddButton = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity style={styles.btn} onPress={onPress}>
    <Image source={require("@/assets/images/plus.png")} style={styles.icon} />
    </TouchableOpacity>
);

export default AddButton;