import { Text, TouchableOpacity, View, FlatList, Image } from "react-native";
import React, { useRef, useState } from "react";
import Layout from "../layouts/Layout";

import {
    ChevronLeftIcon,
    InformationCircleIcon,
} from "react-native-heroicons/outline";
import { useDesign } from "../context/DesignContext";
import { useAuth } from "../context/AuthContext";
import { RefreshControl } from "react-native-gesture-handler";
import SaleBottomSheet from "../components/SaleBottomSheet";
import { Sale } from "../context/AuthContext";
export default function MyPicturesScreen({ navigation }) {
    const bottomSheetRef = useRef(null);
    const { primaryColor } = useDesign();
    const { authState, onRefreshData } = useAuth();
    const sales = authState.user.sales;
    const [refreshing, setRefreshing] = useState(false);
    const handleRefresh = () => {
        setRefreshing(true);
        onRefreshData()
            .then(() => setRefreshing(false))
            .catch(() => setRefreshing(false));
    };
    const [actualSaleForInfo, setActualSaleForInfo] = useState<Sale>({
        id: 0,
        buyerEmail: "",
        buyerName: "",
        createdAt: "2024-01-17T17:15:01.074Z",
        price: 0,
        priceForSeller: 0,
        status: "",
        photo: {
            id: 0,
            name: "",
            price: 0,
            priceForSeller: 0,
            salesCount: 0,
            sales: [],
            url: "",
            shareLink: "",
        },
    });

    const handleInfos = (sale: Sale) => {
        bottomSheetRef.current?.present();
        setActualSaleForInfo(sale);
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
                    data={sales}
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
                                Mes ventes
                            </Text>
                        </View>
                    )}
                    showsVerticalScrollIndicator={false}
                    renderItem={(sale) => (
                        <View tw="bg-white p-4 rounded-2xl mb-3 flex flex-row justify-between items-center">
                            <View tw="flex flex-row items-center">
                                <Image
                                    source={{ uri: sale.item.photo.url }}
                                    tw="h-24 w-24 rounded-lg mr-4"
                                />
                                <View>
                                    <Text tw="font-DMsb text-xl text-marine">
                                        Par {sales[sale.index].buyerName}
                                    </Text>
                                    <View tw="flex flex-row items-center">
                                        <Text tw="font-DMsb text-xl text-blue">
                                            {sale.item.price.toFixed(2)} €
                                        </Text>
                                        <Text tw="font-DMsb text-xl text-gray mx-2">
                                            •
                                        </Text>
                                        <Text tw="font-DMsb text-xl text-gray">
                                            Vendu {sale.item.photo.salesCount}{" "}
                                            fois
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => handleInfos(sale.item)}
                                tw="h-12 w-12 bg-ciel rounded-xl flex items-center justify-center">
                                <InformationCircleIcon
                                    size={24}
                                    strokeWidth={2}
                                    color={primaryColor}
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </Layout>
            <SaleBottomSheet
                ref={bottomSheetRef}
                imageURI={"imageURI"}
                sale={actualSaleForInfo}
                navigation={navigation}
            />
        </>
    );
}
