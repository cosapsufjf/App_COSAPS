import axios from "axios";

const FatSecretAPI = {
  accessToken: process.env.FATSECRET_ACESS_TOKEN,
  baseUrl: process.env.API_BASE_URL,
  async getFood(foodId: number) {
    try {
      const response = await axios.get(`${this.baseUrl}/server.api`, {
        params: {
          method: "food.get.v5",
          food_id: foodId,
          format: "json",
        },
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("Erro ao buscar alimento:", error.message);
      throw error;
    }
  },

  async searchFood(searchExpression: string) {
    try {
      const response = await axios.post(`${this.baseUrl}/server.api`, null, {
        params: {
          method: "foods.search",
          search_expression: searchExpression,
          format: "json",
        },
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      
      console.log("resposta: ", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Erro na busca de alimentos:", error.message);
      throw error;
    }
  },
};

export default FatSecretAPI;
