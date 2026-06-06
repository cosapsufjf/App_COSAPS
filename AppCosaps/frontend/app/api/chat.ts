
import { Message,message_frontview } from "@/app/types/message";

// TODO IMPLEMENTAR A API DE CHAT -> SOCKET.IO

const conversations: Record<string, { messages: Message[] }> = {};

export const get_Conversations = (id: number): Message[] => {
  conversations[id] = {
    messages: [
    {
      sender: "Test_user1",
      receiver:"Test_user2",
      content: "Lorem ipsum curae ut aliquam felis blandit nullt",
      status: true,
      timestamp:"22:47", 
      date:"27/10/2026"
    },{
      sender: "Test_user1",
      receiver:"Test_user2",
      content: "uam inceptos, tristique quam quisque praesent eros est sollicitudin ",
      status: true,
      timestamp:"22:48", 
      date:"27/10/2026"
    },{
      sender: "Test_user1",
      receiver:"Test_user2",
      content: "emper non arcu quam senectus proin vivamus, iaculis aliquam sed ege",
      status: true,
      timestamp:"23:10", 
      date:"27/10/2026"
    },{
      sender: "Test_user2",
      receiver:"Test_user1",
      content: "Teste",
      status: true,
      timestamp:"23:15", 
      date:"27/10/2026"
    },{
      sender: "Test_user1",
      receiver:"Test_user2",
      content: "consequat ac odio. porttitor aenean ad senectus lectus facilisis, iaculis senectus rutru",
      status: true,
      timestamp:"23:20", 
      date:"27/10/2026"
    },{
      sender: "Test_user2",
      receiver:"Test_user1",
      content: "Testando",
      status: true,
      timestamp: "00:50",
      date: "27/10/2026"
    },
      ,{
        sender: "Test_user2",
        receiver:"Test_user1",
        content: "Testando Exemplo",
        status: true,
        timestamp: "00:50",
        date: "27/10/2026"
      }
  ],
};
  
  // só para testes
  return conversations[id]?.messages
};


export const add_message = (conversation_id: string, content: string, sender: string, receiver: string) => {
  const newMessage: Message = {
    sender,
    receiver,
    content,
    status: true,
    timestamp: new Date().toLocaleTimeString(),
    date: new Date().toLocaleDateString(),
  };
  
  conversations[conversation_id].messages.push(newMessage);
};

//Utiliza a função de get_Conversations para obter a ultima mensagem enviada
//ou localStorage, ou similar
export const get_Messages = (): message_frontview[] => {
  const pacient_messages = /* await chamada mágica pro back-end */ [
    {
      user_name: "Test_user",
      last_message: "Conteúdo da última mensagem nsandalsndaadnashnfasfnlasn",
      last_message_time: "00:47",
      current_status: "Offline",
      chat_id: '1',
    },
    {
      user_name: "Test_user",
      last_message: "Conteúdo da última mensagem nsandalsndaadnashnfasfnlasn",
      last_message_time: "00:47",
      current_status: "Offline",
      chat_id: '2',
    },{
      user_name: "Test_user",
      last_message: "Conteúdo da última mensagem nsandalsndaadnashnfasfnlasn",
      last_message_time: "00:47",
      current_status: "Offline",
      chat_id: '3',
    },{
      user_name: "Test_user",
      last_message: "Conteúdo da última mensagem nsandalsndaadnashnfasfnlasn",
      last_message_time: "00:47",
      current_status: "Offline",
      chat_id: '4',
    },{
      user_name: "Test_user",
      last_message: "Conteúdo da última mensagem nsandalsndaadnashnfasfnlasn",
      last_message_time: "00:47",
      current_status: "Offline",
      chat_id: '5',
    },{
      user_name: "Test_user",
      last_message: "Conteúdo da última mensagem nsandalsndaadnashnfasfnlasn",
      last_message_time: "00:47",
      current_status: "Offline",
      chat_id: '6',
    },{
      user_name: "Test_user",
      last_message: "Conteúdo da última mensagem nsandalsndaadnashnfasfnlasn",
      last_message_time: "00:47",
      current_status: "Offline",
      chat_id: '7',
    },{
      user_name: "Test_user",
      last_message: "Conteúdo da última mensagem nsandalsndaadnashnfasfnlasn",
      last_message_time: "00:47",
      current_status: "Offline",
      chat_id: '8',
    },{
      user_name: "Test_user",
      last_message: "Conteúdo da última mensagem nsandalsndaadnashnfasfnlasn",
      last_message_time: "00:47",
      current_status: "Offline",
      chat_id: '9',
    },
    {
      user_name: "Test_user",
      last_message: "Conteúdo da última mensagem nsandalsndaadnashnfasfnlasn",
      last_message_time: "00:47",
      current_status: "Offline",
      chat_id: '10',
    },
    {
      user_name: "Test_user",
      last_message: "Conteúdo da última mensagem nsandalsndaadnashnfasfnlasn",
      last_message_time: "00:47",
      current_status: "Offline",
      chat_id: '11',
    },
  ];

  return pacient_messages;
}