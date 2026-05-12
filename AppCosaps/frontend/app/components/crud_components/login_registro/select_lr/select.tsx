import {View,Text, TouchableOpacity} from "react-native"
import { useState } from "react"

import styles from "./styles";
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
            <View style={style.center.st}>
            <Text style={style.text("#fff",30).st}>Selecione o tipo de conta que deseja criar:</Text>
            <View style={style.row.st}>
                <TouchableOpacity style={style.tou_op("#d3cded").st} onPress={()=>set(elements.Registro)}>
                    <Text style={style.text().st}>Paciente</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.tou_op("#4c3780").st} onPress={()=>set(elements.Medico)}>
                    <Text style={style.text("#fff").st}>Médico</Text>
                </TouchableOpacity>
            </View>
            </View>
        )
    }

    const select_login_register = () => {
        return(
            <View style={style.center.st}>
                <Text style={style.text("#fff",30).st}>Selecione o que deseja fazer:</Text>
                <View style={style.row.st}>
                    <TouchableOpacity style={style.tou_op("#d3cded").st} onPress={()=>set(elements.Login)}>
                        <Text style={style.text().st}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.tou_op("#4c3780").st} onPress={()=>setShowReg(!show_reg)}>
                        <Text style={style.text("#fff").st}>Cadastro</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return(
        <View style={style.container.st}>
            {!show_reg && select_login_register()}
            {show_reg && selected_register()}
        </View>
    )
}

export default Select;