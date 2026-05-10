import FatSecretAPI from '@/app/api/fat_secret';

import { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, Button } from 'react-native';
import styles from './styles';

export default function FoodSearchScreen() {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');

    const searchFoods = async () => {
      setLoading(true);
      try {
        const result = await FatSecretAPI.searchFood(search);
        setFoods(result.foods?.food || []);
      } catch (error) {
        console.error('Erro:', error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    if(search !== '') return
    searchFoods();
  }, []);

  return (
    <View style={styles.container}>
        <Text>Busca de alimentos</Text>
        <TextInput style={styles.Input_txt} value={search} onChangeText={setSearch}/>
        <Button title="Buscar" onPress={searchFoods}/>
        <ScrollView>
        {foods.map((food : any) => (
            <View key={food.food_id}>
            <Text>{food.food_name}</Text>
            <Text>{food.brand_name}</Text>
            </View>
        ))}
        </ScrollView>
    </View>
  );
}