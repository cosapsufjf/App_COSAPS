import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import Apresentation from "./components/Apresentation/Apresentation";
import CRUD from "./pages/CRUD/CRUD";

const Stack = createStackNavigator();

function Stacked() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CRUD" component={CRUD} />
    </Stack.Navigator>
  );
}

export default function App() {
  return <Stacked />;
}
