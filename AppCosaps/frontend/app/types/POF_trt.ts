import POF_AlimentosData from "@/output/POF_Alimentos.json"
import { POF_Alimentos, POF_Alimentos_formatted } from "@/app/interfaces/POF/POF_irt";

const transformValues = <T extends Record<string, any>>(
  obj: T,
  unities: Record<string, string>
): Record<keyof T, { value: any; unity: string }>=> {
  const result: any = {};
  
  for (const key in obj) {
    result[key] = {
      value: obj[key],
      unity: unities[key as string] || "g",
    };
  }
  
  return result;
}

export const convertPOFAlimentos = (food: POF_Alimentos): POF_Alimentos_formatted => {
  return {
    CD: food.CD,
    Nome: food.Nome,
    CP: food.CP,
    Desc: food.Desc,
    Alimentos: transformValues(food.Alimentos, {
      Energia: "kcal",
      Proteina: "g",
      Lipideos: "g",
      Carboidratos: "g",
      FibraAlimentar: "g",
    }) as any,
    Gorduras: transformValues(food.Gorduras, {
      Colesterol: "mg",
      AgSat: "g",
      AgMono: "g",
      AgPoli: "g",
      AgLinoleico: "g",
      AgLinolenico: "g",
      AgTransTot: "g",
      AcucarTot: "g",
      AcucarAdicao: "g",
    }) as any,
    Minerais: transformValues(food.Minerais, {
      Calcio: "mg",
      Magnesio: "mg",
      Manganes: "mg",
      Fosforo: "mg",
      Ferro: "mg",
      Sodio: "mg",
      SodioAdicao: "mg",
      Potassio: "mg",
      Cobre: "mg",
      Zinco: "mg",
      Selenio: "mcg",
    }) as any,
  };
}

export type FoodData = typeof POF_AlimentosData;
export type Food = keyof FoodData;
export const POF_keys = Object.keys(POF_AlimentosData) as Food[];


