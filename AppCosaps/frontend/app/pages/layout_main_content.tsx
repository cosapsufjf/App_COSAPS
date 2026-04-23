import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import { useLinkBuilder } from "@react-navigation/native";
import { Image, Platform, Text, View } from "react-native";

import Chat_pg from "./chat_pg/Chat_pg";
import MainPage from "./main_page/MainPage";
import Menu from "./menu/Menu";
import Profile from "./profile/Profile";
import Routine from "./routine/Routine";

import colors_app from "../conf/colors";


const MyTabBar: React.FC<{ state: any; descriptors: any; navigation: any }> = ({
  state,
  descriptors,
  navigation,
}) => {
  const { buildHref } = useLinkBuilder();

  return (
    <View
      style={{
        flexDirection: "row",
        height: "10%",
        backgroundColor: colors_app.Fundo_Claro_2,
        borderTopWidth: 1,
        borderTopColor: colors_app.Cor_5,
        paddingBottom: Platform.OS === "ios" ? 10 : 0,
      }}
    >
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={route.key}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: isFocused ? "#007AFF" : "#999",
                fontSize: 23,
                fontWeight: isFocused ? "600" : "400",
              }}
            >
              {label}
            </Text>
            
          </PlatformPressable>
        );
      })}
    </View>
  );
};

const Tab = createBottomTabNavigator();

const iconMap: Record<string, { focused: any }> = {
  Home: {
    focused: require("../../assets/images/activity_icon.png"),
  },
  Menu: {
    focused: require("../../assets/images/activity_icon.png"),
  },
  Rotina: {
    focused: require("../../assets/images/activity_icon.png"),
  },
  Chat: {
    focused: require("../../assets/images/activity_icon.png"),
  },
  Perfil: {
    focused: require("../../assets/images/activity_icon.png"),
  },
};

const getTabBarIcon = (
  routeName: string,
  focused: boolean,
  color: string,
  size: number,
) => {
  return (
    <Image
      source={iconMap[routeName].focused}
      style={{ width: size, height: size, tintColor: color }}
    />
  );
};

export default function LayoutMainContent() {
  return (
    <Tab.Navigator
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={({ route }) => ({
        headerShown: false,
        animation: "shift",
        tabBarIcon: ({ focused, color, size }) =>
          getTabBarIcon(route.name, focused, color, size),
      })}
    >
      <Tab.Screen name="Home" component={MainPage} />
      <Tab.Screen name="Menu" component={Menu} />
      <Tab.Screen name="Rotina" component={Routine} />
      <Tab.Screen name="Chat" component={Chat_pg} />
      <Tab.Screen name="Perfil" component={Profile} />
    </Tab.Navigator>
  );
}
