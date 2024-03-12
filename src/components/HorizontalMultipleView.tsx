import React, { useEffect, useRef } from "react";
import { ScrollView, Dimensions } from "react-native";

const HorizontalMultipleView = ({ children, step = 1 }) => {
	const { width } = Dimensions.get("window");
	const w = width - 40;
	const scrollViewRef = useRef(null);

	useEffect(() => {
		scrollViewRef.current?.scrollTo({ x: step * w, animated: true });
	}, [step]);

	return (
		<ScrollView
			ref={scrollViewRef}
			horizontal
			pagingEnabled
			showsHorizontalScrollIndicator={false}
			style={{
				display: "flex",
				flexDirection: "row",
			}}
			scrollEnabled={false}
			// contentContainerStyle={{ flexGrow: 1 }}
		>
			{children}
		</ScrollView>
	);
};

export default HorizontalMultipleView;
