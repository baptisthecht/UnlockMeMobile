import React, { useState } from "react";
import { TextInput, StyleSheet, View, Text } from "react-native";
import { useDesign } from "../context/DesignContext";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";

const SearchBar = ({ value, onChangeText }) => {
	const [isFocused, setIsFocused] = useState(false);
	const { cardColor, theme, textColor, invertedTextColor } = useDesign();
	const styles = StyleSheet.create({
		container: {
			position: "relative",
			width: "100%",
			flexShrink: 1,
		},
		input: {
			paddingHorizontal: 30,
			paddingVertical: 25,
			paddingLeft: 65,
			borderRadius: 15,
			backgroundColor: "white",
			width: "100%",
		},
		placeholder: {
			color: textColor,
			fontFamily: "DMSans_Medium",
			fontSize: 20,
		},
		placeholderView: {
			position: "absolute",
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			paddingHorizontal: 25,
			gap: 15,
			pointerEvents: "none",
		},
	});

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				value={value}
				onChangeText={onChangeText}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
			/>
			<View style={styles.placeholderView}>
				<MagnifyingGlassIcon strokeWidth={3} stroke={textColor} />
				<Text style={[styles.placeholder]}>
					{!isFocused && (!value || value == "") && "Rechercher..."}
				</Text>
			</View>
		</View>
	);
};

export default SearchBar;
