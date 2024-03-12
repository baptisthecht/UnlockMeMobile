import { createContext, useContext, useState } from "react";

interface DesignProps {
    theme?: "light" | "dark";
    primaryColor?: string;
    secondaryColor?: string;
    textColor?: string;
    invertedTextColor?: string;
    secondaryTextColor?: string;
    bgColor?: string;
    statusBar?: "light-content" | "dark-content";
    h1?: number;
    h2?: number;
    h3?: number;
    h4?: number;
    onSwitchTheme?: () => void;
    cardColor?: string;
}

const DesignContext = createContext<DesignProps>({});

export const useDesign = () => {
    return useContext(DesignContext);
};

export const DesignProvider = ({ children }: any) => {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [primaryColor, setPrimaryColor] = useState<string>("#4318FF");
    const [secondaryColor, setSecondaryColor] = useState<string>("#6D50EE");
    const [cardColor, setCardColor] = useState<string>("#ffffff");
    const [textColor, setTextColor] = useState<string>("#2B3674");
    const [invertedTextColor, setInvertedTextColor] =
        useState<string>("#242424");
    const [secondaryTextColor, setSecondaryTextColor] =
        useState<string>("#A3AED0");
    const [bgColor, setBgColor] = useState<string>("#F4F7FE");
    const [statusBar, setStatusBar] = useState<
        "light-content" | "dark-content"
    >("dark-content");

    const onSwitchTheme = () => {
        if (theme === "light") {
            setCardColor("#111C44");
            setTheme("dark");
            setSecondaryColor("#374151");
            setTextColor("#2B3674");
            setInvertedTextColor("#242424");
            setSecondaryTextColor("#8F9BBA");
            setBgColor("#0B1437");
            setStatusBar("light-content");
        } else {
            setCardColor("#ffffff");
            setTheme("light");
            setSecondaryColor("#e5e7eb");
            setTextColor("#2B3674");
            setInvertedTextColor("#ffffff");
            setSecondaryTextColor("#8F9BBA");
            setBgColor("#F4F7FE");
            setStatusBar("dark-content");
        }
    };

    const values = {
        theme,
        primaryColor,
        secondaryColor,
        textColor,
        bgColor,
        onSwitchTheme,
        statusBar,
        secondaryTextColor,
        h1: 40,
        h2: 30,
        h3: 22,
        h4: 18,
        invertedTextColor,
        cardColor,
    };

    return (
        <DesignContext.Provider value={values}>
            {children}
        </DesignContext.Provider>
    );
};
