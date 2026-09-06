import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./types/navigation";
import { NavigationContainer } from "@react-navigation/native";

import Test from "./pages/test/Test";

import Apresentation from "./pages/apresentation/Apresentation";
import CRUD from "./pages/crud/CRUD";
import ForgotPassword from "./pages/forgot_password/ForgotPassword";

import MainPage from "./pages/main_page/MainPage";
import FoodSearchScreen from "@/app/pages/food_calories/FoodCalories";
import Messages from "./pages/chat_pg/Messages";
import Chat from "./pages/chat_pg/sub-components/Chat_Pg";
import Sleep from "./pages/sleep_quality/Sleep";
import Diet from "./pages/diet/Diet";
import Activities from "./pages/activities/Activies";

const Stack = createStackNavigator<RootStackParamList>();

function Stacked() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "fade" }}>
      <Stack.Screen name="Apresentation" component={Apresentation} />
      <Stack.Screen name="CRUD" component={CRUD} />
      <Stack.Screen name="MainPage" component={MainPage} />
      <Stack.Screen name="Activities" component={Activities} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="FoodSearch" component={FoodSearchScreen} />
      <Stack.Screen name="Diet" component={Diet} />
      <Stack.Screen name="SleepQuality" component={Sleep} />
      <Stack.Screen name="Chat" component={Chat}/>
      <Stack.Screen name="Messages" component={Messages} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stacked/>      
    </NavigationContainer>
  )
}
