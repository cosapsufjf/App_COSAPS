import axios from 'axios';
import Config from 'react-native-config';


const FatSecretAPI = {
  accessToken: Config.FAT_SECRET_ACCESS_TOKEN,
  
  async getFood(foodId : number) {
    try {
      const response = await axios.get(
        'https://platform.fatsecret.com/rest/food/v5',
        {
          params: {
            food_id: foodId,
            format: 'json'
          },
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error : any) {
      console.error('Erro ao buscar alimento:', error.message);
      throw error;
    }
  },

  async searchFood(searchExpression : string) {
    try {
      const response = await axios.post(
        'https://platform.fatsecret.com/rest/server.api',
        null,
        {
          params: {
            method: 'food.search.v3',
            search_expression: searchExpression,
            format: 'json'
          },
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log("resposta: ",response.data)
      return response.data;
    } catch (error : any) {
      console.error('Erro na busca de alimentos:', error.message);
      throw error;
    }
  }
};

export default FatSecretAPI;