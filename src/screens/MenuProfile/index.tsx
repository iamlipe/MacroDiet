import React from 'react';
import { NavPropsLogged } from '@routes/logged';
import { useNavigation } from '@react-navigation/native';
import { useLogin, useMenu } from '@hooks/index';
import { Background, Header, Icon, Link } from '@components/index';
import {
  StyledScroll,
  StyledCardOption,
  StyledContainerDietUp,
  StyledLogo,
  StyledCircle,
  StyledLabelExplainDietUp,
  StyledContainerOverviewDietUp,
  StyledScore,
  StyledContainerScore,
  StyledDayWeek,
  StyledContainerMenuOptions,
  StyledVersion,
} from './styles';
import { useTheme } from 'styled-components/native';
import { View } from 'react-native';
import moment from 'moment';

const MenuProfile = () => {
  const { menuOptions } = useMenu();
  // const { user } = useUserStore();
  const { logout } = useLogin();
  const { navigate: navigateProfile } = useNavigation<NavPropsLogged>();
  const { colors, fonts } = useTheme();

  return (
    <Background>
      <Header title="menu" />

      <StyledScroll>
        <StyledContainerDietUp>
          <View>
            <StyledLogo name="logo" size={80} color={colors.primary[500]} />
            <StyledContainerScore>
              <StyledScore>12</StyledScore>
            </StyledContainerScore>
          </View>

          <StyledContainerOverviewDietUp>
            {new Array(7).fill(0).map((_, index) => {
              const date = new Date();
              date.setDate(date.getDay() - (6 + index) * -1);

              return (
                <View style={{ alignItems: 'center' }}>
                  <StyledDayWeek>{moment(date).format('ddd')}</StyledDayWeek>

                  <StyledCircle isDiscoloring={index === 0 || index === 6}>
                    {index < 4 && (
                      <Icon
                        name="check"
                        color={colors.primary[400]}
                        size={fonts.size.lg}
                      />
                    )}
                  </StyledCircle>
                </View>
              );
            }, [])}
          </StyledContainerOverviewDietUp>

          <StyledLabelExplainDietUp>
            Lorem Ipsum is simply dummy text of the printing and typesetting.
          </StyledLabelExplainDietUp>
        </StyledContainerDietUp>

        <StyledContainerMenuOptions>
          {menuOptions.map(option => (
            <StyledCardOption
              key={option.key}
              title={option.name}
              type="bottomLine"
              iconLeft={{ name: option.iconName }}
              icon={{ name: 'right' }}
              onPress={() => navigateProfile(option.navigateTo)}
            />
          ))}
        </StyledContainerMenuOptions>

        <Link
          title="Sair"
          size={fonts.size.s2}
          icon={{ name: 'logout', position: 'right' }}
          onPress={logout}
        />

        <StyledVersion>versao 1.0.0</StyledVersion>
      </StyledScroll>
    </Background>
  );
};

export default MenuProfile;
