import AppImages from "@/app/conf/GetImages";
import { Image, TouchableOpacity } from "react-native";
import { AppImageKeys } from "@/app/types/images";

const styles = {
  img:{
      height:100,
      width: 87
  },
}

const ImageIcon: React.FC<{ iconName: AppImageKeys, onPress?: () => void }> = ({ iconName, onPress }) => {  
    return (
      <TouchableOpacity onPress={onPress}>
        <Image source={AppImages[iconName]} style={styles.img} />
      </TouchableOpacity>
    );
  };

export default ImageIcon;