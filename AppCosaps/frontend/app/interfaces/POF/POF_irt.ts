
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
