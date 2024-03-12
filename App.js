import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterScreen from "./src/screens/RegisterScreen";
import "react-native-svg";
import { useAuth } from "./src/context/AuthContext";
import LoginScreen from "./src/screens/LoginScreen";
import { AuthProvider } from "./src/context/AuthContext";
import GetStartedScreen from "./src/screens/GetStartedScreen";
import { LoadingProvider } from "./src/context/LoadingContext";
import HomeScreen from "./src/screens/HomeScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import WalletScreen from "./src/screens/WalletScreen";
import MyPicturesScreen from "./src/screens/MyPicturesScreen";
import WithdrawalScreen from "./src/screens/WithdrawalScreen";
import SalesScreen from "./src/screens/SalesScreen";
import { DesignProvider } from "./src/context/DesignContext";
import { MessageProvider } from "./src/context/MessageContext";
import { useFonts } from "expo-font";
import { View, Text } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MessageScreen from "./src/screens/MessageScreen";
import { LogBox } from "react-native";

const Stack = createStackNavigator();
LogBox.ignoreLogs([
    "Sending `onAnimatedValueUpdate` with no listeners registered.",
    "Provided value to SecureStore is larger than 2048 bytes. An attempt to store such a value will throw an error in SDK 35.",
]);

const App = () => {
    const [loaded] = useFonts({
        DMSans_Medium: require("./assets/fonts/DMSans-Medium.ttf"),
        DMSans_Bold: require("./assets/fonts/DMSans-Bold.ttf"),
        DMSans_Regular: require("./assets/fonts/DMSans-Regular.ttf"),
        DMSans_Light: require("./assets/fonts/DMSans-Light.ttf"),
        DMSans_Black: require("./assets/fonts/DMSans-Black.ttf"),
        DMSans_Italic: require("./assets/fonts/DMSans-Italic.ttf"),
        DMSans_MediumItalic: require("./assets/fonts/DMSans-MediumItalic.ttf"),
        DMSansB_oldItalic: require("./assets/fonts/DMSans-BoldItalic.ttf"),
        DMSans_LightItalic: require("./assets/fonts/DMSans-LightItalic.ttf"),
        DMSans_BlackItalic: require("./assets/fonts/DMSans-BlackItalic.ttf"),
        DMSans_ExtraLight: require("./assets/fonts/DMSans-ExtraLight.ttf"),
        DMSans_ExtraLightItalic: require("./assets/fonts/DMSans-ExtraLightItalic.ttf"),
        DMSans_Thin: require("./assets/fonts/DMSans-Thin.ttf"),
        DMSans_ThinItalic: require("./assets/fonts/DMSans-ThinItalic.ttf"),
        DMSans_ExtraBold: require("./assets/fonts/DMSans-ExtraBold.ttf"),
        DMSans_ExtraBoldItalic: require("./assets/fonts/DMSans-ExtraBoldItalic.ttf"),
        DMSans_SemiBold: require("./assets/fonts/DMSans-SemiBold.ttf"),
        DMSans_SemiBoldItalic: require("./assets/fonts/DMSans-SemiBoldItalic.ttf"),
        Gilroy_Bold: require("./assets/fonts/Gilroy-Bold.ttf"),
        Gilroy_ExtraBold: require("./assets/fonts/Gilroy-ExtraBold.ttf"),
        Gilroy_Light: require("./assets/fonts/Gilroy-Light.ttf"),
        Gilroy_Medium: require("./assets/fonts/Gilroy-Medium.ttf"),
        Gilroy_Regular: require("./assets/fonts/Gilroy-Regular.ttf"),
        Gilroy_SemiBold: require("./assets/fonts/Gilroy-SemiBold.ttf"),
        Gilroy_Thin: require("./assets/fonts/Gilroy-Thin.ttf"),
        Gilroy_UltraLight: require("./assets/fonts/Gilroy-UltraLight.ttf"),
        Gilroy_BoldItalic: require("./assets/fonts/Gilroy-BoldItalic.ttf"),
        Gilroy_ExtraBoldItalic: require("./assets/fonts/Gilroy-ExtraBoldItalic.ttf"),
        Gilroy_LightItalic: require("./assets/fonts/Gilroy-LightItalic.ttf"),
        Gilroy_MediumItalic: require("./assets/fonts/Gilroy-MediumItalic.ttf"),
        Gilroy_SemiBoldItalic: require("./assets/fonts/Gilroy-SemiBoldItalic.ttf"),
        Gilroy_ThinItalic: require("./assets/fonts/Gilroy-ThinItalic.ttf"),
        Gilroy_UltraLightItalic: require("./assets/fonts/Gilroy-UltraLightItalic.ttf"),
        Gilroy_Black: require("./assets/fonts/Gilroy-Black.ttf"),
        Gilroy_BlackItalic: require("./assets/fonts/Gilroy-BlackItalic.ttf"),
        Gilroy_Heavy: require("./assets/fonts/Gilroy-Heavy.ttf"),
        Gilroy_HeavyItalic: require("./assets/fonts/Gilroy-HeavyItalic.ttf"),
        Gilroy_MediumItalic: require("./assets/fonts/Gilroy-MediumItalic.ttf"),
    });
    if (!loaded) {
        return (
            <View
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                <Text>Loading fonts...</Text>
            </View>
        );
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <DesignProvider>
                    <AuthProvider>
                        <LoadingProvider>
                            <MessageProvider>
                                <Layout></Layout>
                            </MessageProvider>
                        </LoadingProvider>
                    </AuthProvider>
                </DesignProvider>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
};

export const Layout = () => {
    const { authState } = useAuth();
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={"HomeScreen"}
                screenOptions={{
                    headerShown: false,
                }}>
                {authState?.authenticated ? (
                    // LOGGED ONLY SCREENS
                    <>
                        <Stack.Screen
                            name="HomeScreen"
                            component={HomeScreen}
                        />
                        <Stack.Screen
                            name="FavoritesScreen"
                            component={FavoritesScreen}
                        />
                        <Stack.Screen
                            name="ProfileScreen"
                            component={ProfileScreen}
                        />
                        <Stack.Screen
                            name="MyPicturesScreen"
                            component={MyPicturesScreen}
                        />
                        <Stack.Screen
                            name="WalletScreen"
                            component={WalletScreen}
                        />
                        <Stack.Screen
                            name="WithdrawalScreen"
                            component={WithdrawalScreen}
                        />
                        <Stack.Screen
                            name="MessageScreen"
                            component={MessageScreen}
                        />
                        <Stack.Screen
                            name="SalesScreen"
                            component={SalesScreen}
                        />
                    </>
                ) : (
                    <>
                        <Stack.Screen
                            name="GetStarted"
                            component={GetStartedScreen}
                        />
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen
                            name="Register"
                            component={RegisterScreen}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
