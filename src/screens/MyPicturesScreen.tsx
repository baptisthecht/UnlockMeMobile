import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    ScrollView,
    FlatList,
    Button,
    Image,
} from "react-native";
import React, { Component, useRef, useState } from "react";
import Layout from "../layouts/Layout";
import { PaperAirplaneIcon } from "react-native-heroicons/mini";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useDesign } from "../context/DesignContext";
import PictureCard from "../components/PictureCard";
import { useAuth } from "../context/AuthContext";
import { RefreshControl } from "react-native-gesture-handler";
import ShareBottomSheet from "../components/ShareBottomSheet";

export default function MyPicturesScreen({ navigation }) {
    const bottomSheetRef = useRef(null);
    const { textColor, primaryColor } = useDesign();

    const { authState, onRefreshData } = useAuth();
    const photos = authState.user.photos;
    const [refreshing, setRefreshing] = useState(false);
    const handleRefresh = () => {
        setRefreshing(true);
        onRefreshData()
            .then(() => setRefreshing(false))
            .catch(() => setRefreshing(false));
    };
    const [actualPhotoToShare, setActualPhotoToShare] = useState({
        id: 0,
        name: "",
        url: "",
        shareLink: "",
        createdAt: "",
        price: 0,
        priceForSeller: 0,
        sales: [],
        salesCount: 0,
    });

    const handleShare = (photo: any) => {
        bottomSheetRef.current?.present();
        setActualPhotoToShare(photo);
        console.log(JSON.stringify(photo));
    };

    return (
        <>
            <Layout>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => handleRefresh()}
                        />
                    }
                    keyExtractor={(item: any) => item.id}
                    data={photos}
                    tw="mt-24"
                    ListHeaderComponent={() => (
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
                                Mes photos
                            </Text>
                        </View>
                    )}
                    showsVerticalScrollIndicator={false}
                    renderItem={(photo) => (
                        <View tw="bg-white p-4 rounded-2xl mb-3 flex flex-row justify-between items-center">
                            <View tw="flex flex-row items-center">
                                <Image
                                    source={{ uri: photos[photo.index].url }}
                                    tw="h-24 w-24 rounded-lg mr-4"
                                />
                                <View>
                                    <Text tw="font-DMsb text-xl text-marine">
                                        {photos[photo.index].name}
                                    </Text>
                                    <View tw="flex flex-row items-center">
                                        <Text tw="font-DMsb text-xl text-blue">
                                            {photos[photo.index].price.toFixed(
                                                2
                                            )}{" "}
                                            €
                                        </Text>
                                        <Text tw="font-DMsb text-xl text-gray mx-2">
                                            •
                                        </Text>
                                        <Text tw="font-DMsb text-xl text-gray">
                                            {photos[photo.index].salesCount}{" "}
                                            ventes
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => handleShare(photo.item)}
                                tw="h-12 w-12 bg-ciel rounded-xl flex items-center justify-center">
                                <PaperAirplaneIcon
                                    size={24}
                                    strokeWidth={4}
                                    color={primaryColor}
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </Layout>
            <ShareBottomSheet
                ref={bottomSheetRef}
                imageURI={"imageURI"}
                photo={actualPhotoToShare}
                navigation={navigation}
            />
        </>
    );
}
