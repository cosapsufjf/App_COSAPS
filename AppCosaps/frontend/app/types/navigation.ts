import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  LayoutMainContent: undefined;
  testPage: undefined;

  Apresentation: undefined;
  CRUD: undefined;
  ForgotPassword: undefined;
  MainPage: undefined;

  FoodSearch: undefined;
  Messages: undefined;
  Routine: undefined;
  Activities: undefined;
  Account: undefined;
};

export type NavigationProp = StackNavigationProp<RootStackParamList>;