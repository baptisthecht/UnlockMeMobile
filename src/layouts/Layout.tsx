import { StatusBar, StyleSheet, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDesign } from "../context/DesignContext";

const Layout = ({ children }) => {
    const { bgColor, statusBar } = useDesign();
    const styles = StyleSheet.create({
        Page: {
            height: "100%",
            width: "100%",
            padding: 20,
            backgroundColor: bgColor,
        },
    });
    return (
        <View style={styles.Page}>
            <StatusBar barStyle={statusBar} />
            {children}
        </View>
    );
};

export default Layout;
