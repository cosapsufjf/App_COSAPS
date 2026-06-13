import POF_AlimentosData from "@/output/POF_Alimentos.json"

export interface food_item_interface{
  food: POF_Alimentos_formatted;
  recent_searches: POF_Alimentos_formatted[];
  set_function: React.Dispatch<React.SetStateAction<POF_Alimentos_formatted[]>>;
}

export interface POF_Alimentos {
  CD: string;
  Nome: string;
  CP: string;
  Desc: string;
  
  Alimentos: {
    Energia: string;
    Proteina: string;
    Lipideos: string;
    Carboidratos: string;
    FibraAlimentar: string;
  };
  Gorduras: {
    Colesterol: string;
    AgSat: string;
    AgMono: string;
    AgPoli: string;
    AgLinoleico: string;
    AgLinolenico: string;
    AgTransTot: string;
    AcucarTot: string;
    AcucarAdicao: string;
  };
  Minerais: {
    Calcio: string;
    Magnesio: string;
    Manganes: string;
    Fosforo: string;
    Ferro: string;
    Sodio: string;
    SodioAdicao: string;
    Potassio: string;
    Cobre: string;
    Zinco: string;
    Selenio: string;
  };
};

export interface POF_Alimentos_formatted {
  CD: string;
  Nome: string;
  CP: string;
  Desc: string;
  Alimentos: {
    Energia: {value: string; unity: "kcal"};
    Proteina: {value: string; unity: "g"};
    Lipideos: {value: string; unity: "g"};
    Carboidratos: {value: string; unity: "g"};
    FibraAlimentar: {value: string; unity: "g"};
  };
  Gorduras: {
    Colesterol: {value: string; unity: "mg"};
    AgSat: {value: string; unity: "g"};
    AgMono: {value: string; unity: "g"};
    AgPoli: {value: string; unity: "g"};
    AgLinoleico: {value: string; unity: "g"};
    AgLinolenico: {value: string; unity: "g"};
    AgTransTot: {value: string; unity: "g"};
    AcucarTot: {value: string; unity: "g"};
    AcucarAdicao: {value: string; unity: "g"};
  };
  Minerais: {
    Calcio: {value: string; unity: "mg"};
    Magnesio: {value: string; unity: "mg"};
    Manganes: {value: string; unity: "mg"};
    Fosforo: {value: string; unity: "mg"};
    Ferro: {value: string; unity: "mg"};
    Sodio: {value: string; unity: "mg"};
    SodioAdicao: {value: string; unity: "mg"};
    Potassio: {value: string; unity: "mg"};
    Cobre: {value: string; unity: "mg"};
    Zinco: {value: string; unity: "mg"};
    Selenio: {value: string; unity: "mcg"};
  };
};

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


