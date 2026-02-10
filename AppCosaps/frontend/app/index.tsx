import { createStackNavigator } from "@react-navigation/stack";
import CRUD from "./pages/CRUD/CRUD";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import { RootStackParamList } from "./types/navigation";

const Stack = createStackNavigator<RootStackParamList>();

function Stacked() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CRUD" component={CRUD} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}

export default function App() {
  return <Stacked />;
}
