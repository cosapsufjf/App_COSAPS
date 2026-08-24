import { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView} from 'react-native';
import styles from './styles';

import InputContainer from '@/app/components/main_components/InputContainer/InputContainer';
import BB from '@/app/components/main_components/big_button/BB';
import Food_Item from '@/app/pages/food_calories/sub-components/Food_Item';

import ManageStorage from '@/app/conf/AsyncStorage';

import POF_AlimentosData from "@/output/POF_Alimentos.json"
import { Food, POF_keys, convertPOFAlimentos } from '@/app/types/POF_trt';
import { POF_Alimentos_formatted, POF_Alimentos } from '@/app/interfaces/POF/POF_irt';

export default function FoodSearchScreen() {
  const [foods, setFoods] = useState<Food[]>([]);
  
  const [recent_searches, setRecentSearches]: [POF_Alimentos_formatted[], any] = useState([]);
  const [search, setSearch] = useState('');
  const [show_recent, setShowRecent] = useState(true);
  
  const searchFoods = () => {      
    if (show_recent)
      setShowRecent(false);
      
    setFoods(POF_keys.filter((key) => key.toLocaleUpperCase().includes(search.toLocaleUpperCase())));
  };

  if (search.length === 0)
  {
    setShowRecent(true);
    ManageStorage.loadRecentSearches(setRecentSearches);
  }
  else
    searchFoods();

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
                    <Food_Item recent_searches={recent_searches} set_function={setRecentSearches} key={search.CD} food={search} />
                  ))  
                }
              </View>
              :
                foods.map((food: Food, index: number) => {
                  return <Food_Item recent_searches={recent_searches} set_function={setRecentSearches}
                    key={index}
                    food={convertPOFAlimentos(POF_AlimentosData[food] as POF_Alimentos) as POF_Alimentos_formatted} />
                })
          }
        </ScrollView>
      </SafeAreaView>  
    </SafeAreaProvider>
    
  );
}