import POF_AlimentosData from "@/output/POF_Alimentos.json"

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

export interface food_item_interface{
  food: POF_Alimentos;
  recent_searches: POF_Alimentos[];
  set_function: React.Dispatch<React.SetStateAction<POF_Alimentos[]>>;
}

export interface AsyncModel{
  food_CD: string;
  food_name: string;
  food_brand: string;
  food_description: string;
}

export type FoodData = typeof POF_AlimentosData;
export type Food = keyof FoodData;
export const POF_keys = Object.keys(POF_AlimentosData) as Food[];
