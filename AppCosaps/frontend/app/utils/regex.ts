export const PhoneRegex = /\(([0-9]{2}|0{1}((x|[0-9]){2}[0-9]{2}))\)\s*[0-9]{3,4}[- ]*[0-9]{4}/;
export const cpf_replace_regex   = /([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{2})/g; 
export const cpf_regex = /[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}/;
export const emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;

export const cpf_replace = "$1.$2.$3-$4";

export const replacer = (match:string, p1: string, p2: string, p3: string, p4: string) => 
    {
        return p1 + "." + p2 + "." + p3 + "-" + p4
    };

export const format_str = (value:string, regex:RegExp, replace:string)=>{
    const r = value.replace(regex, replace);
    return r;
}

export const test_str = (value:string, regex:RegExp)=>{
    return regex.test(value);
}