import { createStackNavigator } from "@react-navigation/stack";
import CRUD from "./pages/CRUD/CRUD";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import MainPage from "./pages/MainPage/MainPage";
import { RootStackParamList } from "./types/navigation";

const Stack = createStackNavigator<RootStackParamList>();

function Stacked() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CRUD" component={CRUD} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="MainPage" component={MainPage} />
    </Stack.Navigator>
  );
}

export default function App() {
  return <Stacked />;
}
