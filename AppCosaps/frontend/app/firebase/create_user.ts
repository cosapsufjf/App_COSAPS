import {getAuth, createUserWithEmailAndPassword} from "@react-native-firebase/auth";

//TODO: Arrumar tipos
export const enviar = async (
  Validated:boolean,Email:string,Senha:string,
  setShowMessage:React.Dispatch<React.SetStateAction<boolean>>, 
  setNav:React.Dispatch<React.SetStateAction<boolean>>,
  setMessageTxt:React.Dispatch<React.SetStateAction<string>>) => {
    console.log("Formulário validado: ", Validated);

    if (!Validated) {
      setShowMessage(true);
      setNav(false);
      setMessageTxt("Preencha todos os campos!");
      return;
    }
    else{
      //TODO: REFATORAR PARA USAR LOGIN COM CUSTOM KEY
      //const sintex_mail = CPF+"@sintex.invalid"
      createUserWithEmailAndPassword(getAuth(), Email, Senha)
      .then(()=>{
        setShowMessage(true);
        setNav(true);
        setMessageTxt("Cadastro realizado com sucesso!");
      })
      .catch((err)=>console.log(err));
    }
  };