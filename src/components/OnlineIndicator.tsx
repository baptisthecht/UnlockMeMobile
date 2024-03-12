import React, { useState, useEffect } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { useDesign } from "../context/DesignContext";

const OnlineIndicator = () => {
	const { primaryColor } = useDesign();
	const [pulse] = useState(new Animated.Value(1));

	const pulseAnimation = () => {
		Animated.sequence([
			Animated.timing(pulse, {
				toValue: 1.2,
				duration: 500,
				useNativeDriver: true,
			}),
			Animated.timing(pulse, {
				toValue: 1,
				duration: 500,
				useNativeDriver: true,
			}),
		]).start(() => pulseAnimation());
	};

	useEffect(() => {
		pulseAnimation();
	}, []);

	const styles = StyleSheet.create({
		container: {
			alignItems: "center",
			justifyContent: "center",
		},
		circle: {
			width: 10,
			height: 10,
			borderRadius: 10,
			backgroundColor: "#39B8FF",
		},
	});

	return (
		<View style={styles.container}>
			<Animated.View
				style={[styles.circle, { transform: [{ scale: pulse }] }]}
			/>
		</View>
	);
};

export default OnlineIndicator;
