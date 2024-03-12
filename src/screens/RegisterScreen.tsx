import { Dimensions, Text, View } from "react-native";
import React, { useEffect } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/mini";
import { TouchableOpacity } from "react-native-gesture-handler";
import TextInputComponent from "../components/TextInput";
import HorizontalMultipleView from "../components/HorizontalMultipleView";

const RegisterScreen = ({ navigation }) => {
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
	const emailRegex = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
	const phoneRegex = new RegExp("^[0-9]{10}$");
	const postalCodeRegex = new RegExp("^[0-9]{5}$");
	const passwordRegex = new RegExp(
		`^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$`
	);
	const handleNextStep = () => {
		setStep((prev) => prev + 1);
	};

	useEffect(() => {
		switch (step) {
			case 0:
				setScrollViewHeight(p1H);
				break;
			case 1:
				setScrollViewHeight(p2H);
				break;
			default:
				setScrollViewHeight(200);
				break;
		}
	}, [step]);

	const handleBack = () => {
		if (step > 0) {
			setStep((prev) => prev - 1);
		} else {
			navigation.goBack();
		}
	};

	const handleValidate = () => {
		if (step === 3) {
			alert("ok");
		} else {
			setStep((prev) => prev + 1);
		}
	};

	return (
		<View tw="h-full bg-ciel pt-24 px-5">
			<View tw="flex flex-col">
				<TouchableOpacity
					tw="h-14 w-14 rounded-full bg-glass flex items-center justify-center"
					onPress={() => handleBack()}>
					<ChevronLeftIcon
						size={22}
						strokeWidth={4}
						color={"#4318FF"}
					/>
				</TouchableOpacity>
				<View tw="flex flex-row mt-14">
					<View tw={"rounded-full h-[6px] w-12 mr-2 bg-blue"}></View>
					<View
						tw={`bg-glass rounded-full h-[6px] w-12 mr-2 ${
							step > 0 ? "bg-blue" : "bg-glass"
						}`}></View>
					<View
						tw={`bg-glass rounded-full h-[6px] w-12 mr-2 ${
							step > 1 ? "bg-blue" : "bg-glass"
						}`}></View>
					<View
						tw={`bg-glass rounded-full h-[6px] w-12 mr-2 ${
							step > 2 ? "bg-blue" : "bg-glass"
						}`}></View>
				</View>
				<View tw="h-5"></View>
				<HorizontalMultipleView step={step}>
					<View
						onLayout={(e) => setP1H(e.nativeEvent.layout.height)}
						style={{ width: w }}>
						<View style={{ width: w }}>
							<Text className="text-marine text-[40px] my-10 font-Gb">
								Votre identité
							</Text>
							<TextInputComponent
								placeholder="Prénom"
								autoComplete="given-name"
								value={firstname}
								type="firstname"
								onChangeText={(text: string) =>
									setFirstname(text)
								}
							/>
							<View tw="h-5"></View>
							<TextInputComponent
								placeholder="Nom"
								type="lastname"
								autoComplete="family-name"
								value={lastname}
								onChangeText={(text: string) =>
									setLastname(text)
								}
							/>
						</View>
					</View>
					<View
						onLayout={(e) => setP2H(e.nativeEvent.layout.height)}
						style={{ width: w }}>
						<View style={{ width: w }}>
							<Text className="text-marine text-[40px] my-10 font-Gb">
								Vos informations
							</Text>
							<TextInputComponent
								placeholder="Email"
								autoComplete="email"
								value={email}
								onChangeText={(text: string) => setEmail(text)}
							/>
							<View tw="h-5"></View>
							<TextInputComponent
								placeholder="Numéro de téléphone"
								autoComplete="tel"
								keyboardType="phone-pad"
								value={phone}
								onChangeText={(text: string) => setPhone(text)}
							/>
							<View tw="h-5"></View>
						</View>
					</View>
					<View
						onLayout={(e) => setP2H(e.nativeEvent.layout.height)}
						style={{ width: w }}>
						<View style={{ width: w }}>
							<Text className="text-marine text-[40px] my-10 font-Gb">
								Où habitez-vous ?
							</Text>
							<TextInputComponent
								placeholder="Code postal"
								textContentType="postal-code"
								keyboardType="phone-pad"
								value={city}
								onChangeText={(text: string) => setCity(text)}
							/>
							<View tw="w-full p-7 flex flex-row  items-center justify-center gap-2">
								<MapPinIcon color={"#2B3674"} />
								<Text tw="font-DMsb text-[20px] text-marine pointer-events-none">
									Me localiser
								</Text>
							</View>
						</View>
					</View>
					<View
						onLayout={(e) => setP2H(e.nativeEvent.layout.height)}
						style={{ width: w }}>
						<View style={{ width: w }}>
							<Text className="text-marine text-[40px] my-10 font-Gb">
								Et la dernière étape !
							</Text>
							<TextInputComponent
								secret
								placeholder="Mot de passe"
								textContentType="new-password"
								type="password"
								value={password}
								onChangeText={(text: string) =>
									setPassword(text)
								}
							/>
							<View tw="w-full  p-7 relative">
								<Text tw="font-DMm text-[20px] text-marine absolute left-7 top-7 pointer-events-none">
									Votre mot de passe doit contenir au moins 8
									caractères, une majuscule, une minuscule et
									un chiffre.
								</Text>
							</View>
							<View tw="h-5"></View>
						</View>
					</View>
				</HorizontalMultipleView>
				{((step === 0 && !!firstname && !!lastname) ||
					(step === 1 &&
						!!email &&
						!!phone &&
						phoneRegex.test(phone.replaceAll(" ", "")) &&
						emailRegex.test(email)) ||
					(step === 2 && !!city && postalCodeRegex.test(city)) ||
					(step === 3 &&
						!!password &&
						passwordRegex.test(password))) && (
					<TouchableOpacity
						tw="bg-blue w-full flex flex-row justify-center rounded-3xl p-8"
						onPress={() => handleValidate()}>
						<Text tw="font-DMm text-[20px] text-ciel">Valider</Text>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

export default RegisterScreen;
