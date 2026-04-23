import { createStackNavigator } from "@react-navigation/stack";
import CRUD from "./pages/crud/CRUD";
import ForgotPassword from "./pages/forgot_password/ForgotPassword";
import MainPage from "./pages/main_page/MainPage";
import LayoutMainContent from "./pages/layout_main_content";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from "./types/navigation";

const Stack = createStackNavigator<RootStackParamList>();

function Stacked() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LayoutMainContent" component={LayoutMainContent} />
      <Stack.Screen name="MainPage" component={MainPage} />
      <Stack.Screen name="CRUD" component={CRUD} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}

export default function App() {
  return <Stacked />;
}
