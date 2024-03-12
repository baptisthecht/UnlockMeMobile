import {
	Button,
	StyleSheet,
	Text,
	Touchable,
	TouchableOpacity,
	View,
	Image,
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Layout from "../layouts/Layout";
import { CloudIcon } from "react-native-heroicons/mini";
import Ionicons from "@expo/vector-icons/Ionicons";
import Svg, { G, Path } from "react-native-svg";
import AppleIcon from "../icons/AppleIcon";
import GoogleIcon from "../icons/GoogleIcon";
import TwitterIcon from "../icons/TwitterIcon";
import FacebookIcon from "../icons/FacebookIcon";
import { useDesign } from "../context/DesignContext";

const GetStartedScreen = ({ navigation }) => {
	const {
		textColor,
		bgColor,
		primaryColor,
		secondaryTextColor,
		h3,
		h2,
		h1,
		h4,
	} = useDesign();

	const styles = StyleSheet.create({
		LoginPage: {
			paddingTop: 160,
			gap: 80,
			display: "flex",
			flex: 1,
			flexDirection: "column",
			justifyContent: "flex-start",
			paddingHorizontal: 20,
			backgroundColor: "#F4F7FE",
		},
		titleGroup: {
			display: "flex",
			flexDirection: "column",
			gap: 15,
		},
		buttonsGroup: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			gap: 40,
			width: "100%",
		},
		button: {
			backgroundColor: primaryColor,
			paddingVertical: 24,
			width: "100%",
			textAlign: "center",
			borderRadius: 22,
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		},
		textButton: {
			color: bgColor,
			fontSize: 21,
			fontFamily: "DMSans_SemiBold",
		},
		title: {
			fontSize: 40,
			fontFamily: "Gilroy_Bold",
			color: textColor,
		},
		subtitle: {
			fontSize: 22,
			fontFamily: "Gilroy_Bold",
			color: secondaryTextColor,
		},
		textPurple: {
			color: primaryColor,
		},
		bottomLogo: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center",
			gap: 10,
		},
		bottomLogoText: {
			fontSize: 18,
			fontFamily: "DMSans_Bold",
			color: primaryColor,
		},
		loginGroup: {
			width: "100%",
			display: "flex",
			flexDirection: "column",
			gap: 40,
		},
		registerText: {
			fontSize: 20,
			fontFamily: "DMSans_Medium",
			color: secondaryTextColor,
			marginHorizontal: 40,
			textAlign: "center",
			lineHeight: 30,
		},
		googleButton: {
			backgroundColor: "#DB4437",
			paddingVertical: 24,
			width: "100%",
			textAlign: "center",
			borderRadius: 22,
			display: "flex",
			flexDirection: "row",
			gap: 8,
			justifyContent: "center",
			alignItems: "center",
		},
		appleButton: {
			backgroundColor: "#000",
			paddingVertical: 24,
			width: "100%",
			textAlign: "center",
			borderRadius: 22,
			display: "flex",
			flexDirection: "row",
			gap: 8,
			justifyContent: "center",
			alignItems: "center",
		},
		separator: {
			width: "75%",
			height: 30,
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center",
			gap: 20,
		},
		sideSeparator: {
			width: "40%",
			height: 3,
			opacity: 0.5,
			backgroundColor: secondaryTextColor,
		},
		or: {
			fontSize: 20,
			fontFamily: "Gilroy_Bold",
			color: secondaryTextColor,
		},
		buttonsPart: {
			display: "flex",
			flexDirection: "column",
			gap: 20,
			width: "100%",
		},
		oauthPart: {
			display: "flex",
			flexDirection: "column",
			gap: 20,
			width: "100%",
		},
	});

	return (
		<View style={styles.LoginPage}>
			<View style={styles.titleGroup}>
				<Text style={styles.title}>Bienvenue !</Text>
				<Text style={styles.subtitle}>
					Commençons par créer votre compte
				</Text>
			</View>
			<View style={styles.loginGroup}>
				<View style={styles.buttonsGroup}>
					<View style={styles.oauthPart}>
						<TouchableOpacity style={styles.googleButton}>
							<GoogleIcon size={18} fillColor="#fff" />
							<Text style={styles.textButton}>
								Continuer avec Google
							</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.appleButton}>
							<AppleIcon size={18} fillColor="#fff" />
							<Text style={styles.textButton}>
								Continuer avec Apple
							</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.separator}>
						<View style={styles.sideSeparator}></View>
						<Text style={styles.or}>ou</Text>
						<View style={styles.sideSeparator}></View>
					</View>
					<View style={styles.buttonsPart}>
						<TouchableOpacity
							style={styles.button}
							onPress={() => navigation.navigate("Register")}>
							<Text style={styles.textButton}>
								Créer mon compte
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => navigation.navigate("Login")}>
							<Text style={styles.registerText}>
								Vous possédez déjà un compte ?{"\n"}
								<Text style={styles.textPurple}>
									Connectez-vous
								</Text>
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	);
};

export default GetStartedScreen;
