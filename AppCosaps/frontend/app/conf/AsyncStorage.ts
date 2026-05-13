import AsyncStorage from '@react-native-async-storage/async-storage';

export interface AsyncModel{
  food_id: string;
  food_name: string;
  food_brand: string;
  food_description: string;
}

const ManageStorage = {
  get_Parsed_Async_Storage: async (item_name: string) => {
    try {
      const value = await AsyncStorage.getItem(item_name);
      return value ? JSON.parse(value) : null;
    }
    catch
    {
      console.log("Falha ao recuperar do async storage\n");
    }
  },
  Save_In_Async_Storage: async (item_name: string, Item: any) => {
    try {
      await AsyncStorage.setItem(item_name, Item);
    }
    catch
    {
      console.log("Falha ao salvar no async storage\n");
    }
  },
  Save_List_In_Async_Storage: async (Item_vector: AsyncModel[],item_name:string,set_function: React.Dispatch<any[]>, search: any) => {    
    if (Item_vector.map(item => item.food_id).includes(search.food_id))
    {
      console.log("Bloqueado, já na lista")
      return;
    }
  
    try {
      Item_vector.push(search)
      
      const json_searches = JSON.stringify(Item_vector);
      await AsyncStorage.setItem(item_name, json_searches);
      ManageStorage.loadRecentSearches(set_function);
      console.log("Salvo no AsyncStorage!")
      
      for(let i in Item_vector)
        console.log(Item_vector[i])
    }
    catch (error) {
      console.error('Failed to save recent searches:', error);
    }
  },
  Clear_Async_Storage: async (set_function: React.Dispatch<any[]>) => {
    await AsyncStorage.removeItem('recent_searches');
    set_function([]);
  },
  loadRecentSearches: async (set_function: React.Dispatch<any[]>) => {
    try {
      const json_searches = await AsyncStorage.getItem('recent_searches');
      if (json_searches) 
        set_function(JSON.parse(json_searches));
      
    } catch (error) {
      console.error('Failed to load recent searches:', error);
    } 
  }
};

export default ManageStorage;