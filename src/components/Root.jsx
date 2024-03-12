import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View, Text, Image } from "react-native";

const Tab = createBottomTabNavigator();

import Home from "../screens/HomeScreen";
import About from "../screens/About";

export default function Root() {
	return (
		<Tab.Navigator
			screenOptions={() => ({
				tabBarShowLabel: false,
				headerShown: false,
				tabBarStyle: {
					position: "absolute",
					bottom: 25,
					left: 20,
					right: 20,
					elevation: 0,
					backgroundColor: "#ffffff",
					borderRadius: 30,
					height: 90,
					...styles.shadow,
				},
			})}>
			<Tab.Screen
				name="HomePage"
				component={Home}
				options={{
					tabBarIcon: ({ focused }) => (
						<View
							style={{
								alignItems: "center",
								justifyContent: "center",
								top: 10,
							}}>
							<Image
								source={require("../../assets/home.png")}
								resizeMode="contain"
								style={{
									width: 25,
									height: 25,
									tintColor: focused ? "#7f5df0" : "#748c94",
									marginBottom: 10,
								}}
							/>
							<Text
								style={{
									color: focused ? "#7f5df0" : "#748c94",
									fontSize: 12,
									fontWeight: "bold",
								}}>
								HOME
							</Text>
						</View>
					),
				}}
			/>
			<Tab.Screen
				name="AboutPage"
				component={About}
				options={{
					tabBarIcon: ({ focused }) => (
						<View
							style={{
								alignItems: "center",
								justifyContent: "center",
								top: 10,
							}}>
							<Image
								source={require("../../assets/home.png")}
								resizeMode="contain"
								style={{
									width: 25,
									height: 25,
									tintColor: focused ? "#7f5df0" : "#748c94",
									marginBottom: 10,
								}}
							/>
							<Text
								style={{
									color: focused ? "#7f5df0" : "#748c94",
									fontSize: 12,
									fontWeight: "bold",
								}}>
								HOME
							</Text>
						</View>
					),
				}}
			/>
		</Tab.Navigator>
	);
}

const styles = StyleSheet.create({
	shadow: {
		shadowColor: "#7f5df0",
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.5,
		elevation: 5,
	},
});
