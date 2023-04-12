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

import useUserStore from '@stores/user';

const ResultGoal = () => {
  const { navigate } = useNavigation<NavPropsProfile>();
  const { user } = useUserStore();

  return (
    <Background>
      <Header title="Resultado" />

      <StyledScroll>
        <StyledTitle>Title</StyledTitle>

        <StyledLabel>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s
        </StyledLabel>

        <StyledLabel>
          {`kcal: ${user.nutritionalInfo.kcal.toFixed(0)}kcal`}
          {'\n\n'}
          {`proteina: ${user.nutritionalInfo.prot.toFixed(0)}g`}
          {'\n\n'}
          {`carboidrato ${user.nutritionalInfo.carb.toFixed(0)}g`}
          {'\n\n'}
          {`gordura: ${user.nutritionalInfo.fat.toFixed(0)}g`}
          {'\n\n'}
          {`sodio: ${(user.nutritionalInfo.sodium * 1000).toFixed(0)}mg`}
          {'\n\n'}
          {`fibra: ${user.nutritionalInfo.fiber}g`}
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

export default ResultGoal;
