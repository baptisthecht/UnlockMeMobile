import { createContext, useContext, useEffect, useState } from "react";
import { Asset } from "expo-asset";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export type Photo = {
    id: number;
    name: string;
    url: string;
    price: number;
    priceForSeller: number;
    shareLink: string;
    sales: [];
    salesCount: number;
};

export type Sale = {
    id: number;
    createdAt: string;
    price: number;
    priceForSeller: number;
    photo: Photo;
    buyerEmail: string;
    buyerName: string;
    status: string;
};

interface AuthProps {
    authState?: {
        token: string | null;
        authenticated: boolean | null;
        user: {
            id: number;
            profilePictureUrl: string;
            coverPictureUrl: string;
            email: string;
            displayName: string;
            bio: string | undefined;
            createdAt: string;
            updatedAt: string;
            balance: number;
            email_verified: boolean;
            photosCount: number;
            salesCount: number;
            withdrawals: [];
            photos: Photo[];
            sales: Sale[];
        };
    };
    onRegister?: (
        displayName: string,
        email: string,
        password: string
    ) => Promise<any>;
    onLogin?: (email: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>;
    lastMailUsed?: string;
    loginPending?: boolean;
    onRefreshData?: () => Promise<any>;
    onUpdateUserData?: (
        displayName: string,
        bio: string,
        email: string
    ) => Promise<any>;
    onWithdrawalRequest?: (amount: number, rib: string) => number | any;
    uploadPhoto?: (file: any, name: string, price: string) => Promise<any>;
    deletePhoto?: (id: number) => Promise<any>;
}

const TOKEN_KEY = "JWT_TOKEN";
const USER_KEY = "USER_KEY";
export const API_URL = "https://unlock-me-api.vercel.app";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null;

        user: {
            id: number;
            email: string;
            profilePictureUrl: string;
            coverPictureUrl: string;
            displayName: string;
            bio: string | undefined;
            createdAt: string;
            updatedAt: string;
            balance: number;
            email_verified: boolean;
            photosCount: number;
            salesCount: number;
            withdrawals: [];
            photos: Photo[];
            sales: Sale[];
        };
    }>({
        token: null,
        authenticated: null,
        user: {
            id: -1,
            email: "",
            profilePictureUrl: "",
            coverPictureUrl: "",
            displayName: "",
            bio: "",
            createdAt: "",
            updatedAt: "",
            balance: -1,
            email_verified: false,
            photosCount: -1,
            salesCount: -1,
            withdrawals: [],
            photos: [],
            sales: [],
        },
    });

    const [lastMailUsed, setLastMailUsed] = useState<string>("");
    const [loginPending, setLoginPending] = useState<boolean>(false);

    useEffect(() => {
        loadToken();
    }, []);

    async function loadAssets() {
        try {
            const imageUrls = [
                authState.user.profilePictureUrl,
                authState.user.coverPictureUrl,
            ];
            authState.user.photos.map((p) => imageUrls.push(p.url));
            const imageAssets = imageUrls.map((url) =>
                Asset.fromURI(url).downloadAsync()
            );
            await Promise.all(imageAssets);
        } catch (error) {
            console.log(error);
        }
    }

    const loadToken = async () => {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);
        const user = await SecureStore.getItemAsync(USER_KEY);
        if (token && user) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            setAuthState({
                token,
                authenticated: true,
                user: JSON.parse(user),
            });
        } else {
            setAuthState({
                token: null,
                authenticated: false,
                user: {
                    id: -1,
                    email: "",
                    displayName: "",
                    profilePictureUrl: "",
                    coverPictureUrl: "",
                    bio: "",
                    createdAt: "",
                    updatedAt: "",
                    balance: -1,
                    email_verified: false,
                    photosCount: -1,
                    salesCount: -1,
                    withdrawals: [],
                    photos: [],
                    sales: [],
                },
            });
        }
        await loadAssets();
    };

    const register = async (
        displayName: string,
        email: string,
        password: string
    ) => {
        try {
            setLoginPending(true);
            const reg = await axios.post(`${API_URL}/auth/register`, {
                displayName,
                email,
                password,
            });
            setLoginPending(false);
            return reg;
        } catch (e) {
            setLoginPending(false);
            console.log("register : " + e.message);
            return { error: true, msg: (e as any).response.data.msg };
        }
    };

    const login = async (email: string, password: string) => {
        try {
            setLoginPending(true);
            const result = await axios.post(`${API_URL}/auth/login`, {
                email,
                password,
            });
            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${result.data.token}`;
            await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
            await SecureStore.setItemAsync(
                USER_KEY,
                JSON.stringify(result.data.user)
            );
            setLastMailUsed(email);
            setAuthState({
                token: result.data.token,
                authenticated: true,
                user: result.data.user,
            });
            setLoginPending(false);
            await loadAssets();
            return result;
        } catch (e) {
            console.log("🚀 ~ login ~ e:", e);
            setLoginPending(false);
            return { error: true, msg: (e as any).response.data.msg };
        }
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        await SecureStore.deleteItemAsync(USER_KEY);
        axios.defaults.headers.common["Authorization"] = "";
        setAuthState({
            token: null,
            authenticated: false,
            user: {
                id: -1,
                email: "",
                displayName: "",
                profilePictureUrl: "",
                coverPictureUrl: "",
                bio: "",
                createdAt: "",
                updatedAt: "",
                balance: -1,
                email_verified: false,
                photosCount: -1,
                salesCount: -1,
                withdrawals: [],
                photos: [],
                sales: [],
            },
        });
    };

    const onRefreshData = async () => {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            try {
                const result = await axios.get(`${API_URL}/auth/refresh-data`);
                await SecureStore.setItemAsync(
                    USER_KEY,
                    JSON.stringify(result.data.user)
                );
                setAuthState({
                    token: token,
                    authenticated: true,
                    user: result.data.user,
                });
                await loadAssets();
                console.log(result.data.user);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const onUpdateUserData = async (
        displayName: string,
        bio: string,
        email: string
    ) => {
        try {
            const result = await axios.patch(`${API_URL}/auth/update-user`, {
                displayName,
                bio,
                email,
            });
            if (result.data.status == 200) {
                await loadAssets();
                return 200;
            } else {
                return 500;
            }
        } catch (e) {
            console.log("🚀 ~ onUpdateUserData ~ e", e);
            return { error: true, msg: (e as any).response.data.msg };
        }
    };

    const onWithdrawalRequest = async (amount: number, rib: string) => {
        try {
            const result = await axios.post(`${API_URL}/auth/withdrawal`, {
                amount,
                rib,
            });
            return result.data.status;
        } catch (e) {
            console.log("🚀 ~ onWithdrawalRequest ~ e", e);
            return { error: true, msg: (e as any).response.data.msg };
        }
    };

    const uploadPhoto = async (file: any, name: string, price: string) => {
        const file_data = {
            uri: file.uri,
            name: file.fileName,
            type: file.type,
        };
        const formData = new FormData();
        formData.append("file", file_data as any);
        formData.append("name", name);
        formData.append("price", price);
        try {
            const res = await fetch(
                "https://unlock-me-api.vercel.app/photo/upload",
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${authState.token}`,
                    },
                }
            );
            try {
                const result = await res.json();
                return result;
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deletePhoto = async (id: number) => {
        try {
            const result = await axios.delete(`${API_URL}/photo/delete`, {
                data: {
                    photoId: id,
                },
            });
            return result;
        } catch (e) {
            console.log("🚀 ~ deletePhoto ~ e", e);
            return { error: true, msg: (e as any).response.data.msg };
        }
    };

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState,
        lastMailUsed,
        loginPending,
        onRefreshData,
        onUpdateUserData,
        onWithdrawalRequest,
        uploadPhoto,
        deletePhoto,
    };
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
