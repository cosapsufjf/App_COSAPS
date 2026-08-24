import { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import  styles from "./styles";

interface ListItem {
  name: string,
  description: string,
  extra: string,
  minHeight: number,
}

enum status{
  open,
  closed,
}

const ListItem = ({ name, description, extra, minHeight=80 }: ListItem) => {
  const [height, setHeight] = useState(minHeight);
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
            <Text style={styles.text}>{extra}</Text>            
          </View>
        </View>
        : null
      }
    </TouchableOpacity>
  );
};

export default ListItem;