import { StyleSheet } from "react-native"
import { Text, View,TextInput ,Button } from "react-native"
import { useState } from "react"
import FormState from "@/app/conf/Form"
import { cpf_replace_regex, cpf_replace, format_str } from "@/app/utils/regex"
import InputContainer from "@/app/components/InputContainer/InputContainer"
const style = StyleSheet.create({
    center:{
        height:500,
        alignItems:"center",
        justifyContent:"center"
    },
    input:{
        backgroundColor:"green"
    }
})

const TestPage: React.FC = () => {
    const testForm = FormState(["Teste"] as const)


    return(
        <View style={style.center}>
            <InputContainer 
            form={testForm.FormProp("Teste",["required","min"],undefined,8)}
            placeholder="testando"
            keyboard_type="numeric"
            format_regex={{regex:cpf_replace_regex,replace:cpf_replace}}
            />
            <Button title="testar" onPress={() => console.log(testForm.Form)}/>
        </View>
    )
}

export default TestPage;