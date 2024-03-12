import React, { useState } from "react";
import { TextInput, StyleSheet, View, Text } from "react-native";
import {
	TouchableOpacity,
	TouchableWithoutFeedback,
} from "react-native-gesture-handler";

const TextInputComponent = (props: any) => {
	const {
		placeholder,
		value,
		onChangeText,
		secret = false,
		autoComplete,
		keyboardType = null,
	} = props;
	const [isFocused, setIsFocused] = useState(false);
	const inputRef = React.useRef(null);

	const handleClick = () => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	};

	return (
		<>
			<TouchableWithoutFeedback
				tw="bg-white w-full rounded-3xl p-7 relative"
				onPress={() => handleClick()}>
				<TextInput
					ref={inputRef}
					tw="font-DMm text-[20px] text-marine"
					value={value}
					onChangeText={onChangeText}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					secureTextEntry={secret}
					keyboardType={keyboardType ? keyboardType : "default"}
					autoComplete={autoComplete}
					clearButtonMode="while-editing"
				/>
				<Text tw="font-DMm text-[20px] text-marine absolute left-7 top-7 pointer-events-none">
					{(!value || value == "") && placeholder}
				</Text>
			</TouchableWithoutFeedback>
		</>
	);
};

export default TextInputComponent;

const styles = StyleSheet.create({});
