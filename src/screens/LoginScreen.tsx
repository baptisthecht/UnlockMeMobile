import { ActivityIndicator, Dimensions, Text, View } from "react-native";
import React, { useEffect } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { TouchableOpacity } from "react-native-gesture-handler";
import TextInputComponent from "../components/TextInput";
import { useAuth } from "../context/AuthContext";
import * as Haptic from "expo-haptics";

const LoginScreen = ({ navigation }) => {
	const [firstname, setFirstname] = React.useState<string>("");
	const [lastname, setLastname] = React.useState<string>("");
	const [email, setEmail] = React.useState<string>("");
	const [phone, setPhone] = React.useState<string>("");
	const [city, setCity] = React.useState<string>("");
	const [password, setPassword] = React.useState<string>("");
	const [passwordConfirm, setPasswordConfirm] = React.useState<string>("");
	const [p1H, setP1H] = React.useState<number>();
	const [p2H, setP2H] = React.useState<number>();
	const { width } = Dimensions.get("window");
	const [step, setStep] = React.useState<number>(0);
	const [scrollViewHeight, setScrollViewHeight] = React.useState<number>(0);
	const w = width - 40;
	const { onLogin, loginPending } = useAuth();

	const handleValidate = () => {
		Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Light);
		onLogin(email, password);
	};

	return (
		<View tw="h-full bg-ciel pt-24 px-5">
			<View tw="flex flex-col">
				<TouchableOpacity
					tw="h-14 w-14 rounded-full bg-glass flex items-center justify-center"
					onPress={() => navigation.goBack()}>
					<ChevronLeftIcon
						size={22}
						strokeWidth={4}
						color={"#4318FF"}
					/>
				</TouchableOpacity>
				<View tw="h-5"></View>
				<View
					onLayout={(e) => setP1H(e.nativeEvent.layout.height)}
					style={{ width: w }}>
					<View style={{ width: w }}>
						<Text className="text-marine text-[40px] my-10 font-Gb">
							Ravis de vous revoir, connectez-vous !
						</Text>
						<TextInputComponent
							placeholder="Email"
							value={email}
							textContentType="emailAddress"
							onChangeText={(text: string) => setEmail(text)}
						/>
						<View tw="h-5"></View>
						<TextInputComponent
							placeholder="Mot de passe"
							textContentType="password"
							secret
							value={password}
							onChangeText={(text: string) => setPassword(text)}
						/>
					</View>
					<View tw="h-5"></View>
				</View>
				{!!email && !!password && (
					<TouchableOpacity
						tw="bg-blue w-full flex flex-row justify-center rounded-3xl p-8"
						onPress={() => handleValidate()}>
						<Text tw="font-DMm text-[20px] text-ciel">
							{loginPending ? (
								<ActivityIndicator
									size={"small"}
									color={"#fff"}
								/>
							) : (
								"Valider"
							)}
						</Text>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

export default LoginScreen;
