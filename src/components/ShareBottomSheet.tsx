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
    const { deletePhoto, onRefreshData } = useAuth();
    const [deleteButton, setDeleteButton] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const { setMessage } = useMessage();
    const { photo, navigation } = props;

    const handleShare = async () => {
        try {
            const result = await Share.share({
                message: `Je vends ma photo "${
                    photo.name
                }" sur l'application UnlockMe. 
Tu peux l'acheter au prix de ${photo.price.toFixed(2)} €.
${photo.shareLink}`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log(
                        "shared with activity type of " + result.activityType
                    );
                } else {
                    console.log("shared");
                }
            } else if (result.action === Share.dismissedAction) {
                console.log("dismissed");
            }
        } catch (error) {
            console.log(error.message);
        }
    };

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

    async function handleDeletePhoto() {
        setLoading(true);
        await deletePhoto(photo.id)
            .then(() => {
                onRefreshData();
                setMessage({
                    type: "success",
                    message: `Votre photo a bien été supprimée !`,
                });
                dismiss();
                navigation.navigate("MessageScreen");
            })
            .catch(() => {
                setMessage({
                    type: "error",
                    message: `Votre photo n'a pas pu être supprimée !`,
                });
                dismiss();
                navigation.navigate("MessageScreen");
            });
        setLoading(false);
    }

    const handleDeleteButtton = () => {
        if (deleteButton) {
            handleDeletePhoto();
        } else {
            setDeleteButton(true);
            setTimeout(() => {
                setDeleteButton(false);
            }, 3000);
        }
    };

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
                    <Text style={styles.title}>Partager "{photo.name}"</Text>
                </TouchableOpacity>
                <View tw=" flex flex-col items-center">
                    <Image
                        source={{ uri: photo.url }}
                        tw="w-full h-80 rounded-lg"
                    />
                    <Text style={styles.userDescription} tw="text-center mt-8">
                        Partagez ce lien pour vendre votre photo à vos amis.
                    </Text>
                    <TouchableOpacity
                        tw="flex flex-row items-center mt-4"
                        onPress={() => {
                            console.log("copy");
                            Haptic.notificationAsync(
                                Haptic.NotificationFeedbackType.Success
                            );
                        }}>
                        <Text tw="text-center text-[34px] font-Gb text-marine">
                            {photo.shareLink}
                        </Text>
                    </TouchableOpacity>
                    <Text tw="text-center mt-8 text-nuage text-[20px] font-Gsb">
                        Vous vendez cette photo à {photo.price.toFixed(2)} € au
                        prix public et toucherez{" "}
                        {photo.priceForSeller.toFixed(2)} € par vente.
                    </Text>
                </View>
                <TouchableOpacity
                    tw="bg-blue rounded-2xl mt-8 p-2 w-full py-5"
                    onPress={() => handleShare()}>
                    <Text tw="text-center text-white font-Gsb text-lg">
                        Partager {photo.name}
                    </Text>
                </TouchableOpacity>
                {!loading && deleteButton && (
                    <TouchableOpacity
                        tw="bg-white rounded-2xl mt-2 p-2 w-full py-5"
                        onPress={() => handleDeleteButtton()}>
                        <Text tw="text-center text-sang font-Gsb text-lg">
                            Confirmer
                        </Text>
                    </TouchableOpacity>
                )}
                {!loading && !deleteButton && (
                    <TouchableOpacity
                        tw="bg-white rounded-2xl mt-2 p-2 w-full py-5"
                        onPress={() => handleDeleteButtton()}>
                        <Text tw="text-center text-sang font-Gsb text-lg">
                            Supprimer la photo
                        </Text>
                    </TouchableOpacity>
                )}
                {loading && (
                    <View tw="bg-white rounded-2xl mt-2 p-2 w-full py-5">
                        <Text tw="text-center text-sang font-Gsb text-lg">
                            Suppression...
                        </Text>
                    </View>
                )}
            </View>
        </BottomSheetModal>
    );
});

export default ShareBottomSheet;
