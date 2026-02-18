import { StackNavigationProp } from "@react-navigation/stack";
export type RootStackParamList = {
    CRUD: undefined;
    ForgotPassword: undefined;
    MainPage: undefined;
};

export type NavigationProp = StackNavigationProp<RootStackParamList>;