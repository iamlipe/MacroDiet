import { Container } from '@components/Container';
import { Label } from '@components/Label';
import { useSync } from '@hooks/useSync';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';

export const Sync = () => {
  const { effects, colors, fonts } = useTheme();
  useSync();

  return (
    <Container
      flex={1}
      justifyContent="center"
      alignItems="center"
      backgroundColor={colors.primary[600]}>
      <ActivityIndicator color={colors.gray.white} size="large" />
      <Label
        fontFamily={fonts.family.medium}
        fontSize={fonts.size.s2}
        marginTop={effects.spacing.sm}>
        Carregando...
      </Label>
    </Container>
  );
};
