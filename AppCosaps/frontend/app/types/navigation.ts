import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  LayoutMainContent: undefined;
  testPage: undefined;

  Apresentation: undefined;
  CRUD: undefined;
  ForgotPassword: undefined;
  MainPage: undefined;


  SleepQuality: undefined;
  FoodSearch: undefined;
  Messages: undefined;
  Chat: undefined;
  Routine: undefined;
  Activities: undefined;
  Diet: undefined;
  Account: undefined;
};

export type NavigationProp = StackNavigationProp<RootStackParamList>;