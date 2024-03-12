import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { TagIcon } from "react-native-heroicons/mini";
import { useDesign } from "../context/DesignContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Haptic from "expo-haptics";
import Svg, { Path } from "react-native-svg";

const RestaurantCard = ({ restaurant, trend = false }) => {
	const { secondaryColor, textColor, secondaryTextColor, primaryColor } =
		useDesign();

	const styles = StyleSheet.create({
		card: {
			width: "100%",
			backgroundColor: "white",
			borderRadius: 20,
			padding: 20,
			display: "flex",
			flexDirection: "column",
			gap: 20,
			borderWidth: trend ? 2 : 0,
			borderColor: trend ? "#DA2515" : "transparent",
		},
		image: {
			width: "100%",
			height: 232,
			borderRadius: 20,
			overflow: "hidden",
			backgroundColor: "#F1EEFE",
		},
		nameAndUsers: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
		},
		p4: {
			paddingHorizontal: 4,
			display: "flex",
			flexDirection: "column",
			gap: 20,
		},
		leftSection: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			gap: 10,
		},
		rightSection: {
			display: "flex",
			flexDirection: "column",
			gap: 4,
		},
		leftLeft: {
			display: "flex",
			width: 48,
			height: 48,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: trend ? "#FEEFEE" : "#F1EEFE",
			borderRadius: 15,
		},
		leftRight: {
			display: "flex",
			flexDirection: "column",
			gap: 4,
		},
		restaurantName: {
			fontFamily: "Gilroy_Bold",
			fontSize: 20,
			color: textColor,
		},
		places: {
			fontFamily: "Gilroy_Bold",
			fontSize: 15,
			color: secondaryTextColor,
		},
		adress: {
			fontFamily: "Gilroy_Bold",
			fontSize: 18,
			color: trend ? "#EE5D50" : secondaryColor,
		},
		button: {
			backgroundColor: trend ? "#DA2515" : primaryColor,
			borderRadius: 12,
			paddingTop: 12,
			paddingBottom: 10,
			paddingHorizontal: 32,
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		},
		buttonText: {
			fontFamily: "Gilroy_Bold",
			fontSize: 18,
			color: "white",
		},
		bottomSection: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
		},
	});

	return (
		<View style={styles.card}>
			{/* image */}
			<View style={styles.image}>
				{/* <Image source={require("../../assets/images/restaurant.jpg")} /> */}
			</View>
			<View style={styles.p4}>
				{/* name icon places user */}
				<View style={styles.nameAndUsers}>
					<View style={styles.leftSection}>
						<View style={styles.leftLeft}>
							{trend ? (
								<Svg width={20} height={25} fill="none">
									<Path
										fill="#EE5D50"
										d="M18.727 13.408c-1.832-4.76-8.354-5.016-6.779-11.935a.588.588 0 0 0-.875-.641C6.838 3.328 3.793 8.333 6.348 14.89c.21.537-.42 1.038-.875.688-2.111-1.598-2.333-3.896-2.146-5.541.07-.607-.724-.899-1.062-.397-.793 1.213-1.598 3.173-1.598 6.125.443 6.533 5.961 8.54 7.945 8.797 2.835.361 5.903-.164 8.108-2.182 2.427-2.252 3.313-5.845 2.007-8.972ZM7.9 19.277c1.68-.409 2.543-1.622 2.777-2.695.385-1.669-1.12-3.302-.105-5.939.385 2.182 3.815 3.547 3.815 5.927.093 2.952-3.104 5.483-6.487 2.707Z"
									/>
								</Svg>
							) : (
								<TagIcon fill={secondaryColor} />
							)}
						</View>
						<View style={styles.leftRight}>
							<Text style={styles.restaurantName}>Starbucks</Text>
							<Text style={styles.places}>
								{restaurant.availablePlaces} places pour ce soir
							</Text>
						</View>
					</View>
					<View style={styles.rightSection}>
						<Text>AVATARS</Text>
					</View>
				</View>
				<View style={styles.bottomSection}>
					<Text style={styles.adress}>Rue Solférino, Lille</Text>
					<TouchableOpacity
						style={styles.button}
						onPress={() => {
							Haptic.impactAsync(
								Haptic.ImpactFeedbackStyle.Light
							);
						}}>
						<Text style={styles.buttonText}>Réserver</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default RestaurantCard;
