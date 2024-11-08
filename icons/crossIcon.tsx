import * as React from "react";
import Svg, { SvgProps, Circle, Path } from "react-native-svg";

const CrossIcon = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Circle cx={12} cy={12} r={12} fill="#fff" stroke="#E8E8E8" />
    <Path
      fill="#BDBDBD"
      d="M8.5 8.5a.75.75 0 0 1 1.06 0L12 10.94l2.44-2.44a.75.75 0 0 1 1.06 1.06L13.06 12l2.44 2.44a.75.75 0 0 1-1.06 1.06L12 13.06l-2.44 2.44a.75.75 0 0 1-1.06-1.06L10.94 12 8.5 9.56a.75.75 0 0 1 0-1.06Z"
    />
  </Svg>
);

export default CrossIcon;
