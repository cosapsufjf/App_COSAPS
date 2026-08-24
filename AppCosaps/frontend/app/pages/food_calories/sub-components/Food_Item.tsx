import { useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import ManageStorage from '@/app/conf/AsyncStorage';
import styles_cr from "./styles";

import { food_item_interface } from '@/app/types/POF_trt';
import { Colors } from '@/app/MainStyle';


const Food_Item = ({ food, recent_searches, set_function }: food_item_interface) => {  
  const [show_full_content, setShowFullContent] = useState(false);
  const food_info = [
    { "table": "Informação Nutricional", "data": food.Alimentos},
    { "table": "Gorduras", "data": food.Gorduras},
    { "table": "Minerais", "data": food.Minerais}
  ]

  const styles = styles_cr();
  
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
          <Text style={styles_cr(Colors.Cor_4,Colors.Fundo_Claro_1).text_box}>{food.Nome}</Text> 
        </View>
      
      <Text style={styles.item_description}>
        {show_full_content
          ?
          food_info.map((info, index) => (
            <View style={styles.propertie_text_box} key={index}>
              <Text style={styles.text_box}>
                {info.table}:
              </Text>
              <View style={styles_cr(Colors.Cor_4).text_box}>
                {
                  Object.entries(info.data).map(([key, value]) => (
                    <Text key={key} style={styles_cr(Colors.Cor_6, "black", 21).text_box}>
                      {`${key}: ${value["value"]} ${value["unity"]}\n`}
                    </Text>
                  ))
                }
              </View>

           
            </View>
          ))
          :
          `Ver detalhes...`}</Text>          
    </TouchableOpacity>
  )
}

export default Food_Item;