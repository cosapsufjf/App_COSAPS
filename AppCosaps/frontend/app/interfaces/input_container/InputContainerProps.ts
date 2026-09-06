import { KeyboardTypeOptions } from "react-native";
import { FormProps } from "@/app/types/form";

export interface InputContainerProps {
    form?: FormProps,
    get_value_from_storage?: {get: boolean, item: string, field: string},

    value?: string,
    extra_component?: any,
    inline_extra_component?: boolean,
    format_regex?:{regex:RegExp,replace:string},
    text_state_setter?: React.Dispatch<React.SetStateAction<string>> | null,

    keyboard_type?: KeyboardTypeOptions,
    secureTextEntry?: boolean,

    show_errors?: boolean,
    el_text?:string,
    placeholder?:string,
    
    width?:number | string,
    height?:number | string,
    margin?:number | string,
    margin_top?:number | string,
    background_color?: string,
    position?: string,
    bottom?: number | string,
}
