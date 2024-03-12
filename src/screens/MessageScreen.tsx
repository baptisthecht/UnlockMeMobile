import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Layout from "../layouts/Layout";
import {
    CheckIcon,
    XMarkIcon,
    ShieldExclamationIcon,
    InformationCircleIcon,
} from "react-native-heroicons/outline";
import { useMessage } from "../context/MessageContext";
import LottieView from "lottie-react-native";

const HomeScreen = ({ navigation }) => {
    const { message } = useMessage();
    const { type } = message;

    const handleClick = () => {
        navigation.navigate("HomeScreen");
    };

    return (
        <>
            <View tw="flex flex-col items-center justify-center h-full border relative  bg-ciel">
                {type == "success" ? (
                    <>
                        <View tw="bg-emeraude/20 h-36 w-36 rounded-full flex flex-col items-center justify-center">
                            <CheckIcon
                                size={60}
                                strokeWidth={3}
                                color={"#05CD99"}
                            />
                        </View>
                        <Text tw="text-[33px] font-Gb text-marine mt-5">
                            Parfait ! 👏
                        </Text>
                    </>
                ) : type == "error" ? (
                    <>
                        <View tw="bg-sang/20 h-36 w-36 rounded-full flex flex-col items-center justify-center">
                            <XMarkIcon
                                size={60}
                                strokeWidth={3}
                                color={"#E31A1A"}
                            />
                        </View>
                        <Text tw="text-[33px] font-Gb text-marine mt-5">
                            Aïe ! 🤕
                        </Text>
                    </>
                ) : type == "warning" ? (
                    <>
                        <View tw="bg-moutarde/20 h-36 w-36 rounded-full flex flex-col items-center justify-center">
                            <ShieldExclamationIcon
                                size={60}
                                strokeWidth={2}
                                color={"#FFCE20"}
                            />
                        </View>
                        <Text tw="text-[33px] font-Gb text-marine mt-5">
                            Attention ! ✋
                        </Text>
                    </>
                ) : type == "info" ? (
                    <>
                        <View tw="bg-blue/20 h-36 w-36 rounded-full flex flex-col items-center justify-center">
                            <InformationCircleIcon
                                size={60}
                                strokeWidth={2}
                                color={"#4318FF"}
                            />
                        </View>
                        <Text tw="text-[33px] font-Gb text-marine mt-5">
                            Info ! 🤓
                        </Text>
                    </>
                ) : null}

                <Text tw="text-[24px] font-Gb text-marine text-center px-10 mt-5">
                    {message.message}
                </Text>
                <TouchableOpacity onPress={() => handleClick()}>
                    <View tw=" bg-blue px-10 py-5 rounded-2xl mt-8">
                        <Text tw="text-[20px] font-Gb text-white text-center">
                            Retour à l'accueil
                        </Text>
                    </View>
                </TouchableOpacity>
                {message.type == "success" && (
                    <LottieView
                        source={require("../../src/lottie/cleanco.json")}
                        style={{
                            height: 1000,
                            width: 700,
                            right: -205,
                            bottom: 30,
                            position: "absolute",
                            pointerEvents: "none",
                        }}
                        autoPlay
                        loop={false}
                    />
                )}
            </View>
        </>
    );
};

export default HomeScreen;
