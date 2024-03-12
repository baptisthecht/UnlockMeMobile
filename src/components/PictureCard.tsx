import { Text, View, Image, StyleSheet } from "react-native";
import React from "react";
import { useDesign } from "../context/DesignContext";
import { ArrowUpTrayIcon } from "react-native-heroicons/mini";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Haptic from "expo-haptics";

export default function PictureCard({ photo }) {
    {
        function handleCopyClick(): void {
            Haptic.selectionAsync();
            alert("Soon");
        }

        const { textColor, secondaryTextColor, primaryColor, bgColor } =
            useDesign();

        const styles = StyleSheet.create({
            title: {
                color: textColor,
                fontSize: 22,
                fontFamily: "Gilroy_SemiBold",
                marginBottom: 8,
            },
            sales: {
                color: secondaryTextColor,
                fontSize: 20,
                fontFamily: "Gilroy_SemiBold",
            },
            price: {
                color: primaryColor,
                fontSize: 20,
                fontFamily: "Gilroy_SemiBold",
            },
        });

        return (
            <View tw="w-full h-32 bg-white rounded-2xl mb-4 p-4 flex flex-row justify-between items-center">
                <View tw="flex flex-row items-center">
                    <Image
                        source={require("../../assets/images/COVER_IMAGE.png")}
                        tw="h-24 w-24 rounded-xl mr-4"
                    />
                    <View>
                        <Text style={styles.title}>{photo.name}</Text>
                        <View tw="flex flex-row">
                            <Text style={styles.price}>
                                {photo.price.toFixed(2)} €
                            </Text>
                            <Text style={styles.sales}>
                                {" "}
                                · {photo.salesCount} ventes
                            </Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => handleCopyClick()}
                    tw="h-12 w-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: bgColor }}>
                    <ArrowUpTrayIcon fill={primaryColor} size={22} />
                </TouchableOpacity>
            </View>
        );
    }
}
