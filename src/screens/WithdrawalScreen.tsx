import {
    Text,
    TouchableOpacity,
    View,
    Keyboard,
    Image,
    ActivityIndicator,
} from "react-native";
import React from "react";
import Layout from "../layouts/Layout";
import { CheckBadgeIcon } from "react-native-heroicons/mini";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useAuth } from "../context/AuthContext";
import {
    TextInput,
    TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { useMessage } from "../context/MessageContext";

export default function WithdrawalScreen({ navigation }) {
    const { authState, onWithdrawalRequest, onRefreshData } = useAuth();
    const [loading, setLoading] = React.useState<boolean>(false);
    const { setMessage } = useMessage();

    const [inputs, setInputs] = React.useState<{
        amount: string;
        rib: string;
    }>({
        amount: authState.user.balance.toFixed(2),
        rib: "FR76 02645 4566 42346 123",
    });

    const handleWithdrawalClick = async () => {
        setLoading(true);
        const status = await onWithdrawalRequest(
            parseFloat(inputs.amount),
            inputs.rib.replace(/ /g, "")
        );
        console.log("status : " + JSON.stringify(status));
        if (status == 201) {
            setMessage({
                type: "success",
                message: `Votre demande de retrait de ${inputs.amount} € a bien été prise en compte.`,
            });
        } else if (status == 404 || status == 403 || status == 500) {
            setMessage({
                type: "error",
                message: `Votre demande de retrait de ${inputs.amount} € n'a pas pu être traitée.`,
            });
        }
        setLoading(false);
        navigation.navigate("MessageScreen");
        onRefreshData();
    };

    return (
        <Layout>
            <View tw="py-24">
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
                        Demande de retrait
                    </Text>
                </View>
                <TouchableWithoutFeedback
                    onPress={Keyboard.dismiss}
                    tw=" flex flex-col items-center bg-white rounded-3xl p-5">
                    <Image
                        source={{
                            uri: authState.user.coverPictureUrl,
                        }}
                        tw="w-full h-40 rounded-xl"
                    />
                    <TouchableOpacity tw="h-20 w-20 rounded-full bg-white -mt-10 flex flex-col items-center justify-center">
                        <Image
                            source={{
                                uri: authState.user.profilePictureUrl,
                            }}
                            style={{ borderColor: "white", borderWidth: 4 }}
                            tw="w-full h-full rounded-full"
                        />
                    </TouchableOpacity>
                    <Text tw="text-center mt-8 text-[20px] font-Gsb text-nuage">
                        Montant à retirer
                    </Text>
                    <View tw="flex flex-row items-center mt-3">
                        <TextInput
                            tw="font-Gb text-[44px] text-marine w-auto"
                            keyboardType={"numeric"}
                            value={inputs.amount}
                            onFocus={(e) => {
                                if (
                                    e.nativeEvent.text ==
                                    authState.user.balance.toFixed(2)
                                )
                                    setInputs({ ...inputs, amount: "" });
                            }}
                            onBlur={(e) => {
                                if (e.nativeEvent.text == "")
                                    setInputs({
                                        ...inputs,
                                        amount: authState.user.balance.toFixed(
                                            2
                                        ),
                                    });
                            }}
                            onChange={(e) => {
                                setInputs({
                                    ...inputs,
                                    amount: e.nativeEvent.text.replace(
                                        ",",
                                        "."
                                    ),
                                });
                            }}
                        />
                        <Text tw="text-center text-marine font-Gb text-[44px]">
                            {" "}
                            €
                        </Text>
                    </View>
                    <Text tw="text-center mt-4 text-[20px] text-nuage font-Gsb">
                        Sur le compte
                    </Text>
                    <View tw="flex flex-row items-center mt-4">
                        <TextInput
                            tw="font-Gb text-[25px] text-marine w-auto"
                            keyboardType={"default"}
                            value={inputs.rib}
                            onFocus={(e) => {
                                if (
                                    e.nativeEvent.text ==
                                    "FR76 02645 4566 42346 123"
                                )
                                    setInputs({ ...inputs, rib: "" });
                            }}
                            onBlur={(e) => {
                                if (e.nativeEvent.text == "")
                                    setInputs({
                                        ...inputs,
                                        rib: "FR76 02645 4566 42346 123",
                                    });
                            }}
                            onChange={(e) => {
                                setInputs({
                                    ...inputs,
                                    rib: e.nativeEvent.text,
                                });
                            }}
                        />
                    </View>
                    <Text tw="text-center mt-8 text-[20px] text-nuage font-Gsb">
                        Sur un total de {authState.user.balance.toFixed(2)} €
                        disponibles.
                    </Text>
                    <Text tw="text-center mt-2 text-[20px] text-nuage font-Gsb">
                        Votre solde sera de{" "}
                        {(
                            authState.user.balance - parseFloat(inputs.amount)
                        ).toFixed(2)}{" "}
                        €
                    </Text>
                    <View tw="flex flex-row items-center mt-8">
                        <CheckBadgeIcon fill={"#05CD99"} />
                        <Text tw="text-center text-emeraude font-Gb ml-[5px] pt-px text-[20px]">
                            Le virement sera effectué sous 48h
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableOpacity
                    onPress={() => handleWithdrawalClick()}
                    tw="bg-blue rounded-2xl mt-8 p-2 w-full h-16 flex flex-col justify-center">
                    {!loading ? (
                        <Text tw="text-center text-white font-Gsb text-lg">
                            Retirer {inputs.amount} €
                        </Text>
                    ) : (
                        <ActivityIndicator color="white" />
                    )}
                </TouchableOpacity>
            </View>
        </Layout>
    );
}
