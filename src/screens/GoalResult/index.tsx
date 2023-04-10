import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavPropsProfile } from '@routes/profileStack';
import { Background, Header, Button } from '@components/index';
import {
  StyledScroll,
  StyledWrapperButtonSubmit,
  StyledTitle,
  StyledLabel,
} from './styles';

const GoalResult = () => {
  const { goBack, navigate } = useNavigation<NavPropsProfile>();

  return (
    <Background>
      <Header
        left={{ iconName: 'arrow-left', press: goBack }}
        title="Resultado"
      />

      <StyledScroll>
        <StyledTitle>Title</StyledTitle>

        <StyledLabel>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s
        </StyledLabel>

        <StyledLabel>
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
        </StyledLabel>

        <StyledLabel>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s
        </StyledLabel>

        <StyledWrapperButtonSubmit>
          <Button title="Continuar" onPress={() => navigate('MenuProfile')} />
        </StyledWrapperButtonSubmit>
      </StyledScroll>
    </Background>
  );
};

export default GoalResult;
