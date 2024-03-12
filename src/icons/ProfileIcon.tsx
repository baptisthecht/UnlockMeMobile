import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
const SvgComponent = (props: SvgProps) => (
	<Svg width={24} height={24} fill="none" {...props}>
		<G clipPath="url(#a)">
			<Path
				fill="#A3AED0"
				d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm0 2c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4Z"
			/>
		</G>
		<Defs>
			<ClipPath id="a">
				<Path fill="#fff" d="M0 0h50v50H0z" />
			</ClipPath>
		</Defs>
	</Svg>
);
export default SvgComponent;
