import React from 'react';
import { Background } from '@components/Backgroud';
import { Card } from '@components/Card';
import { Container } from '@components/Container';
import { Header } from '@components/Header';
import { Scroll } from '@components/Scroll';
import { useMenu } from '@hooks/useMenu';
import { useNavigation } from '@react-navigation/native';
import { NavPropsLogged } from '@routes/logged';
import { useTheme } from 'styled-components/native';

export const MenuProfile = () => {
  const { menuOptions } = useMenu();
  const { effects, colors } = useTheme();
  const { navigate: navigateProfile } = useNavigation<NavPropsLogged>();

  return (
    <Background>
      <Header title="Perfil" />

      <Scroll>
        <Container
          width={100}
          height={100}
          borderRadius={50}
          alignSelf="center"
          backgroundColor={colors.primary[500]}
          marginBottom={effects.spacing.hg}
        />

        {menuOptions.map(option => (
          <Card
            key={option.key}
            title={option.name}
            icon={{ name: 'right' }}
            onPress={() => navigateProfile(option.navigateTo)}
            marginBottom={effects.spacing.md}
          />
        ))}
      </Scroll>
    </Background>
  );
};
