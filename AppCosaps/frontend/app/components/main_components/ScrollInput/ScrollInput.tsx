import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from "./styles";
import { Colors } from "@/app/MainStyle";
import { useState } from "react";

const ScrollInput = (
  { len,
    SelectItem,
    desc,
    nestedScrollParent = true
  }: {
      len: number,
      SelectItem: React.Dispatch<React.SetStateAction<string>>,
      desc?: boolean,
      nestedScrollParent?: boolean
  }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const list = (len: number, desc?: boolean) => {
    const list = Array.from(
      { length: len },
      (_, i) => (desc ? len - i - 1 : i).toString().padStart(2, "0")
    );
    return [...list.reverse(),...list];
  };
  

  const handlePress = (item: string) => {
    setSelectedItem(item);
    SelectItem(item);
  };
  
  const renderItem = ({ item }: { item: string }) => (
    <View>
      <Text style={{ color: Colors.Fundo_Claro_2}}> ----</Text>
      <TouchableOpacity onPress={() => handlePress(item)}>
        <Text style={[styles.text, selectedItem === item && { color: Colors.Cor_6 }]}>{item}</Text>
      </TouchableOpacity>
    </View>
  );

  const ITEM_HEIGHT = 50
  const data = list(len, desc);
  
  return (
    <View>
      <FlatList
        style={styles.container}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item}-${index}`}
        nestedScrollEnabled={nestedScrollParent}
        initialScrollIndex={len}
        getItemLayout={(data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
      />
    </View>
  )
};

export default ScrollInput;