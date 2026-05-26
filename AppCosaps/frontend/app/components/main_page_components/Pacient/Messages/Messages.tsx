import { Image,ScrollView, View,TouchableOpacity, Text } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import styles from "./styles";
import PacientArea from "../pacient_area/PacientArea";
//As mensagens tem que ser obtidas a partir do back-end e TODAS devem seguir esse padrão no front-end (ou similar)
type message_type = {
  user_name: string;
  last_message: string;
  last_message_time: string;
  unread_count: number;
  current_status: string;
  chat_id: number;
}



const Messages = () => {
  const cosaps_icon = require("@/assets/images/icon.png");
  const get_Messages = (): message_type[] => {
    const pacient_messages = /* await chamada mágica pro back-end */ [
      {
        user_name: "Test_user",
        last_message: "Conteúdo da última mensagem nsandalsndaadnashnfasfnlasn",
        last_message_time: "00:47",
        unread_count: 5,
        current_status: "Offline",
        chat_id: 1,
      },
      {
        user_name: "Test_user",
        last_message: "Conteúdo da última mensagem nsandalsndaadnashnfasfnlasn",
        last_message_time: "00:47",
        unread_count: 5,
        current_status: "Offline",
        chat_id: 2,
      },{
        user_name: "Test_user",
        last_message: "Conteúdo da última mensagem nsandalsndaadnashnfasfnlasn",
        last_message_time: "00:47",
        unread_count: 5,
        current_status: "Offline",
        chat_id: 3,
      },{
        user_name: "Test_user",
        last_message: "Conteúdo da última mensagem nsandalsndaadnashnfasfnlasn",
        last_message_time: "00:47",
        unread_count: 5,
        current_status: "Offline",
        chat_id: 4,
      },{
        user_name: "Test_user",
        last_message: "Conteúdo da última mensagem nsandalsndaadnashnfasfnlasn",
        last_message_time: "00:47",
        unread_count: 5,
        current_status: "Offline",
        chat_id: 5,
      },{
        user_name: "Test_user",
        last_message: "Conteúdo da última mensagem nsandalsndaadnashnfasfnlasn",
        last_message_time: "00:47",
        unread_count: 5,
        current_status: "Offline",
        chat_id: 6,
      },{
        user_name: "Test_user",
        last_message: "Conteúdo da última mensagem nsandalsndaadnashnfasfnlasn",
        last_message_time: "00:47",
        unread_count: 5,
        current_status: "Offline",
        chat_id: 7,
      },{
        user_name: "Test_user",
        last_message: "Conteúdo da última mensagem nsandalsndaadnashnfasfnlasn",
        last_message_time: "00:47",
        unread_count: 5,
        current_status: "Offline",
        chat_id: 8,
      },{
        user_name: "Test_user",
        last_message: "Conteúdo da última mensagem nsandalsndaadnashnfasfnlasn",
        last_message_time: "00:47",
        unread_count: 5,
        current_status: "Offline",
        chat_id: 9,
      },
    ];
    
    return pacient_messages;
  }
  
  const MessageTile: React.FC<message_type> = (content: message_type) => {
    return (
      <TouchableOpacity style={styles.Tile}>
        <View style={styles.emmet_cont}>
          <View style={styles.TileContent}>
            <Image source={cosaps_icon} style={styles.cosaps_icon} />
            
            <View style={styles.text_container}>
              <Text style={styles.big_text}>{content.user_name}</Text>
              <Text>{
                content.last_message.length > 45
                  ? content.last_message.substring(0, 45) + "..."
                  : content.last_message
              }</Text>
            </View>
          </View>
          
        </View>  
          <View style={styles.small_text_container}>
            <Text style={[styles.small_text, {
              color:content.current_status === "Online" ? "green" : "gray"}]}>
              {content.current_status}
            </Text>
            <Text style={styles.small_text}>{content.last_message_time}</Text>
          </View>
      </TouchableOpacity>
    );
  }
  
    return (
        <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
            <PacientArea />
              <ScrollView style={styles.messageTileContainer}>
                {get_Messages().map((message) => (
                  <MessageTile key={message.chat_id} {...message} />
                ))}
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default Messages;