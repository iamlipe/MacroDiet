import React from 'react';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { useTheme } from 'styled-components/native';
import { SafeAreaView } from 'react-native';
import { CreateUserStackParamsList } from '@/core/presentation/routes/createUser';
import Icon from '@/core/presentation/shared/Icon';
import ProgressBar from '@/core/presentation/shared/ProgressBar';
import {
  StyledContainer,
  StyledBaseButton,
  StyledWrapperProgressbar,
  StyledLogo,
} from './styles';

const goBack: { [key: string]: keyof CreateUserStackParamsList } = {
  GenderCreateUser: 'IntroductionCreateUser',
  BirthDateCreateUser: 'GenderCreateUser',
  ActivityCreateUser: 'BirthDateCreateUser',
  HeightCreateUser: 'ActivityCreateUser',
  WeightCreateUser: 'HeightCreateUser',
  TimeCreateUser: 'WeightCreateUser',
  ConclusionCreateUser: 'TimeCreateUser',
};

const TabBarCreateUser: React.FC<MaterialTopTabBarProps> = ({
  state,
  navigation,
}) => {
  const { colors } = useTheme();

  const routeName = state.routeNames[state.index];

  return (
    <SafeAreaView>
      <StyledContainer>
        <StyledBaseButton
          disabled={!state.index}
          onPress={() => navigation.navigate(goBack[routeName])}>
          {state.index ? (
            <Icon name="arrow-left" size={24} color={colors.white} />
          ) : null}
        </StyledBaseButton>

        <StyledWrapperProgressbar>
          <StyledLogo name="logo" color={colors.primary[500]} size={28} />
          <ProgressBar percentage={(state.index + 1) / state.routes.length} />
        </StyledWrapperProgressbar>

        <StyledBaseButton disabled activeOpacity={0} />
      </StyledContainer>
    </SafeAreaView>
  );
};

export default TabBarCreateUser;
