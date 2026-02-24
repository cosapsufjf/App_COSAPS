const PhoneRegex = /\(([0-9]{2}|0{1}((x|[0-9]){2}[0-9]{2}))\)\s*[0-9]{3,4}[- ]*[0-9]{4}/;
const cpf_regex = /[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}/;
const cpf_replace_regex= /([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{2})/g;
const emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;

const cpf_replace = "$1.$2.$3-$4";


const format_str = (value, regex, replace)=>{
    console.log("func format: ",value);
    const r = value.replace(regex, replace);
    console.log("Saiu da func: ",r);
    return r;
}

const test_str = (value, regex)=>{
    return regex.test(value);
}


console.log(format_str("10420929665",cpf_replace_regex,cpf_replace))
console.log(format_str("juninho 22",/[0-9]{2}/,"25"))
