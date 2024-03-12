import {
    Text,
    TouchableOpacity,
    View,
    Keyboard,
    Image,
    ActivityIndicator,
} from "react-native";
import ExpoFastImage from "expo-fast-image";
import React from "react";
import Layout from "../layouts/Layout";
import {
    ChevronLeftIcon,
    ShieldExclamationIcon,
    PencilSquareIcon,
} from "react-native-heroicons/outline";
import { useAuth } from "../context/AuthContext";
import {
    TextInput,
    TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { useDesign } from "../context/DesignContext";
import { useMessage } from "../context/MessageContext";

export default function ProfileScreen({ navigation }) {
    const { authState, onLogout, onUpdateUserData, onRefreshData } = useAuth();
    const { setMessage } = useMessage();
    const [loading, setLoading] = React.useState<boolean>(false);
    const { textColor, secondaryTextColor } = useDesign();
    const [inputs, setInputs] = React.useState<{
        displayName: string;
        bio: string;
        email: string;
    }>({
        displayName: authState.user.displayName,
        bio: authState.user.bio,
        email: authState.user.email,
    });

    async function handleUpdateUser() {
        setLoading(true);
        const status = await onUpdateUserData(
            inputs.displayName,
            inputs.bio,
            inputs.email
        );
        setLoading(false);
        if (status == 200) {
            setMessage({
                type: "success",
                message: `Vos informations personnelles ont bien été mises à jour.`,
            });
            onRefreshData();
        } else {
            setMessage({
                type: "error",
                message: `Vos informations personnelles n'ont pas pu être mises à jour.`,
            });
        }
        navigation.navigate("MessageScreen");
    }

    return (
        <>
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
                            Modifier mon profil
                        </Text>
                    </View>
                    <TouchableWithoutFeedback
                        onPress={Keyboard.dismiss}
                        tw=" flex flex-col items-center bg-white rounded-3xl p-5 pb-0 rounded-bl-none rounded-br-none">
                        <Image
                            source={{ uri: authState.user.coverPictureUrl }}
                            tw="w-full h-36 rounded-xl"
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
                        <View tw="flex items-center mt-3">
                            <Text tw="text-[18px] text-nuage font-Gsb mt-[6px]">
                                NOM D'UTILISATEUR
                            </Text>
                            <View tw="flex flex-row items-center mt-2">
                                <TextInput
                                    tw="font-Gb text-[36px] text-marine w-auto mt-1 px-2"
                                    keyboardType={"default"}
                                    value={inputs.displayName}
                                    onChange={(e) => {
                                        setInputs({
                                            ...inputs,
                                            displayName: e.nativeEvent.text,
                                        });
                                    }}
                                />
                                <PencilSquareIcon
                                    size={24}
                                    strokeWidth={2.5}
                                    stroke={textColor}
                                />
                            </View>
                            <Text tw="text-[18px] text-nuage font-Gsb mt-4">
                                BIO
                            </Text>
                            <View tw="flex flex-row items-center mt-2">
                                <TextInput
                                    tw="font-Gb text-[22px] text-nuage w-auto mt-1 px-2"
                                    keyboardType={"default"}
                                    value={inputs.bio}
                                    onChange={(e) => {
                                        setInputs({
                                            ...inputs,
                                            bio: e.nativeEvent.text,
                                        });
                                    }}
                                />
                                <PencilSquareIcon
                                    size={20}
                                    strokeWidth={2.5}
                                    stroke={secondaryTextColor}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <View tw=" flex flex-col items-center bg-white rounded-3xl p-5 pt-0 rounded-tl-none rounded-tr-none">
                        <Text tw="text-[18px] text-nuage font-Gsb mt-6">
                            EMAIL
                        </Text>
                        <View tw="flex flex-row items-center mt-2">
                            <TextInput
                                tw="font-Gb text-[22px] text-marine w-auto mt-1 px-2"
                                keyboardType={"default"}
                                value={inputs.email}
                                onChange={(e) => {
                                    setInputs({
                                        ...inputs,
                                        email: e.nativeEvent.text,
                                    });
                                }}
                            />
                            <PencilSquareIcon
                                size={20}
                                strokeWidth={2.5}
                                stroke={textColor}
                            />
                        </View>
                        <View tw="flex flex-row my-2 px-4 items-center">
                            <ShieldExclamationIcon
                                size={30}
                                stroke={"#FFCE20"}
                                strokeWidth={2}
                            />
                            <Text tw="font-Gsb text-[20px] text-moutarde ml-2">
                                Si vous modifiez votre adresse mail, un lien de
                                confirmation vous sera envoyé.
                            </Text>
                        </View>
                        <Text tw="text-[18px] text-nuage font-Gsb mt-4">
                            MOT DE PASSE
                        </Text>
                        <TouchableOpacity
                            tw="w-full flex flex-row justify-center rounded-3xl my-2"
                            onPress={() =>
                                navigation.navigate("MessageScreen")
                            }>
                            <Text tw="font-Gsb text-[20px] text-blue mt-1">
                                Demander la réinitialisation du mot de passe
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => handleUpdateUser()}
                        tw="bg-blue rounded-2xl mt-4  w-full h-16 flex flex-col justify-center">
                        {!loading ? (
                            <Text tw="text-center text-white font-Gsb text-lg">
                                Valider les changements
                            </Text>
                        ) : (
                            <ActivityIndicator color="white" />
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        tw="w-full flex flex-row justify-center rounded-3xl py-6"
                        onPress={() => onLogout()}>
                        <Text tw="font-Gsb text-[20px] text-blue">
                            Déconnexion
                        </Text>
                    </TouchableOpacity>
                </View>
            </Layout>
        </>
    );
}
