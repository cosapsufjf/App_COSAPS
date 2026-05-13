import { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import ManageStorage, { AsyncModel } from '@/app/conf/AsyncStorage';
import styles from "./styles";


interface food_item_interface{
  food: any;
  recent_searches: AsyncModel[];
  set_function: React.Dispatch<React.SetStateAction<AsyncModel[]>>;
}

const Food_Item = ({ food, recent_searches, set_function }: food_item_interface) => {  
  const [show_full_content, setShowFullContent] = useState(false);
  const [parsed_description, setParsedDescription] = useState<null | { Calorias: string; Gordura: string; Carboidratos: string; Proteínas: string; Serve: string }>(null);
  
  useEffect(() => {
    const parse_food_description = (description: string) => {
      const re = /Per\s*([^-]+?)\s*-\s*Calories:\s*([\d.]+kcal)\s*\|\s*Fat:\s*([\d.]+g)\s*\|\s*Carbs:\s*([\d.]+g)\s*\|\s*Protein:\s*([\d.]+g)/i;
      const m = description.match(re);
      
      if (m) 
        return { Calorias: m[2], Gordura: m[3], Carboidratos: m[4], Proteínas: m[5], Serve: m[1].trim() };
      else
        return null;
    };
    const parsed = parse_food_description(food.food_description);
    if (parsed) setParsedDescription(parsed);
  },[food.food_description])

  
  const show_full_description = async () => {
    setShowFullContent(!show_full_content);
    try {
      await ManageStorage.Save_List_In_Async_Storage(recent_searches, 'recent_searches', set_function, {
        food_id: food.food_id,
        food_name: food.food_name,
        food_brand: food.brand_name,
        food_description: food.food_description
      })
    } catch (error) {
      console.error('Failed to save recent searches:', error);
    }
  };
  
  return (
    <TouchableOpacity style={styles.list_item} onPress={()=>show_full_description()}>
        <View style={styles.propertie_container}>
          <Text>Nome produto:</Text>
          <Text style={styles.text_box}>{food.food_name}</Text> 
        </View>
        
        {
          food.brand_name && (
            <View style={styles.propertie_container}>
              <Text>Nome marca:</Text>
              <Text style={styles.text_box}>{food.brand_name}</Text>
            </View>
          )
        }
      
      <Text style={styles.item_description}>
        {show_full_content
          ?
          Object.entries(parsed_description ?? {}).map(([key, value]) => (
            <View style={styles.propertie_text_box} key={key}>
              <Text style={styles.desc_item}>{key}: {value+"\n"}</Text>              
            </View>
          ))
          :
          `Ver detalhes...`}</Text>          
    </TouchableOpacity>
  )
}

export default Food_Item;