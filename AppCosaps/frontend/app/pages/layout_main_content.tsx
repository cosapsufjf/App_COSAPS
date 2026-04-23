import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { View, Platform, Image } from "react-native";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import { PlatformPressable, Text } from "@react-navigation/elements";

import MainPage from "./main_page/MainPage";
import Menu from "./menu/Menu";
import Routine from "./routine/Routine";
import Chat_pg from "./chat_pg/Chat_pg";
import Profile from "./profile/Profile";

import colors_app from "../conf/colors";

const MyTabBar: React.FC<{ state: any; descriptors: any; navigation: any }> = ({
  state,
  descriptors,
  navigation,
}) => {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  return (
    <View
      style={{
        flexDirection: "row",
        height: 150,
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

        const iconElement = options.tabBarIcon?.({
            focused: isFocused,
            color: isFocused ? "#007AFF" : "#999",
            size: 25,
        })

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
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {iconElement && (
              <View style={{ marginBottom: 4 }}>
                {iconElement}
              </View>
            )}
            <Text
              style={{
                color: isFocused ? "#007AFF" : "#999", 
                fontSize: 20, 
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

const iconMap: Record<string, { focused: any; unfocused: any }> = {
  Home: {
    focused: require("@/assets/images/activity_icon.png"),
    unfocused: require("@/assets/images/activity_icon.png"),
  },
  Menu: {
    focused: require("@/assets/images/activity_icon.png"),
    unfocused: require("@/assets/images/activity_icon.png"),
  },
  Rotina: {
    focused: require("@/assets/images/activity_icon.png"),
    unfocused: require("@/assets/images/activity_icon.png"),
  },
  Chat: {
    focused: require("@/assets/images/activity_icon.png"),
    unfocused: require("@/assets/images/activity_icon.png"),
  },
  Perfil: {
    focused: require("@/assets/images/activity_icon.png"),
    unfocused: require("@/assets/images/activity_icon.png"),
  },
};

const getTabBarIcon = (routeName: string, focused: boolean, color: string, size: number) => (
  <Image
    source={focused ? iconMap[routeName].focused : iconMap[routeName].unfocused}
    style={{ width: size, height: size, tintColor: color }}
  />
);

export default function LayoutMainContent() {
  return (

    <Tab.Navigator
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={({ route }) => ({
        headerShown: false,
        animation: "shift",
        tabBarIcon: ({ focused, color, size }) =>
          getTabBarIcon(route.name, focused, color, size),
      })}>

      <Tab.Screen name="Home" component={MainPage} />
      <Tab.Screen name="Menu" component={Menu} />
      <Tab.Screen name="Rotina" component={Routine} />
      <Tab.Screen name="Chat" component={Chat_pg} />
      <Tab.Screen name="Perfil" component={Profile} />
    </Tab.Navigator>
  );
}
