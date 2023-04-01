import React from 'react';
import {
  Background,
  Header,
  Scroll,
  Label,
  Container,
  Button,
} from '@components/index';
import { useNavigation } from '@react-navigation/native';
import { NavPropsProfile } from '@routes/profileStack';
import { useTheme } from 'styled-components/native';

export const GoalResult = () => {
  const { effects, fonts } = useTheme();
  const { goBack, navigate } = useNavigation<NavPropsProfile>();

  return (
    <Background>
      <Header
        left={{ iconName: 'arrow-left', press: goBack }}
        title="Resultado"
      />

      <Scroll>
        <Label
          fontFamily={fonts.family.medium}
          fontSize={fonts.size.s1}
          marginBottom={effects.spacing.lg}>
          Title
        </Label>

        <Label fontSize={fonts.size.lg} marginBottom={effects.spacing.lg}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s
        </Label>

        <Label fontSize={fonts.size.lg} marginBottom={effects.spacing.lg}>
          {'kcal 2000kcal'}
          {'\n\n'}
          {'prot 300g'}
          {'\n\n'}
          {'carb 400g'}
          {'\n\n'}
          {'fat 70g'}
          {'\n\n'}
          {'sodium 5g'}
          {'\n\n'}
          {'fiber 10g'}
        </Label>

        <Label fontSize={fonts.size.lg} marginBottom={effects.spacing.lg}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s
        </Label>

        <Container flex={1} justifyContent="flex-end">
          <Button title="Continuar" onPress={() => navigate('MenuProfile')} />
        </Container>
      </Scroll>
    </Background>
  );
};
