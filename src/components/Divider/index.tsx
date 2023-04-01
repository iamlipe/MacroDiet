import React from 'react';

import { DividerLine } from './styles';

interface DividerProps {
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

export const Divider: React.FC<DividerProps> = ({ ...rest }) => {
  return <DividerLine {...rest} />;
};
