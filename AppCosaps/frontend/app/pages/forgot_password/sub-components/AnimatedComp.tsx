import { Animated, Text } from "react-native";
import {useForgotPassword} from "@/app/hooks/forgotPasswd/HookFP";
import styles  from "../style";

export const show_pop_up_response = (value_pop_up: Animated.Value, transition_time: number) => {
  Animated.timing(value_pop_up, {
    toValue: 0,
    duration: transition_time/2,
    useNativeDriver: false
  }).start();
  }

export const show_pop_up_err = (value_pop_up_err: Animated.Value, transition_time: number) => {
  Animated.timing(value_pop_up_err, {
    toValue: 0,
    duration: transition_time/2,
    useNativeDriver: false
  }).start();
};

export const resetPopUpErr = (value_pop_up_err: Animated.Value, transition_time: number) => {
  Animated.timing(value_pop_up_err, {
    toValue: -500,
    duration: transition_time/4,
    useNativeDriver: false
  }).start();
};

export const show_progress_bar = (value_progress_bar: Animated.Value, transition_time: number) => {
  Animated.timing(value_progress_bar, {
    toValue: 100,
    duration: transition_time,
    useNativeDriver: false
  }).start();
};

export const fadeOut = (value_fade_input: Animated.Value, transition_time: number) => {
  Animated.timing(value_fade_input, {
    toValue: 0,
    duration: transition_time/2,
    useNativeDriver: true,
  }).start();
};


export const Pop_up = ({ value_pop_up, messageTxt }: { value_pop_up: Animated.Value, messageTxt: string }) => {
  
  const pop_up_style = {
    top:value_pop_up.interpolate({
      inputRange:[-500,0],
      outputRange:[-500,100]
    })
  }
    return <Animated.View style={[styles.MessageContainer, pop_up_style]}>
              <Text style={styles.Text}>{messageTxt}</Text>
            </Animated.View>
}

export const Pop_up_err = ({ value_pop_up_err, messageTxt }: { value_pop_up_err: Animated.Value, messageTxt: string }) => {
  console.log("2: ",messageTxt)
  const pop_up_style_err = {
    top:value_pop_up_err.interpolate({
      inputRange:[-500,0],
      outputRange:[-10,-70]
    })
  }
    return <Animated.View style={[styles.MessageContainer, pop_up_style_err]}>
              <Text style={styles.Text}>{messageTxt}</Text>
            </Animated.View>
}

export const Progress_bar = ({ value_progress_bar }: { value_progress_bar: Animated.Value }) => <Animated.View style={[styles.Progress_bar,
  {
    width: value_progress_bar.interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '100%']
    })
  }
]}/>