import login from "./login/login";
import register_pacient from "./register/Register_pacient";
import register_medic from "./register/register_medic";
import Select from "./select_lr/select";

const crud_elements = {
  "Login": login,
  "Registro": register_pacient,
  "Medico": register_medic,
  "Select": Select,
}

export default crud_elements;
