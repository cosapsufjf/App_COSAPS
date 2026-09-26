import { View } from "react-native";

import { useForm } from "@/app/hooks/form/FixForm";
import { getAuth, sendPasswordResetEmail } from "@react-native-firebase/auth";
import { NavigationProp } from "@/app/types/navigation";
import { useNavigation } from "@react-navigation/native";

import { Pop_up, Pop_up_err, Progress_bar, show_pop_up_err, resetPopUpErr } from "./AnimatedComp";
import { animValues } from "@/app/interfaces/anim_values/anim_values";

import { useForgotPassword } from "@/app/hooks/forgotPasswd/HookFP";
import BB from "@/app/components/main_components/big_button/BB";
import InputContainer from "@/app/components/main_components/InputContainer/InputContainer";
import styles_comp from "@/app/pages/crud/sub-components/styles";
import styles from "../style";

const ForgotPasswordInsert: React.FC<animValues> = ({
  value_pop_up,
  value_pop_up_err,
  transition_time,
  value_progress_bar,
}) => {
  const Form = useForm(["Email"], { Email: [{ method: "email" }] });
  const navigation = useNavigation<NavigationProp>();
  const {
    EmailSent, setEmailSent,
    inputErr, setInputErr,
    messageTxt, setMessageTxt,
  } = useForgotPassword();

  const sendCode = async () => {
    if (!Form.getFormValidated()) {
      setMessageTxt("Email inválido");
      setInputErr(true);
      show_pop_up_err(value_pop_up_err, transition_time);
      setTimeout(() => resetPopUpErr(value_pop_up_err, transition_time), 2000);
      setEmailSent(false);
      return;
    }
    setInputErr(false);
    sendPasswordResetEmail(getAuth(), Form.Values.Email)
      .then(() => {
        setMessageTxt("Um código de redefinição de senha foi enviado para o email informado com sucesso");
        setEmailSent(true);
      })
      .catch((e: any) => {
        console.log(e);
        setMessageTxt("Não foi possível enviar o código de redefinição de senha para o email informado, verifique suas informações, ou tente novamente mais tarde");
        setInputErr(true);
      });
  };

  return (
    <View style={styles_comp.content}>
      <View style={styles_comp.Inputs}>
        <View style={[styles_comp.Inputs]}>
          <InputContainer
            form={Form.FormProp("Email")}
            placeholder="Email da sua conta"
            show_errors={false}
            width={"100%"}
          />
          <View style={styles.Buttons}>
            <BB text="Enviar" margin={10} action={sendCode} />
            <BB action={() => navigation.navigate("CRUD")} text="Voltar" width={100} height={50} />
          </View>
        </View>
      </View>

      <View style={styles.popUpOverlay}>
        {EmailSent && <Pop_up value_pop_up={value_pop_up} messageTxt={messageTxt} />}
        {inputErr && <Pop_up_err value_pop_up_err={value_pop_up_err} messageTxt={messageTxt} />}
      </View>

      {EmailSent && <Progress_bar value_progress_bar={value_progress_bar} />}
    </View>
  );
};

export default ForgotPasswordInsert;