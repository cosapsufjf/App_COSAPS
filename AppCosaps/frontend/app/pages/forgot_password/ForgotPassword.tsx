import { Image, Animated} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import {  useEffect, useMemo } from "react";
import { show_pop_up_response, show_progress_bar, fadeOut } from "./sub-components/AnimatedComp";

import { NavigationProp } from "@/app/types/navigation";
import { useNavigation } from "@react-navigation/native";

import { useForgotPassword, ForgotPasswordProvider } from "@/app/hooks/forgotPasswd/HookFP";
import ForgotPasswordInsert from "./sub-components/ForgotPasswordIns";
import styles from "./style";


const PageContent = () => {
  const value_pop_up = useMemo(() => new Animated.Value(-1500), []);
  const value_pop_up_err = useMemo(() => new Animated.Value(1500), []);
  const value_progress_bar = useMemo(() => new Animated.Value(0), []);
  const value_fade_input = useMemo(() => new Animated.Value(1), []);
  const transition_time = 2000;
  const navigate_time = 3500;
  
  const {
    EmailSent,
  } = useForgotPassword();
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    if (EmailSent) {
      Animated.sequence([
        // 1. Pop-up sobe (1000ms)
        Animated.timing(value_pop_up, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false
        }),
        
        // 2. Espera com popup visível (2000ms)
        Animated.delay(2000),
        
        // 3. Pop-up desce/vai pra fora (1000ms)
        Animated.timing(value_pop_up, {
          toValue: -500,
          duration: 1000,
          useNativeDriver: false
        }),
        
        // 4. Fade out do input (1000ms)
        Animated.timing(value_fade_input, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true
        })
      ]).start(() => {
        // 5. Navegação após tudo terminar
        setTimeout(() => {
          navigation.navigate("CRUD");
        }, 500);
      });
    }
  }, [EmailSent]);
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.imgHeader}
        source={require("../../../assets/images/UFJF_extension_log_transparent.png")}
      />
      <ForgotPasswordInsert
        value_pop_up={value_pop_up}
        value_pop_up_err={value_pop_up_err}
        value_progress_bar={value_progress_bar}
        transition_time={transition_time}
        navigate_time={navigate_time}
        value_fade_input={value_fade_input}
      />
    </SafeAreaView>
    );
};
const ForgotPassword: React.FC = () => {


  return (
    <SafeAreaProvider style={styles.container}>
      <ForgotPasswordProvider>
        <PageContent />
      </ForgotPasswordProvider>
    </SafeAreaProvider>
  );
};

export default ForgotPassword;
