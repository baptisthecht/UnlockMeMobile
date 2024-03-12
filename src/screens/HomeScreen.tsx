import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useRef } from "react";
import Layout from "../layouts/Layout";
import { useAuth } from "../context/AuthContext";
import { useDesign } from "../context/DesignContext";
import {
    BanknotesIcon,
    CameraIcon,
    ArrowUpTrayIcon,
} from "react-native-heroicons/mini";
import { MediaTypeOptions, launchImageLibraryAsync } from "expo-image-picker";
import BottomSheet from "../components/BottomSheet";
import { useMessage } from "../context/MessageContext";
import * as Haptic from "expo-haptics";

const HomeScreen = ({ navigation }) => {
    const bottomSheetRef = useRef(null);
    const { authState, onRefreshData, uploadPhoto } = useAuth();
    const { textColor, secondaryTextColor, primaryColor, bgColor } =
        useDesign();
    const [imageURI, setImageURI] = React.useState("null");
    const [file, setFile] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const { setMessage } = useMessage();

    const styles = StyleSheet.create({
        title: {
            color: textColor,
            fontSize: 33,
            fontFamily: "Gilroy_Bold",
        },
        userName: {
            color: textColor,
            fontSize: 28,
            fontFamily: "Gilroy_Bold",
        },
        userDescription: {
            color: secondaryTextColor,
            fontSize: 20,
            fontFamily: "Gilroy_SemiBold",
        },
        editProfile: {
            color: primaryColor,
            fontSize: 17,
            fontFamily: "Gilroy_SemiBold",
        },
        image: {
            borderColor: "white",
            borderWidth: 4,
        },
    });

    const options = {
        mediaType: MediaTypeOptions.Images,
        quality: 1,
        selectionLimit: 1,
    };

    const handleUploadButton = async (name: string, price: string) => {
        try {
            setIsLoading(true);
            if (!file) return;
            await uploadPhoto(file, name, price)
                .then((res) => {
                    onRefreshData();
                    console.log("res: " + JSON.stringify(res));
                    bottomSheetRef.current.dismiss();
                    setMessage({
                        type: "success",
                        message: `Votre photo "${name}" a bien été mise en ligne !`,
                    });
                    navigation.navigate("MessageScreen");
                })
                .catch((err) => {
                    console.log("err:" + err);
                });
            setIsLoading(false);
        } catch (error) {
            console.log("Error caught: ", error);
            setIsLoading(false);
        }
    };

    const clearFile = () => {
        setFile(null);
        setImageURI(null);
        bottomSheetRef.current.dismiss();
    };

    const openBottomSheet = async () => {
        try {
            const result = await launchImageLibraryAsync();
            setImageURI(result.assets[0].uri);
            setFile(result.assets[0]);
            bottomSheetRef.current.present();
        } catch (error) {}
    };

    return (
        <>
            <Layout>
                <View tw="flex flex-col justify-center h-full">
                    <Text style={styles.title}>
                        Bienvenue, {authState.user.displayName} ! 👋
                    </Text>
                    <View tw="flex flex-row mt-6">
                        <View tw="bg-white rounded-2xl mr-3 flex-1">
                            <View tw="p-5 flex flex-col items-center justify-between flex-1">
                                <Image
                                    source={{
                                        uri: authState.user.coverPictureUrl,
                                    }}
                                    tw="w-full h-24 rounded-xl"
                                />
                                <Image
                                    style={styles.image}
                                    source={{
                                        uri: authState.user.profilePictureUrl,
                                    }}
                                    tw="h-20 w-20 rounded-full -mt-16"
                                />
                                <View tw="-mt-6">
                                    <Text
                                        style={styles.userName}
                                        tw="text-center mt-3">
                                        {authState.user.displayName}
                                    </Text>
                                    <Text
                                        style={styles.userDescription}
                                        tw="text-center mt-1.5">
                                        {authState.user.bio}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate("SalesScreen")
                                    }>
                                    <Text
                                        style={styles.userName}
                                        tw="text-center ">
                                        {authState.user.salesCount}
                                    </Text>
                                    <Text
                                        style={styles.userDescription}
                                        tw="text-center mt-1">
                                        Ventes
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate("ProfileScreen")
                                    }
                                    tw="bg-white rounded-2xl p-2">
                                    <Text
                                        style={styles.editProfile}
                                        tw="text-center">
                                        Modifier mon profil
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View tw="flex flex-col ml-3 flex-1">
                            <TouchableOpacity
                                tw="bg-white rounded-2xl mb-3 h-44 p-6 flex flex-col justify-between"
                                onPress={() =>
                                    navigation.navigate("MyPicturesScreen")
                                }>
                                <View
                                    style={{ backgroundColor: bgColor }}
                                    tw="w-14 h-14 rounded-full flex flex-row items-center justify-center">
                                    <CameraIcon fill={primaryColor} />
                                </View>
                                <View>
                                    <Text style={styles.userDescription}>
                                        Mes photos
                                    </Text>
                                    <Text
                                        style={[
                                            styles.userName,
                                            { fontSize: 34, marginTop: 8 },
                                        ]}>
                                        {authState.user.photos.length}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                tw="bg-white rounded-2xl mt-3 h-44 p-6 flex flex-col justify-between"
                                onPress={() =>
                                    navigation.navigate("WalletScreen")
                                }>
                                <View
                                    style={{ backgroundColor: bgColor }}
                                    tw="w-14 h-14 rounded-full flex flex-row items-center justify-center">
                                    <BanknotesIcon fill={primaryColor} />
                                </View>
                                <View>
                                    <Text style={styles.userDescription}>
                                        Mon portefeuille
                                    </Text>
                                    <Text
                                        style={[
                                            styles.userName,
                                            { fontSize: 34, marginTop: 8 },
                                        ]}>
                                        {authState.user.balance.toFixed(2)} €
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity
                        tw="w-full rounded-2xl bg-white mt-6 h-44 p-5 justify-center flex flex-row items-center"
                        onPress={() => openBottomSheet()}>
                        <View className="relative w-1/2">
                            <Image
                                source={require("../../assets/images/upload.png")}
                                tw=""
                            />
                            <View tw="absolute ml-5 top-1/3 flex flex-col items-center -translate-y-1">
                                <ArrowUpTrayIcon fill={primaryColor} />
                                <Text
                                    style={styles.editProfile}
                                    tw="text-center mt-3">
                                    Importer une photo
                                </Text>
                            </View>
                        </View>
                        <View tw="w-1/2 pl-3">
                            <Text
                                style={{
                                    color: textColor,
                                    fontSize: 24,
                                    fontFamily: "Gilroy_Bold",
                                }}>
                                Publier une nouvelle photo
                            </Text>
                            <Text
                                style={{
                                    color: secondaryTextColor,
                                    fontSize: 18,
                                    fontFamily: "Gilroy_SemiBold",
                                    marginTop: 12,
                                }}>
                                Les fichiers PNG, JPEG et GIF sont autorisés.
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Layout>
            <BottomSheet
                ref={bottomSheetRef}
                imageURI={imageURI}
                openBottomSheet={() => openBottomSheet()}
                clearFile={() => clearFile()}
                handleUploadButton={handleUploadButton}
                isLoading={isLoading}
            />
        </>
    );
};

export default HomeScreen;
