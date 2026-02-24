import { StackNavigationProp } from "@react-navigation/stack";
export type RootStackParamList = {
    testPage: undefined;
    CRUD: undefined;
    ForgotPassword: undefined;
    MainPage: undefined;
};

export type NavigationProp = StackNavigationProp<RootStackParamList>;