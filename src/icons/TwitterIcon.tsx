import React from "react";
import Svg, { Path, G, Defs } from "react-native-svg";

const TwitterIcon = ({ size = 800, fillColor = "#1DA1F2" }) => (
	<Svg width={size} height={size} viewBox="0 0 24 24" fill={fillColor}>
		<G fill={fillColor}>
			<Path d="M24 4.535a9.933 9.933 0 0 1-2.828.775 4.937 4.937 0 0 0 2.16-2.716c-1.004.613-2.116 1.056-3.313 1.293A4.946 4.946 0 0 0 15.035 5c-2.75 0-4.977 2.227-4.977 4.977 0 .39.045.77.13 1.135a14.076 14.076 0 0 1-10.152-5.16 4.946 4.946 0 0 0 1.531 6.603 4.884 4.884 0 0 1-2.239-.613l-.001.061c0 2.165 1.545 3.976 3.589 4.39a4.979 4.979 0 0 1-2.234.084 4.944 4.944 0 0 0 4.616 3.422 9.932 9.932 0 0 1-6.151 2.122 14.062 14.062 0 0 0 7.553 2.213c9.168 0 14.173-7.585 14.173-14.172 0-.215-.005-.428-.014-.64A10.143 10.143 0 0 0 24 4.535z" />
		</G>
	</Svg>
);

export default TwitterIcon;
