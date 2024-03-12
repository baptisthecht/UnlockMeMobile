import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useLoading } from "../context/LoadingContext";

const CustomizableModal = ({
	title,
	message,
	primaryButtonMessage,
	secondaryButtonMessage = "",
	primaryClick,
	secondaryClick = null,
}) => {
	const { loading } = useLoading();
	return (
		<View style={[StyleSheet.absoluteFillObject, styles.container]}>
			<View style={styles.modal}>
				<View style={styles.textSection}>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.message}>{message}</Text>
				</View>
				<View style={styles.buttonGroup}>
					<TouchableOpacity
						onPress={primaryClick}
						style={styles.button}>
						<Text style={styles.textButton}>
							{loading ? (
								<ActivityIndicator size={22} color={"#fff"} />
							) : (
								primaryButtonMessage
							)}
						</Text>
					</TouchableOpacity>
					{secondaryClick && (
						<TouchableOpacity
							onPress={secondaryClick}
							style={styles.secondaryButton}>
							<Text style={styles.SecondaryTextButton}>
								{secondaryButtonMessage}
							</Text>
						</TouchableOpacity>
					)}
				</View>
			</View>
		</View>
	);
};

export default CustomizableModal;

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.3)",
		zIndex: 1000,
	},
	modal: {
		backgroundColor: "white",
		padding: 20,
		borderRadius: 20,
		width: "80%",
		display: "flex",
		flexDirection: "column",
		gap: 30,
	},
	textSection: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
	},
	button: {
		backgroundColor: "#9775FA",
		padding: 10,
		width: "100%",
		paddingVertical: 15,
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
	title: {
		fontSize: 24,
		fontWeight: "bold",
	},
	message: {
		fontSize: 20,
		fontWeight: "400",
		color: "#6b7280",
	},
	secondaryButton: {
		padding: 10,
		width: "100%",
		paddingVertical: 15,
		textAlign: "center",
		borderRadius: 10,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	SecondaryTextButton: {
		color: "#9775FA",
		fontSize: 22,
		fontWeight: "600",
	},
	buttonGroup: {
		display: "flex",
		flexDirection: "column",
		gap: 10,
		width: "100%",
	},
});
