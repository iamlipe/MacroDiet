import React from 'react';
import { StyledDividerLine } from './styles';
import { ViewProps } from 'react-native';

interface IDivider extends ViewProps {}

const Divider: React.FC<IDivider> = ({ ...rest }) => {
  return <StyledDividerLine {...rest} />;
};

export default Divider;
