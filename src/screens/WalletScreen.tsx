import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Layout from "../layouts/Layout";
import {
    CalendarIcon,
    ChartBarIcon,
    CheckBadgeIcon,
    CheckIcon,
    InformationCircleIcon,
    XMarkIcon,
} from "react-native-heroicons/mini";
import {
    ChevronUpIcon,
    EllipsisHorizontalIcon,
    ClockIcon,
} from "react-native-heroicons/outline";
import { useDesign } from "../context/DesignContext";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useAuth } from "../context/AuthContext";
import * as Haptic from "expo-haptics";
import { ScrollView } from "react-native-gesture-handler";

export default function WalletScreen({ navigation }) {
    const { authState } = useAuth();
    const { secondaryTextColor, primaryColor } = useDesign();

    function handleWithdrawalClick(): void {
        Haptic.selectionAsync();
        navigation.navigate("WithdrawalScreen");
    }

    return (
        <Layout>
            <ScrollView tw="py-24" showsVerticalScrollIndicator={false}>
                <View tw="flex flex-row items-center mb-6">
                    <TouchableOpacity
                        tw="h-10 w-10 rounded-full bg-glass flex items-center justify-center mr-3"
                        onPress={() => navigation.goBack()}>
                        <ChevronLeftIcon
                            size={20}
                            strokeWidth={4}
                            color={"#4318FF"}
                        />
                    </TouchableOpacity>
                    <Text tw="text-marine text-[28px] font-Gb">
                        Mon portefeuille
                    </Text>
                </View>
                <View tw="bg-white rounded-2xl p-8">
                    <View tw="flex flex-row justify-between items-center mb-8">
                        <View tw="flex flex-row items-center p-2.5 rounded-lg bg-ciel">
                            <CalendarIcon
                                size={22}
                                stroke={secondaryTextColor}
                                fill={secondaryTextColor}
                                strokeWidth={0.5}
                            />
                            <Text tw="text-[18px] text-nuage font-Gsb ml-2">
                                Dernières ventes
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("SalesScreen")}
                            tw="h-10 w-10 rounded-xl flex items-center justify-center bg-ciel">
                            <ChartBarIcon fill={primaryColor} size={20} />
                        </TouchableOpacity>
                    </View>
                    <View tw="flex flex-row items-end">
                        <Text tw="text-[46px] text-marine font-Gb">
                            {authState.user.balance.toFixed(2)} €
                        </Text>
                        <View tw="flex flex-row items-center pb-1 pl-3">
                            <ChevronUpIcon
                                stroke={"#05CD99"}
                                strokeWidth={3}
                                size={16}
                            />
                            <Text tw="text-[20px] text-emeraude font-Gb ml-[5px]">
                                +12,45%
                            </Text>
                        </View>
                    </View>
                    <Text tw="text-[18px] mt-[6px] font-Gsb text-nuage">
                        Disponibles au retrait
                    </Text>
                    {authState.user.balance > 20 ? (
                        <View tw="flex flex-row items-center mt-8">
                            <CheckBadgeIcon fill={"#05CD99"} />
                            <Text tw="text-[20px] text-emeraude font-Gb pt-px ml-[5px]">
                                Retrait disponible
                            </Text>
                        </View>
                    ) : (
                        <View tw="flex flex-row items-center mt-8">
                            <InformationCircleIcon fill={"#FFCE20"} />
                            <Text tw="text-[20px] text-moutarde font-Gb pt-px ml-[5px]">
                                Retrait à partir de 20 €
                            </Text>
                        </View>
                    )}
                </View>
                <View tw="bg-white rounded-2xl p-8 mt-6">
                    <View tw="flex flex-row justify-between items-center mb-6">
                        <Text tw="text-[33px] text-marine font-Gb">
                            Mes retraits
                        </Text>
                        <TouchableOpacity
                            onPress={() =>
                                alert("Lien copié dans le presse-papier")
                            }
                            tw="h-10 w-10 rounded-xl flex items-center justify-center bg-ciel">
                            <EllipsisHorizontalIcon
                                stroke={primaryColor}
                                fill={primaryColor}
                                size={24}
                                strokeWidth={3}
                            />
                        </TouchableOpacity>
                    </View>
                    <View tw="flex flex-row mb-5">
                        <Text tw="text-[18px] text-nuage font-Gsb mt-[6px] w-[130px]">
                            ÉTAT
                        </Text>
                        <Text tw="text-[18px] text-nuage font-Gsb mt-[6px] w-[100px]">
                            MONTANT
                        </Text>
                        <Text tw="text-[18px] text-nuage font-Gsb mt-[6px] ">
                            DATE
                        </Text>
                    </View>
                    {authState.user.withdrawals.map((w: any, i: number) => (
                        <View tw="flex flex-row mb-2" key={i}>
                            <View tw="flex flex-row items-center">
                                {w.status == "pending" ? (
                                    <ClockIcon
                                        stroke={"#FFCE20"}
                                        size={20}
                                        strokeWidth={2}
                                    />
                                ) : w.status == "accepted" ? (
                                    <CheckIcon
                                        stroke={"#05CD99"}
                                        size={20}
                                        strokeWidth={2}
                                    />
                                ) : (
                                    <XMarkIcon
                                        stroke={"#E31A1A"}
                                        size={20}
                                        strokeWidth={2}
                                    />
                                )}

                                <Text tw="text-[18px] text-marine font-Gb mt-[6px] w-[100px] ml-[10px]">
                                    {w.status == "pending"
                                        ? "En attente"
                                        : w.status == "accepted"
                                        ? "Validé"
                                        : "Refusé"}
                                </Text>
                            </View>
                            <Text tw="text-[18px] text-marine font-Gb mt-[6px] w-[100px]">
                                {w.amount.toFixed(2)} €
                            </Text>
                            <Text tw="text-[18px] text-marine font-Gb mt-[6px]">
                                {w.createdAt.split("T")[0].split("-")[2] +
                                    "/" +
                                    w.createdAt.split("T")[0].split("-")[1] +
                                    "/" +
                                    w.createdAt.split("T")[0].split("-")[0]}
                            </Text>
                        </View>
                    ))}
                </View>
                {authState.user.balance > 20 && (
                    <TouchableOpacity
                        tw="bg-blue w-full flex flex-row justify-center rounded-3xl py-6 mt-6 mb-40"
                        onPress={() => handleWithdrawalClick()}>
                        <Text tw="font-Gsb text-[20px] text-ciel">
                            Demander un retrait
                        </Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </Layout>
    );
}
