import { Animated, Dimensions, Text } from "react-native";
import styles from "../style";

const SCREEN_HEIGHT = Dimensions.get("window").height;

const HIDDEN_OFFSET = SCREEN_HEIGHT;
const VISIBLE_OFFSET = 0;

export const show_pop_up_response = (
  value_pop_up: Animated.Value,
  transition_time: number,
  onFinish?: () => void,
) => {
  Animated.timing(value_pop_up, {
    toValue: VISIBLE_OFFSET,
    duration: transition_time / 2,
    useNativeDriver: true,
  }).start(() => {
    setTimeout(() => {
      Animated.timing(value_pop_up, {
        toValue: HIDDEN_OFFSET,
        duration: transition_time / 2,
        useNativeDriver: true,
      }).start(() => onFinish?.());
    }, 2000);
  });
};

export const show_pop_up_err = (
  value_pop_up_err: Animated.Value,
  transition_time: number,
) => {
  Animated.timing(value_pop_up_err, {
    toValue: VISIBLE_OFFSET,
    duration: transition_time / 2,
    useNativeDriver: true,
  }).start();
};

export const resetPopUpErr = (
  value_pop_up_err: Animated.Value,
  transition_time: number,
) => {
  Animated.timing(value_pop_up_err, {
    toValue: HIDDEN_OFFSET,
    duration: transition_time / 4,
    useNativeDriver: true,
  }).start();
};

export const show_progress_bar = (
  value_progress_bar: Animated.Value,
  transition_time: number,
) => {
  Animated.timing(value_progress_bar, {
    toValue: 100,
    duration: transition_time,
    useNativeDriver: false,
  }).start();
};

export const fadeOut = (
  value_fade_input: Animated.Value,
  transition_time: number,
) => {
  Animated.timing(value_fade_input, {
    toValue: 0,
    duration: transition_time / 2,
    useNativeDriver: true,
  }).start();
};

export const Pop_up = ({
  value_pop_up,
  messageTxt,
}: {
  value_pop_up: Animated.Value;
  messageTxt: string;
}) => (
  <Animated.View
    style={[
      styles.MessageContainer,
      { transform: [{ translateY: value_pop_up }] },
    ]}
  >
    <Text style={styles.Text}>{messageTxt}</Text>
  </Animated.View>
);

export const Pop_up_err = ({
  value_pop_up_err,
  messageTxt,
}: {
  value_pop_up_err: Animated.Value;
  messageTxt: string;
}) => (
  <Animated.View
    style={[
      styles.MessageContainer,
      { transform: [{ translateY: value_pop_up_err }] },
    ]}
  >
    <Text style={styles.Text}>{messageTxt}</Text>
  </Animated.View>
);

export const Progress_bar = ({
  value_progress_bar,
}: {
  value_progress_bar: Animated.Value;
}) => (
  <Animated.View
    style={[
      styles.Progress_bar,
      {
        width: value_progress_bar.interpolate({
          inputRange: [0, 100],
          outputRange: ["0%", "100%"],
        }),
      },
    ]}
  />
);