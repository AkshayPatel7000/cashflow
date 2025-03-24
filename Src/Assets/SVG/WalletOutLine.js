import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={21}
      height={20}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.642 0a6.004 6.004 0 015.997 5.998v7.177a6.004 6.004 0 01-5.997 5.998H5.998A6.005 6.005 0 010 13.175V5.998A6.005 6.005 0 015.998 0h8.644zm0 1.5H5.998A4.503 4.503 0 001.5 5.998v7.177a4.503 4.503 0 004.498 4.498h8.644a4.503 4.503 0 004.497-4.498v-.28H15.84a3.446 3.446 0 01-3.442-3.438 3.447 3.447 0 013.442-3.443l3.298-.001v-.015A4.503 4.503 0 0014.642 1.5zm4.497 6.013H15.84a1.945 1.945 0 00-1.942 1.943c0 1.069.872 1.94 1.942 1.94l3.298-.001V7.513zm-2.84 1.13a.75.75 0 010 1.5h-.313a.75.75 0 010-1.5h.313zm-5.614-4.105a.75.75 0 010 1.5h-5.4a.75.75 0 010-1.5h5.4z"
        fill="#979797"
      />
    </Svg>
  );
}

export default SvgComponent;
