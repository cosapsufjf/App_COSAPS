import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./types/navigation";
import { NavigationContainer } from "@react-navigation/native";

import Apresentation from "./pages/apresentation/Apresentation";
import CRUD from "./pages/crud/CRUD";
import ForgotPassword from "./pages/forgot_password/ForgotPassword";
import MainPage from "./pages/main_page/MainPage";
import FoodSearchScreen from "@/app/pages/food_calories/FoodCalories";

const Stack = createStackNavigator<RootStackParamList>();

function Stacked() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "fade" }}>
      <Stack.Screen name="MainPage" component={MainPage} />
      <Stack.Screen name="Apresentation" component={Apresentation} />
      <Stack.Screen name="CRUD" component={CRUD} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="FoodSearch" component={FoodSearchScreen} />
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
