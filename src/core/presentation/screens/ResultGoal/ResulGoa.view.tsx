import React from 'react';
import { NavPropsProfile } from '@/core/presentation/routes/profile';
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '@/core/infrastructure/store/userStore';
import Button from '@/core/presentation/shared/Button';
import {
  StyledScroll,
  StyledWrapperButtonSubmit,
  StyledTitle,
  StyledLabel,
} from './styles';

const ResultGoalView = () => {
  const { navigate } = useNavigation<NavPropsProfile>();
  const { user } = useUserStore();

  return (
    <StyledScroll>
      <StyledTitle>Resumo Nutricional</StyledTitle>

      <StyledLabel>
        Seu resumo nutricional está disponível abaixo, incluindo as calorias,
        proteínas, carboidratos, gorduras, sódio e fibras que você consumiu
        hoje.
      </StyledLabel>

      <StyledLabel>
        {`Calorias: ${user?.nutritionalInfo?.kcal.toFixed(0)}kcal`}
        {'\n\n'}
        {`Proteínas: ${user?.nutritionalInfo?.prot.toFixed(0)}g`}
        {'\n\n'}
        {`Carboidratos: ${user?.nutritionalInfo?.carb.toFixed(0)}g`}
        {'\n\n'}
        {`Gorduras: ${user?.nutritionalInfo?.fat.toFixed(0)}g`}
        {'\n\n'}
        {`Sódio: ${((user?.nutritionalInfo?.sodium || 0) * 1000).toFixed(0)}mg`}
        {'\n\n'}
        {`Fibras: ${user?.nutritionalInfo?.fiber}g`}
      </StyledLabel>

      <StyledLabel>
        É importante manter uma dieta equilibrada e saudável para alcançar seus
        objetivos de saúde e fitness. Você pode encontrar mais informações sobre
        nutrição em nosso blog.
      </StyledLabel>

      <StyledWrapperButtonSubmit>
        <Button title="Continuar" onPress={() => navigate('MenuProfile')} />
      </StyledWrapperButtonSubmit>
    </StyledScroll>
  );
};

export default ResultGoalView;
