import FatSecretAPI from '@/app/api/fat_secret';

import { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView} from 'react-native';
import styles from './styles';

import InputContainer from '@/app/components/general_components/fix_Input/InputContainer';
import BB from '@/app/components/crud_components/big_button/BB';
import Food_Item from '@/app/components/main_page_components/FoodSearch/Food_Item';

import ManageStorage, { AsyncModel } from '@/app/conf/AsyncStorage';

export default function FoodSearchScreen() {
  const [foods, setFoods] = useState([]);
  
  const [recent_searches, setRecentSearches]: [AsyncModel[], any] = useState([]);
  const [search, setSearch] = useState('');
  const [show_recent, setShowRecent] = useState(true);
    
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
      ManageStorage.loadRecentSearches(setRecentSearches);
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
                  <BB text="Limpar Histórico" width={200} action={
                    () => ManageStorage.Clear_Async_Storage(setRecentSearches)
                  } />
                </View>
                {
                  recent_searches.map((search) => (
                    <Food_Item recent_searches={recent_searches} set_function={setRecentSearches} key={search.food_id} food={search} />
                  ))  
                }
              </View>
              :
                foods.map((food: any) => {
                  return <Food_Item recent_searches={recent_searches} set_function={setRecentSearches} key={food.food_id} food={food} />
                })
          }
        </ScrollView>
      </SafeAreaView>  
    </SafeAreaProvider>
    
  );
}