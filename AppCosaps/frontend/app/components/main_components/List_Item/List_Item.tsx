import { useState } from "react";
import { TouchableOpacity, View, Text, DimensionValue } from "react-native";
import styles from "./styles";

interface ListItemInter {
  name: string;
  description?: string;
  extra?: string;
  minHeight?: DimensionValue;
  maxHeight?: DimensionValue;
  extraComponent?: React.ReactNode;
}

const ListItem = ({
  name,
  description,
  extra,
  minHeight = "25%" as DimensionValue,
  maxHeight = "70%" as DimensionValue,
  extraComponent,
}: ListItemInter) => {
  const [isOpen, setIsOpen] = useState(false);

  const onPress = () => setIsOpen((prev) => !prev);

  return (
    <TouchableOpacity
      style={[styles.container, { minHeight, maxHeight }]}
      onPress={onPress}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={styles.side}>
          <Text style={styles.text}>{name}</Text>
        </View>
        <View style={styles.side} />
      </View>

      {isOpen && (
        <View>
          <View style={{ margin: 10 }}>
            <Text style={styles.text}>{description}</Text>
            {extraComponent && (
              <View style={styles.component}>{extraComponent}</View>
            )}
          </View>
          <View style={{ margin: 10 }}>
            <Text style={styles.text}>{extra}</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ListItem;