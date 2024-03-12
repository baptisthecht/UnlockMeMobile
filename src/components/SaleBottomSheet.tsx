import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Share,
} from "react-native";
import React, { forwardRef, useCallback } from "react";
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { XMarkIcon } from "react-native-heroicons/mini";
import { useDesign } from "../context/DesignContext";
import { useAuth } from "../context/AuthContext";
import * as Haptic from "expo-haptics";
import { useMessage } from "../context/MessageContext";

export type Ref = BottomSheetModal;

const ShareBottomSheet = forwardRef<Ref, any>((props: any, ref) => {
    const { textColor, secondaryTextColor } = useDesign();
    const { sale } = props;

    const styles = StyleSheet.create({
        title: {
            color: textColor,
            fontSize: 30,
            fontFamily: "Gilroy_Bold",
        },
        balance: {
            color: textColor,
            fontSize: 46,
            fontFamily: "Gilroy_Bold",
        },
        userName: {
            color: textColor,
            fontSize: 28,
            fontFamily: "Gilroy_Bold",
        },
        price: {
            color: textColor,
            fontSize: 40,
            fontFamily: "Gilroy_Bold",
        },
        userDescription: {
            color: secondaryTextColor,
            fontSize: 20,
            fontFamily: "Gilroy_SemiBold",
        },
        editProfile: {
            color: "white",
            fontSize: 17,
            fontFamily: "Gilroy_SemiBold",
        },
        image: {
            borderColor: "white",
            borderWidth: 4,
        },
    });
    const snapPoints = React.useMemo(() => ["90%"], []);
    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                appearsOnIndex={0}
                disappearsOnIndex={-1}
                {...props}
            />
        ),
        []
    );

    const { dismiss } = useBottomSheetModal();

    return (
        <BottomSheetModal
            ref={ref}
            snapPoints={snapPoints}
            overDragResistanceFactor={0}
            handleIndicatorStyle={{ display: "none" }}
            backdropComponent={renderBackdrop}>
            <View tw="p-6 " accessible={false}>
                <TouchableOpacity
                    tw="flex flex-row items-center mb-6"
                    onPress={() => {
                        dismiss();
                    }}>
                    <View tw="h-10 w-10 rounded-full bg-glass flex items-center justify-center mr-5">
                        <XMarkIcon
                            size={24}
                            strokeWidth={4}
                            color={"#4318FF"}
                        />
                    </View>
                    <Text style={styles.title}>Informations sur la vente</Text>
                </TouchableOpacity>
                <View tw=" flex flex-col items-start">
                    <Image
                        source={{ uri: sale.photo.url }}
                        tw="w-full h-60 rounded-lg"
                    />

                    <Text tw="text-center mt-8 text-[18px] font-Gsb text-nuage">
                        MONTANT DE LA VENTE
                    </Text>
                    <Text tw="text-center mt-2 text-[24px] font-Gsb text-marine">
                        {sale.price.toFixed(2)} €
                    </Text>
                    <Text tw="text-center mt-4 text-[18px] font-Gsb text-nuage">
                        VOTRE PART
                    </Text>
                    <Text tw="text-center mt-2 text-[24px] font-Gsb text-marine">
                        {sale.priceForSeller.toFixed(2)} €
                    </Text>
                    <Text tw="text-center mt-4 text-[18px] font-Gsb text-nuage">
                        FRAIS DE SERVICE ET DE TRANSACTION
                    </Text>
                    <Text tw="text-center mt-2 text-[24px] font-Gsb text-marine">
                        {sale.price.toFixed(2) - sale.priceForSeller.toFixed(2)}{" "}
                        €
                    </Text>
                    <Text tw="text-center mt-4 text-[18px] font-Gsb text-nuage">
                        NOM DE L'ACHETEUR
                    </Text>
                    <Text tw="text-center mt-2 text-[24px] font-Gsb text-marine">
                        {sale.buyerName}
                    </Text>
                    <Text tw="text-center mt-4 text-[18px] font-Gsb text-nuage">
                        EMAIL DE L'ACHETEUR
                    </Text>
                    <Text tw="text-center mt-2 text-[24px] font-Gsb text-marine">
                        {sale.buyerEmail}
                    </Text>
                    <Text tw="text-center mt-4 text-[18px] font-Gsb text-nuage">
                        DATE DE VENTE
                    </Text>
                    <Text tw="text-center mt-2 text-[24px] font-Gsb text-marine">
                        {sale.createdAt.split("T")[0].split("-")[2] +
                            "/" +
                            sale.createdAt.split("T")[0].split("-")[1] +
                            "/" +
                            sale.createdAt.split("T")[0].split("-")[0]}{" "}
                        à{" "}
                        {sale.createdAt
                            .split("T")[1]
                            .split(".")[0]
                            .slice(0, -3)}
                    </Text>
                    <Text tw="text-center mt-4 text-[18px] font-Gsb text-nuage">
                        ÉTAT
                    </Text>
                    <Text tw="text-center mt-2 text-[24px] font-Gsb text-marine">
                        {sale.status == "pending" ? (
                            <Text tw="text-center mt-2 text-[24px] font-Gsb text-marine">
                                En attente
                            </Text>
                        ) : sale.status == "confirmed" ? (
                            <Text tw="text-center mt-2 text-[24px] font-Gsb text-marine">
                                Validé
                            </Text>
                        ) : (
                            <Text tw="text-center mt-2 text-[24px] font-Gsb text-marine">
                                Refusé
                            </Text>
                        )}
                    </Text>
                </View>
            </View>
        </BottomSheetModal>
    );
});

export default ShareBottomSheet;
