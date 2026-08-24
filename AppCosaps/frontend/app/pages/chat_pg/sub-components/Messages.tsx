import { Image,ScrollView, View,TouchableOpacity, Text } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import styles from "./styles";
import PacientArea from "@/app/components/main_page_components/pacient_area/PacientArea";
import { message_frontview } from "@/app/types/message";
import { get_Messages } from "@/app/api/chat";
import { NavigationProp } from "@/app/types/navigation";
import { useNavigation } from "@react-navigation/native";
import ManageStorage from "@/app/conf/AsyncStorage";

const Messages = () => {
  const cosaps_icon = require("@/assets/images/icon.png");
  const navigation: NavigationProp = useNavigation();

  const OpenChat = async (chat_id: string) => {
    try {
      await ManageStorage.Save_In_Async_Storage("last_chat", chat_id);
      navigation.navigate("Chat");
    } catch (error: any) {
      console.log("Falha ao salvar no async storage\n");
      console.error(error.message);
    }
  };
  
  const MessageTile: React.FC<message_frontview> = (content: message_frontview) => {
    return (
      <TouchableOpacity style={styles.Tile} onPress={()=>OpenChat(content.chat_id)}>
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