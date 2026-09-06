import { View, Text, ScrollView } from "react-native";
import { useState } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import ManageStorage from "@/app/conf/AsyncStorage";
import InputContainer from "@/app/components/main_components/InputContainer/InputContainer";
import BB from "@/app/components/main_components/big_button/BB";

import MainHeader from "@/app/components/main_page_components/main_header/main_header";
import PacientArea from "@/app/components/main_page_components/pacient_area/PacientArea";
import { Message } from "@/app/types/message";
import { add_message, get_Conversations } from "@/app/api/chat";

import style from "../styles";


const Chat_Pg: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  const [chat_id, setChatId] = useState<string | null>(null);
  const [logged_user, setLoggedUser] = useState<string | null>(null);
  const [receiver, setReceiver] = useState<string | null>(null);
  
  const [error, setError] = useState<string | null>(null);
  
  const loadMessages = async () => {
    try {
      const chat_id = await ManageStorage.get_From_Async_Storage("last_chat");
      setChatId(chat_id);
      
      const logged_user = await ManageStorage.get_From_Async_Storage("Logged_user");
      setLoggedUser(logged_user);      
      if (chat_id) {
        const messages = get_Conversations(chat_id);
        setReceiver(messages[0]?.receiver === logged_user ? messages[0]?.sender : messages[0]?.receiver);
        setMessages(messages);
      }
    }
    catch{
      setError("Não foi possível carregar as mensagens");
    }
  };

  if (!messages.length) 
    loadMessages();
  

  const sendMessage = () => {
    if (chat_id && receiver && logged_user) {
      add_message(chat_id, input, logged_user, receiver);
      setInput("");
      setMessages(get_Conversations(Number(chat_id)));
    }
  };

  const sendBtn = () => {
    return <BB text="Enviar" width={90} height={"auto"} inline={true} action={() => sendMessage()} />;
  };
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={style.container}>

        <ScrollView>
          {messages.map((message, index) => (
            <View key={index}>
              <View style={[style.messageContainer, message.sender === logged_user ? { flexDirection: "row" } : { flexDirection: "row-reverse" }]}>
                <View style={style.message}>
                  <Text>
                    {message.content}
                  </Text>                  
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
        <InputContainer position="absolute" bottom={30} width={463} height={70}
        extra_component={sendBtn}
        inline_extra_component={true}
        text_state_setter={setInput}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Chat_Pg;