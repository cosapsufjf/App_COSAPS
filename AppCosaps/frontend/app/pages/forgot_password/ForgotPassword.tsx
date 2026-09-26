import { Image, Animated, Dimensions } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useMemo } from "react";
import { NavigationProp } from "@/app/types/navigation";
import { useNavigation } from "@react-navigation/native";

import { useForgotPassword, ForgotPasswordProvider } from "@/app/hooks/forgotPasswd/HookFP";
import ForgotPasswordInsert from "./sub-components/ForgotPasswordIns";
import { show_pop_up_response } from "./sub-components/AnimatedComp";
import styles from "./style";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const TRANSITION_TIME = 800;

const PageContent = () => {
  const value_pop_up = useMemo(() => new Animated.Value(SCREEN_HEIGHT), []);
  const value_pop_up_err = useMemo(() => new Animated.Value(SCREEN_HEIGHT), []);
  const value_progress_bar = useMemo(() => new Animated.Value(0), []);
  const value_fade_input = useMemo(() => new Animated.Value(1), []);

  const { EmailSent } = useForgotPassword();
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    if (!EmailSent) return;

    show_pop_up_response(value_pop_up, TRANSITION_TIME, () => {
      Animated.timing(value_fade_input, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => navigation.navigate("CRUD"), 300);
      });
    });
  }, [EmailSent, value_pop_up, value_fade_input, navigation]);

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
        transition_time={TRANSITION_TIME}
        navigate_time={3500}
        value_fade_input={value_fade_input}
      />
    </SafeAreaView>
  );
};

const ForgotPassword: React.FC = () => (
  <SafeAreaProvider style={styles.container}>
    <ForgotPasswordProvider>
      <PageContent />
    </ForgotPasswordProvider>
  </SafeAreaProvider>
);

export default ForgotPassword;