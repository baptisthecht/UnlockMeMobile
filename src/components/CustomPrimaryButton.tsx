import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
const CustomPrimaryButton = ({ desactivated, text, onPress, pending }) => {
	const styles = StyleSheet.create({
		container: {
			width: "100%",
		},
		button: {
			backgroundColor: "#9775FA",
			padding: 10,
			width: "100%",
			paddingVertical: 20,
			textAlign: "center",
			borderRadius: 10,
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		},
		buttonDesactivated: {
			backgroundColor: "#d5c7fd",
			padding: 10,
			width: "100%",
			paddingVertical: 20,
			textAlign: "center",
			borderRadius: 10,
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		},
		textButton: {
			color: "#FEFEFE",
			fontSize: 22,
			fontWeight: "600",
		},
	});

	return (
		<View style={styles.container}>
			{!desactivated ? (
				<TouchableOpacity onPress={onPress} style={styles.button}>
					{pending ? (
						<ActivityIndicator size={22} color={"#fff"} />
					) : (
						<Text style={styles.textButton}>{text}</Text>
					)}
				</TouchableOpacity>
			) : (
				<View style={styles.buttonDesactivated}>
					<Text style={styles.textButton}>{text}</Text>
				</View>
			)}
		</View>
	);
};
export default CustomPrimaryButton;
