import FatSecretAPI from '@/app/api/fat_secret';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, TouchableOpacity} from 'react-native';
import styles from './styles';

import InputContainer from '@/app/components/crud_components/input_container/InputContainer';
import BB from '@/app/components/crud_components/big_button/BB';

interface AsyncModel{
  food_id: string;
  food_name: string;
  food_brand: string;
  food_description: string;
}

export default function FoodSearchScreen() {
  const [foods, setFoods] = useState([]);
  
  const [recent_searches, setRecentSearches]: [AsyncModel[], any] = useState([]);
  const [search, setSearch] = useState('');
  const [show_recent, setShowRecent] = useState(true);

  const Save_In_Async_Storage = async (search: any) => {    
    if (recent_searches.map(item => item.food_id).includes(search.food_id))
    {
      console.log("Bloqueado, já na lista")
      return;
    }

    try {
      //talvez refatorar o método de entrada
      recent_searches.push(search)
      
      const json_searches = JSON.stringify(recent_searches);
      await AsyncStorage.setItem('recent_searches', json_searches);
      loadRecentSearches();
      console.log("Salvo no AsyncStorage!")
      
      for(let i in recent_searches)
        console.log(recent_searches[i])
    }
    catch (error) {
      console.error('Failed to save recent searches:', error);
    }
  };

  const Clear_Async_Storage = async () => {
    await AsyncStorage.removeItem('recent_searches');
    setRecentSearches([]);
  };
  
  const loadRecentSearches = async () => {
    try {
      const json_searches = await AsyncStorage.getItem('recent_searches');
      if (json_searches) 
        setRecentSearches(JSON.parse(json_searches));
      
    } catch (error) {
      console.error('Failed to load recent searches:', error);
    }
  };
  const Food_Item = ({ food }: { food: any }) => {
    const [show_full_content, setShowFullContent] = useState(false);
    
    const show_full_description = async () => {
      setShowFullContent(!show_full_content);

      try {
        Save_In_Async_Storage({
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
        
        <Text style={styles.item_description}>{show_full_content ? food.food_description : `${food.food_description.slice(0, 30)}...`}</Text>          
      </TouchableOpacity>
    )
  }
  

  
  useEffect(() => {
 
    const searchFoods = async () => {
      console.log(search)
      if (show_recent)
        setShowRecent(false);
      try {
        const result = await FatSecretAPI.searchFood(search);
        setFoods(result.foods?.food || []);
      } catch (error) {
        console.error('Erro:', error);
      }
    };
    
    if (search.length === 0)
    {
      setShowRecent(true);
      loadRecentSearches();
    }
    else
      searchFoods();
  }, [search, show_recent]);
    
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text>Busca de alimentos</Text>
        <InputContainer
        text_state_setter={setSearch}
        placeholder='Digite para começar a buscar'
        />
        <ScrollView style={styles.list_item_container}>
          {
            show_recent
              ?
              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text>Histórico de buscas: </Text>
                  <BB text="Limpar Histórico" width={200} action={Clear_Async_Storage}/>
                </View>
                {
                  recent_searches.map((search) => (
                    <Food_Item key={search.food_id} food={search} />
                  ))  
                }
              </View>
              :
                foods.map((food: any) => {
                  return <Food_Item key={food.food_id} food={food} />
                })
          }
        </ScrollView>
      </SafeAreaView>  
    </SafeAreaProvider>
    
  );
}