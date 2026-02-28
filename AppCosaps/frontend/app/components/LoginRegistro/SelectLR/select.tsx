import {View,Text, TouchableOpacity, Image} from "react-native"
import { useState } from "react"

import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";

import login from "../Login/login";
import register_pacient from "../Register_pacient/Register_pacient";
import register_medic from "../register_medic/register_medic";

import LR_Props from "../props";
import styles from "./styles";


const Select :  React.FC<LR_Props> = (
  {
  set=null
}) => {
    const [show_reg, setShowReg] = useState(false);
    const style = styles();
    const selected_register= ()=>{
        return(
            <View style={style.center.st}>
            <Text style={style.text("#fff",30).st}>Selecione o tipo de conta que deseja criar:</Text>
            <View style={style.row.st}>
                <TouchableOpacity style={style.tou_op("#d3cded").st} onPress={()=>set(register_pacient)}>
                    <Text style={style.text().st}>Paciente</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.tou_op("#4c3780").st} onPress={()=>set(register_medic)}>
                    <Text style={style.text("#fff").st}>Médico</Text>
                </TouchableOpacity>
            </View>
            </View>
        )
    }

    return(
        <View style={style.container.st}>
            <View style={style.center.st}>
                <Text style={style.text("#fff",30).st}>Selecione o que deseja fazer:</Text>
                <View style={style.row.st}>
                    <TouchableOpacity style={style.tou_op("#d3cded").st} onPress={()=>set(login)}>
                        <Text style={style.text().st}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.tou_op("#4c3780").st} onPress={()=>setShowReg(!show_reg)}>
                        <Text style={style.text("#fff").st}>Cadastro</Text>
                    </TouchableOpacity>
                </View>
                {show_reg && selected_register()}
            </View>
        </View>
    )
}

export default Select;