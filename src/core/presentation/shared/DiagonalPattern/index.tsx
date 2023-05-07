import React from 'react';
import { Defs, G, Path, Pattern, Rect, Svg } from 'react-native-svg';

interface DiagonalPartterProps {
  fill?: string;
}

const DiagonalPartter: React.FC<DiagonalPartterProps> = ({ fill }) => {
  return (
    <Svg width="100%" height="100%">
      <Defs>
        <Pattern
          id="my-pattern"
          width="6"
          height="6"
          patternUnits="userSpaceOnUse">
          <G fill={fill || '#000'} fillRule="evenodd">
            <Path d="M5 0h1L0 6V5zM6 5v1H5z" />
          </G>
        </Pattern>
      </Defs>
      <Rect width="100%" height="100%" fill="url(#my-pattern)" />
    </Svg>
  );
};

export default DiagonalPartter;
