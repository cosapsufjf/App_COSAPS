import { View, Text, Image } from "react-native";
import { styles } from "./style";
import { AppImageValues } from "@/app/types/images";

interface ListItemViewProps {
  description?: string;
  repeat?: number | string;
  loads?: number;
  image?: AppImageValues;
}

const ListItemView: React.FC<ListItemViewProps> = ({ description, repeat, loads, image }) => {  

  return (
    <View style={styles.container}>
      {image !== undefined ? <Image source={image} style={styles.img} /> : null}
      <View style={[styles.view_item, {width:"100%"}]}>
        {description !== undefined ? <Text style={styles.text}>{description}</Text> : null}
      </View>
      <View style={styles.view_container}>
        <View style={styles.view_item}>
          <Text style={styles.text}>Repetições: {repeat}</Text>
        </View>
        {
          loads !== undefined && (
          <View style={styles.view_item}>
            <Text style={styles.text}>Carga: {loads}</Text>
          </View>
        )}
      </View>
      
    </View> 
  )
};

export default ListItemView;