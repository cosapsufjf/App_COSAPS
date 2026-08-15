import { View, Text, TouchableOpacity} from "react-native";
import { useState } from "react";
import styles from "./styles";

interface FoodTileProps {
  name: string,
  description: string,
  repeat:string
}

enum status{
  open,
  closed,
}

const FoodTile = ({ name, description, repeat }: FoodTileProps) => {
  const [height, setHeight] = useState(80);
  const [showInfo, setShowInfo] = useState(status.closed);

  const onPress = () => {
    setHeight(showInfo === status.closed ? 400:80);
    setShowInfo(showInfo === status.closed ? status.open : status.closed);
  }
  
  return (
    <TouchableOpacity style={[styles.container, { height: height }]} onPress={onPress}>
      <View style={{flexDirection: "row", justifyContent: "space-between", margin:0}}>
        <View style={styles.side}>
          <Text style={styles.text}>{name}</Text>
        </View>
        <View style={styles.side}>
        </View>  
      </View>
      {showInfo === status.open ? 
        <View style={{ margin: 20 }}>
          <View style={{ margin: 10 }}>
            <Text style={styles.text}>{description}</Text>     
          </View>
          <View style={{ margin: 10 }}>
            <Text style={styles.text}>{repeat}</Text>            
          </View>
        </View>
        : null
      }
    </TouchableOpacity>
  );
};

export default FoodTile;