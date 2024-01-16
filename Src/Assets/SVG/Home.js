import {useTheme} from '@react-navigation/native';
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={28}
      height={30}
      viewBox="0 0 28 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M9.778 28.16v-4.587c0-1.17.939-2.12 2.098-2.12h4.235c.557 0 1.09.224 1.484.621.393.398.614.937.614 1.5v4.586c-.003.487.186.955.525 1.3.34.346.801.54 1.283.54h2.89a5.054 5.054 0 003.6-1.499A5.16 5.16 0 0028 24.867V11.8a3.736 3.736 0 00-1.32-2.853l-9.83-7.933a4.503 4.503 0 00-5.819.106L1.425 8.947A3.733 3.733 0 000 11.8v13.053C0 27.696 2.28 30 5.093 30h2.824c1 0 1.814-.816 1.82-1.827l.04-.013z"
        fill={props?.color ? props?.color : '#2C2C2C'}
      />
    </Svg>
  );
}

export default SvgComponent;
