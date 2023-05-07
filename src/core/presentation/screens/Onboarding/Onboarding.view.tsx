import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavPropsAuth } from '@/core/presentation/routes/auth';
import { useWindowDimensions } from 'react-native';
import Button from '@/core/presentation/shared/Button';
import {
  StyledDescription,
  StyledImage,
  StyledLinearGradient,
  StyledScroll,
  StyledTitle,
} from './styles';

const OnboardingView: React.FC = () => {
  const { navigate: navigateAuth } = useNavigation<NavPropsAuth>();
  const { width, height } = useWindowDimensions();

  return (
    <StyledScroll>
      <StyledLinearGradient width={width} height={height} />

      <StyledImage
        width={width}
        height={height}
        resizeMode="contain"
        source={require('@/assets/images/health-meal.png')}
      />

      <StyledTitle>Macro Diet</StyledTitle>

      <StyledDescription>
        Acompanhe sua ingestão de proteínas, carboidratos e gorduras com nosso
        aplicativo.
        {'\n'}
        {'\n'}
        Monitore seu progresso e alcance seus objetivos de saúde e bem-estar.
      </StyledDescription>

      <Button
        title="Login ou cadastro"
        icon={{ name: 'long-right' }}
        onPress={() => navigateAuth('Login')}
      />
    </StyledScroll>
  );
};

export default OnboardingView;
