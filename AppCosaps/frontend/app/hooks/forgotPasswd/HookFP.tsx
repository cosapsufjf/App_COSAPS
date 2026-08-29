import { createContext, useContext, useState, ReactNode } from "react";

interface ForgotPasswordState {
  EmailSent: boolean;
  setEmailSent: React.Dispatch<React.SetStateAction<boolean>>;
  inputErr: boolean;
  setInputErr: React.Dispatch<React.SetStateAction<boolean>>;
  messageTxt: string;
  setMessageTxt: React.Dispatch<React.SetStateAction<string>>;
}

const ForgotPasswordContext = createContext<ForgotPasswordState | null>(null);

export const ForgotPasswordProvider = ({ children }: { children: ReactNode }) => {
  const [EmailSent, setEmailSent] = useState(false);
  const [inputErr, setInputErr] = useState(false);
  const [messageTxt, setMessageTxt] = useState(
    "Não foi possível enviar o código de redefinição para o email informado, verifique suas informações, ou tente novamente mais tarde"
  );

  return (
    <ForgotPasswordContext.Provider value={{ EmailSent, setEmailSent, inputErr, setInputErr, messageTxt, setMessageTxt }}>
      {children}
    </ForgotPasswordContext.Provider>
  );
};

export const useForgotPassword = () => {
  const ctx = useContext(ForgotPasswordContext);
  if (!ctx) throw new Error("useForgotPassword deve estar dentro de ForgotPasswordProvider");
  return ctx;
};