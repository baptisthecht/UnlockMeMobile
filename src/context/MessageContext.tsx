import { useContext, createContext, useState } from "react";
import * as Haptic from "expo-haptics";

interface MessageProps {
    message: {
        type: "success" | "error" | "info" | "warning";
        message: string;
    };
    setMessage?: (message: MessageProps["message"]) => void;
}

const MessageContext = createContext<MessageProps>({
    message: {
        type: "success",
        message: "",
    },
});

export const useMessage = () => {
    return useContext(MessageContext);
};

export const MessageProvider = ({ children }) => {
    const [message, setMessageState] = useState<MessageProps["message"]>({
        type: "success",
        message: "",
    });

    const setMessage = (message: MessageProps["message"]) => {
        setMessageState(message);
        Haptic.notificationAsync(Haptic.NotificationFeedbackType.Success);
    };

    const values = {
        message,
        setMessage,
    };
    return (
        <MessageContext.Provider value={values}>
            {children}
        </MessageContext.Provider>
    );
};
