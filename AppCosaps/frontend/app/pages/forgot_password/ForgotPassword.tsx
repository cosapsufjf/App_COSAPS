import { Image, View, Text, Animated} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { useForm } from "@/app/hooks/form/FixForm";
import { useRef, useEffect, useState } from "react";

import { NavigationProp } from "@/app/types/navigation";
import { useNavigation } from "@react-navigation/native";

import { getAuth, sendPasswordResetEmail } from "@react-native-firebase/auth";

import BB from "@/app/components/main_components/big_button/BB";
import InputContainer from "@/app/components/main_components/InputContainer/InputContainer";
import styles_comp from "@/app/pages/crud/sub-components/styles";
import styles from "./style";

const ForgotPassword: React.FC = () => {
  const [EmailSent, setEmailSent] = useState(false);
  const [inputErr, setInputErr] = useState(false);
  const [messageTxt, setMessageTxt] = useState("Não foi possível enviar o código de redefinição para o email informado, verifique suas informações, ou tente novamente mais tarde");

  const value_pop_up = useRef(new Animated.Value(-500)).current;
  const value_pop_up_err = useRef(new Animated.Value(-500)).current;
  const value_progress_bar = useRef(new Animated.Value(0)).current;
  const value_fade_input= useRef(new Animated.Value(1)).current;

  const transition_time = 2000;
  const navigate_time = 3500;
  const show_pop_up_response = ()=>{
      Animated.timing(value_pop_up,{
          toValue: 0,
          duration: transition_time/2,
          useNativeDriver: false
      }).start();
    }

  const show_pop_up_err = ()=>{
      Animated.timing(value_pop_up_err,{
          toValue: 0,
          duration: transition_time/2,
          useNativeDriver: false
      }).start();
    }
  const resetPopUpErr = () => {
    Animated.timing(value_pop_up_err, {
      toValue: -500,
      duration: transition_time/4,
      useNativeDriver: false
    }).start();
  };

  const show_progress_bar = ()=>{
      Animated.timing(value_progress_bar,{
      toValue: 100,
      duration: transition_time,
      useNativeDriver: false
    }).start();
  }
  const fadeOut = () => {
    Animated.timing(value_fade_input, {
      toValue: 0,
      duration: transition_time/2,
      useNativeDriver: true,
    }).start();
  };

  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    if (EmailSent) {
      show_pop_up_response();
      show_progress_bar();
      fadeOut();

      setTimeout(() => {
        navigation.navigate("CRUD");
      }, navigate_time);
    }
  });

  const ForgotPassword_insert: React.FC = () => {
    const Form = useForm(["Email"], { Email: [{ method: "email" }] });

    const sendCode = async () => {
      console.log("Formulário validado: ", Form.getFormValidated());
      
      if (!Form.getFormValidated()){
        setMessageTxt("Email inválido");
        setInputErr(true);
        show_pop_up_err();
        setTimeout(() => {
          resetPopUpErr();
        }, 1500);
        return;
      }
      else
      {
        setInputErr(false);
        sendPasswordResetEmail(getAuth(), Form.Values.Email)
        .then(()=>{
          setMessageTxt("Um código de redefinição de senha foi enviado para o email informado com sucesso");
          setEmailSent(true);
        })
        .catch(()=>{
          setMessageTxt("Não foi possível enviar o código de redefinição de senha para o email informado, verifique suas informações, ou tente novamente mais tarde");
          setInputErr(true);
        })
      }
    };

    const Button1 = () => <BB text="Enviar" margin={10} action={sendCode} />;

    const pop_up = () =>{
      const pop_up_style = {
        top:value_pop_up.interpolate({
          inputRange:[-300,0],
          outputRange:[-300,100]
        })
      }
        return <Animated.View style={[styles.MessageContainer, pop_up_style]}>
                  <Text style={styles.Text}>{messageTxt}</Text>
                </Animated.View>
    }
    const pop_up_err = () =>{
      const pop_up_style_err = {
        top:value_pop_up_err.interpolate({
          inputRange:[-300,0],
          outputRange:[-300,-70]
        })
      }
        return <Animated.View style={[styles.MessageContainer, pop_up_style_err]}>
                  <Text style={styles.Text}>{messageTxt}</Text>
                </Animated.View>
    }
    const Progress_bar = () => <Animated.View style={[styles.Progress_bar,
      {
        width: value_progress_bar.interpolate({
          inputRange: [0, 100],
          outputRange: ['0%', '100%']
        })
      }
    ]}/>

    return (
      <View style={styles_comp.content}>
        <View style={styles_comp.Inputs}>
          {EmailSent && pop_up()}
          {inputErr && pop_up_err()}

          <Animated.View style={[styles_comp.Inputs, {opacity: value_fade_input}]}>
            <InputContainer
                form={Form.FormProp("Email")}
                placeholder="Email da sua conta"
                show_errors={false}
              />
            <View style={styles.Buttons}>
              {Button1()}
              <BB action={() => navigation.navigate("CRUD")} text="Voltar" width={100} height={50}/>
            </View>
          </Animated.View>

          {EmailSent && Progress_bar()}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.imgHeader}
          source={require("../../../assets/images/UFJF_extension_log_transparent.png")}
        />

        <ForgotPassword_insert />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ForgotPassword;
