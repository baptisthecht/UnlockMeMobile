import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Layout from "../layouts/Layout";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { useBooking } from "../context/BookingContext";
import CustomizableModal from "../modals/CustomizableModal";
import { useDesign } from "../context/DesignContext";

const BookHistoryScreen = () => {
	const { textColor, bgColor, primaryColor } = useDesign();
	const { onRefreshBookings, bookings, onUpdateBookingStatus } = useBooking();
	const [refreshing, setRefreshing] = useState(false);

	const handleRefresh = async () => {
		setRefreshing(true);
		await onRefreshBookings();
		setRefreshing(false);
	};

	const [itemToCancel, setItemToCancel] = useState<any>(null);
	const [modalVisible, setModalVisible] = useState(false);

	const styles = StyleSheet.create({
		title: {
			fontSize: 36,
			fontWeight: "bold",
			color: textColor,
		},
		card: {
			backgroundColor: bgColor,
			borderRadius: 20,
			padding: 20,
			marginBottom: 20,
			display: "flex",
			flexDirection: "column",
			justifyContent: "space-between",
			gap: 10,
			color: textColor,
		},
		confirmedCard: {
			backgroundColor: bgColor,
			borderRadius: 20,
			padding: 18,
			marginBottom: 20,
			display: "flex",
			flexDirection: "column",
			justifyContent: "space-between",
			gap: 10,
			borderWidth: 2,
			borderColor: primaryColor,
			shadowColor: primaryColor,
			shadowOffset: {
				width: 0,
				height: 4,
			},
			shadowOpacity: 0.2,
			shadowRadius: 5.46,
			color: textColor,
		},
		sooncard: {
			backgroundColor: bgColor,
			borderRadius: 10,
			padding: 20,
			marginBottom: 20,
			display: "flex",
			flexDirection: "column",
			justifyContent: "space-between",
			shadowColor: primaryColor,
			shadowOffset: {
				width: 0,
				height: 4,
			},
			shadowOpacity: 0.2,
			shadowRadius: 5.46,
			borderWidth: 2,
			borderColor: primaryColor,
			color: textColor,
		},
		restaurantName: {
			fontSize: 24,
			fontWeight: "bold",
			textTransform: "uppercase",
			maxWidth: "70%",
			color: textColor,
		},
		bookingDate: {
			fontSize: 16,
		},
		cardHead: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
		},
		status: {
			fontWeight: "bold",
			fontSize: 24,
			textTransform: "uppercase",
			color: textColor,
		},
		confirmedStatus: {
			fontWeight: "bold",
			fontSize: 24,
			textTransform: "uppercase",
			color: primaryColor,
		},
	});

	return (
		<>
			<Layout>
				<Text style={styles.title}>Mes réservations</Text>
				<FlatList
					style={{ marginVertical: 30 }}
					data={bookings}
					renderItem={({ item }) => (
						<View
							style={
								item.status === "confirmed"
									? styles.confirmedCard
									: styles.card
							}>
							<View style={styles.cardHead}>
								<Text style={styles.restaurantName}>
									{item.restaurantData.name}
								</Text>
								<Text
									style={
										item.status === "confirmed"
											? styles.confirmedStatus
											: styles.status
									}>
									{"  ·  "}
									{item.status}
								</Text>
							</View>
							<Text style={styles.bookingDate}>
								Le{" "}
								{item.bookingDate.split("T")[0].split("-")[2] +
									"/" +
									item.bookingDate
										.split("T")[0]
										.split("-")[1] +
									"/" +
									item.bookingDate
										.split("T")[0]
										.split("-")[0] +
									" à " +
									item.bookingDate
										.split("T")[1]
										.split(":")[0] +
									":" +
									item.bookingDate
										.split("T")[1]
										.split(":")[1]}
							</Text>
							<Text>{item.restaurantData.address}</Text>
							<Text>{item.restaurantData.city}</Text>

							<Text>{item.numberOfPeople}</Text>
							<TouchableOpacity
								style={{
									backgroundColor: "#9775FA",
									padding: 10,
									borderRadius: 10,
									marginTop: 10,
									display: "flex",
									alignItems: "center",
								}}
								onPress={() => {
									onUpdateBookingStatus(
										item._id,
										"confirmed"
									);
								}}>
								<Text
									style={{
										color: "#fff",
										fontWeight: "bold",
										fontSize: 18,
									}}>
									CONFIRMER
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={{
									backgroundColor: "#9775FA",
									padding: 10,
									borderRadius: 10,
									marginTop: 10,
									display: "flex",
									alignItems: "center",
								}}
								onPress={() => {
									onUpdateBookingStatus(
										item._id,
										"cancelled"
									);
								}}>
								<Text
									style={{
										color: "#fff",
										fontWeight: "bold",
										fontSize: 18,
									}}>
									ANNULER
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={{
									backgroundColor: "#9775FA",
									padding: 10,
									borderRadius: 10,
									marginTop: 10,
									display: "flex",
									alignItems: "center",
								}}
								onPress={() => {
									onUpdateBookingStatus(item._id, "pending");
								}}>
								<Text
									style={{
										color: "#fff",
										fontWeight: "bold",
										fontSize: 18,
									}}>
									EN ATTENTE
								</Text>
							</TouchableOpacity>
						</View>
					)}
					keyExtractor={(item) => item._id}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={handleRefresh}
						/>
					}
				/>
			</Layout>
			{modalVisible && (
				<CustomizableModal
					title="Annuler la réservation"
					message={
						"Êtes-vous sûr de vouloir annuler cette réservation ?"
					}
					primaryButtonMessage="Annuler"
					primaryClick={async () => {
						await onUpdateBookingStatus(itemToCancel, "cancelled");
						setItemToCancel(null);
						setModalVisible(false);
					}}
					secondaryButtonMessage="Conserver la réservation"
					secondaryClick={() => {
						setItemToCancel(null);
						setModalVisible(false);
					}}
				/>
			)}
		</>
	);
};

export default BookHistoryScreen;
