import {View,Text, TouchableOpacity} from "react-native"
import { useState } from "react"

import styles from "./styles";
import {Colors, BaseStyles} from "@/app/MainStyle";
import LR_Props from "../../../../types/crud";

const Select :  React.FC<LR_Props> = (
  {
    set = null,
    elements = null
}) => {
    const [show_reg, setShowReg] = useState(false);
    const style = styles();
    const selected_register= ()=>{
        return(
          <View style={[BaseStyles.fullScreenContainer, BaseStyles.border_radius_medium]}>
            <Text style={[BaseStyles.whiteText, { fontSize: 30 }]}>Selecione o tipo de conta que deseja criar:</Text>
            <View style={[BaseStyles.fullScreenContainer, BaseStyles.row]}>
              <TouchableOpacity style={[BaseStyles.Pressable, { backgroundColor: Colors.Cor_6 }]} onPress={() => set(elements.Registro)}>
                    <Text style={[BaseStyles.whiteText,{ fontSize: 30 }]}>Paciente</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[BaseStyles.Pressable, { backgroundColor: Colors.Cor_4 }]} onPress={()=>set(elements.Medico)}>
                    <Text style={[BaseStyles.whiteText,{ fontSize: 30 }]}>Médico</Text>
                </TouchableOpacity>
            </View>
            </View>
        )
    }

    const select_login_register = () => {
        return(
            <View style={[BaseStyles.fullScreenContainer, BaseStyles.border_radius_medium]}>
                <Text style={[BaseStyles.whiteText, { fontSize: 30 }]}>Selecione o que deseja fazer:</Text>
                <View style={[BaseStyles.fullScreenContainer, BaseStyles.row]}>
                    <TouchableOpacity style={[BaseStyles.Pressable, { backgroundColor: Colors.Cor_6 }]} onPress={()=>set(elements.Login)}>
                        <Text style={[BaseStyles.whiteText, { fontSize: 30 }]}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[BaseStyles.Pressable, { backgroundColor: Colors.Cor_4 }]} onPress={()=>setShowReg(!show_reg)}>
                        <Text style={[BaseStyles.whiteText, { fontSize: 30 }]}>Cadastro</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return(
        <View>
            {!show_reg && select_login_register()}
            {show_reg && selected_register()}
        </View>
    )
}

export default Select;