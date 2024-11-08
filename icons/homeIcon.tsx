import * as React from "react";
import Svg, { Path } from "react-native-svg";

const HomeIcon = ({ fill = "#212121", ...props }) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path fill="none" d="M0 0h24v24H0z" />
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.8}
      d="M3 3h7v7H3V3ZM14 3h7v7h-7V3ZM14 14h7v7h-7v-7ZM3 14h7v7H3v-7Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default HomeIcon;
