import { Animated } from "react-native";

export interface animValues{
  value_pop_up: Animated.Value;
  value_pop_up_err: Animated.Value;
  value_progress_bar: Animated.Value;
  value_fade_input: Animated.Value;
  transition_time: number;
  navigate_time: number;
}
