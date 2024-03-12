import {
    View,
    Text,
    Button,
    TouchableOpacity,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    ActivityIndicator,
} from "react-native";
import React, { forwardRef, useCallback } from "react";
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { XMarkIcon, PencilSquareIcon } from "react-native-heroicons/mini";
import { useDesign } from "../context/DesignContext";
import { useAuth } from "../context/AuthContext";
import {
    TextInput,
    TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { Keyboard } from "react-native";
export type Ref = BottomSheetModal;

type Props = {
    imageURI: string;
    openBottomSheet: () => Promise<void>;
    clearFile: () => void;
    handleUploadButton: (name: string, price: string) => Promise<void>;
    isLoading: boolean;
};

const BottomSheet = forwardRef<Ref, Props>((props: Props, ref) => {
    const { textColor, secondaryTextColor, primaryColor, bgColor } =
        useDesign();
    const { authState } = useAuth();
    const {
        imageURI,
        openBottomSheet,
        clearFile,
        handleUploadButton,
        isLoading,
    } = props;
    const regex = /^(\d+(\,\d{3})*(\.\d{1,2})?)?$/;
    const [inputs, setInputs] = React.useState<{
        name: string;
        price: string;
    }>({
        name: "Ma super photo",
        price: "3.50",
    });

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
    const inputRef = React.useRef(null);

    return (
        <BottomSheetModal
            onDismiss={() => {
                clearFile();
                setInputs({ name: "Ma super photo", price: "3.50" });
            }}
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
                    <Text style={styles.title}>Mettre en ligne</Text>
                </TouchableOpacity>
                <View tw="w-full flex flex-col items-center">
                    <Image
                        source={{ uri: imageURI }}
                        tw="w-full h-52 rounded-xl"
                    />
                    <TouchableOpacity
                        onPress={() => openBottomSheet()}
                        tw="h-20 w-20 rounded-full bg-white -mt-10 flex flex-col items-center justify-center"
                        style={{
                            backgroundColor: bgColor,
                            borderWidth: 6,
                            borderColor: "white",
                        }}>
                        <PencilSquareIcon
                            size={24}
                            strokeWidth={4}
                            color={"#4318FF"}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableWithoutFeedback
                    onPress={Keyboard.dismiss}
                    tw=" flex flex-col items-center">
                    <TextInput
                        tw="font-Gb text-[34px] text-marine w-auto mt-2 px-4"
                        keyboardType={"default"}
                        value={inputs.name}
                        onFocus={(e) => {
                            if (e.nativeEvent.text == "Ma super photo")
                                setInputs({ ...inputs, name: "" });
                        }}
                        onChange={(e) => {
                            setInputs({
                                ...inputs,
                                name: e.nativeEvent.text,
                            });
                        }}
                    />
                    <Text style={styles.userDescription} tw="text-center mt-8">
                        Fixez un prix
                    </Text>
                    <View tw="flex flex-row items-center mt-4">
                        <TextInput
                            tw="font-Gb text-[40px] text-marine w-auto"
                            keyboardType={"numeric"}
                            value={inputs.price}
                            onFocus={(e) => {
                                if (e.nativeEvent.text == "3.50")
                                    setInputs({ ...inputs, price: "" });
                            }}
                            onChange={(e) => {
                                setInputs({
                                    ...inputs,
                                    price: e.nativeEvent.text.replace(",", "."),
                                });
                            }}
                        />
                        <Text style={styles.price} tw="text-center">
                            {" "}
                            €
                        </Text>
                    </View>
                    <Text style={styles.userDescription} tw="text-center mt-8">
                        Vous toucherez{" "}
                        {(parseFloat(inputs.price) * 0.9).toFixed(2)} € du
                        montant total.
                    </Text>
                </TouchableWithoutFeedback>
                {inputs.price != "" && regex.test(inputs.price) && (
                    <TouchableOpacity
                        onPress={() =>
                            handleUploadButton(inputs.name, inputs.price)
                        }
                        tw="bg-blue rounded-2xl mt-8 p-2 w-full h-16 flex flex-col justify-center">
                        {!isLoading ? (
                            <Text tw="text-center text-white font-Gsb text-lg">
                                Mettre en ligne pour{" "}
                                {parseFloat(inputs.price).toFixed(2)} €
                            </Text>
                        ) : (
                            <ActivityIndicator color="white" />
                        )}
                    </TouchableOpacity>
                )}
            </View>
        </BottomSheetModal>
    );
});

export default BottomSheet;
