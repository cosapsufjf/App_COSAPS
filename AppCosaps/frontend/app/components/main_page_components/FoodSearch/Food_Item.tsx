import { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import ManageStorage from '@/app/conf/AsyncStorage';
import styles from "./styles";

import { food_item_interface, POF_Alimentos } from '@/app/types/POF_trt';


const Food_Item = ({ food, recent_searches, set_function }: food_item_interface) => {  
  const [show_full_content, setShowFullContent] = useState(false);
  const food_info = [food.Alimentos, food.Gorduras, food.Minerais]
  
  
  const show_full_description = async () => {
    setShowFullContent(!show_full_content);
    try {
      await ManageStorage.Save_List_In_Async_Storage(recent_searches, 'recent_searches', set_function, food)
    } catch (error) {
      console.error('Failed to save recent searches:', error);
    }
  };
  
  return (
    <TouchableOpacity style={styles.list_item} onPress={()=>show_full_description()}>
        <View style={styles.propertie_container}>
          <Text>Nome produto:</Text>
          <Text style={styles.text_box}>{food.Nome}</Text> 
        </View>
      
      <Text style={styles.item_description}>
        {show_full_content
          ?
          food_info.map((info, index) => (
            <View style={styles.propertie_text_box} key={index}>
              <Text style={styles.desc_item}>
                {Object.entries(info).map(([key, value]) => `${key}: ${value}\n`)}
              </Text>              
            </View>
          ))
          :
          `Ver detalhes...`}</Text>          
    </TouchableOpacity>
  )
}

export default Food_Item;