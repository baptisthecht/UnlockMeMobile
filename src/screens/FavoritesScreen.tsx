import React, { useRef, useState } from "react";
import {
	View,
	ScrollView,
	TextInput,
	Button,
	Image,
	StyleSheet,
	Text,
	Dimensions,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import HorizontalMultipleView from "../components/HorizontalMultipleView";

const RegistrationPage = () => {
	const { width } = Dimensions.get("window");
	const [step, setStep] = useState(0);
	const [page1Height, setPage1Height] = useState(0);
	const [page2Height, setPage2Height] = useState(0);

	const styles = StyleSheet.create({
		page: {
			width: width,
		},
	});

	const handleNextStep = () => {
		setStep((prev) => prev + 1);
	};

	return (
		<View>
			<HorizontalMultipleView
				step={step}
				height={
					step === 0 ? page1Height : step === 1 ? page2Height : 100
				}>
				<View style={styles.page}>
					<View
						onLayout={(e) =>
							setPage1Height(e.nativeEvent.layout.height)
						}
						style={{
							borderWidth: 2,
							borderColor: "yellow",
							width: width,
						}}>
						<View style={{ borderWidth: 1, borderColor: "black" }}>
							<Text>PAGE1</Text>
						</View>
						<View style={{ borderWidth: 1, borderColor: "black" }}>
							<Text>PAGE1</Text>
						</View>
						<View style={{ borderWidth: 1, borderColor: "black" }}>
							<Text>PAGE1</Text>
						</View>
						<View style={{ borderWidth: 1, borderColor: "black" }}>
							<Text>PAGE1</Text>
						</View>
						<View style={{ borderWidth: 1, borderColor: "black" }}>
							<Text>PAGE1</Text>
						</View>
						<View style={{ borderWidth: 1, borderColor: "black" }}>
							<Text>PAGE1</Text>
						</View>
					</View>
				</View>
				<View style={styles.page}>
					<View
						onLayout={(e) =>
							setPage2Height(e.nativeEvent.layout.height)
						}
						style={{
							borderWidth: 2,
							borderColor: "yellow",
							width: width,
						}}>
						<View style={{ borderWidth: 1, borderColor: "black" }}>
							<Text>PAGE1</Text>
						</View>
						<View style={{ borderWidth: 1, borderColor: "black" }}>
							<Text>PAGE1</Text>
						</View>
					</View>
				</View>
			</HorizontalMultipleView>
			<TouchableOpacity
				onPress={() => handleNextStep()}
				style={{ padding: 20, backgroundColor: "red" }}>
				<Text>Next : {step}</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => setStep(0)}
				style={{ padding: 20, backgroundColor: "red" }}>
				<Text>
					RESET : {step}, page1h: {page1Height}, page2h: {page2Height}
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default RegistrationPage;
