import React from 'react';
import moment from 'moment';
import { useMenu } from '@/core/infrastructure/hooks/useMenu';
import { useTheme } from 'styled-components/native';
import { useLogin } from '@/core/infrastructure/hooks/useLogin';
import { View } from 'react-native';
// import {
//   BannerAd,
//   BannerAdSize,
//   TestIds,
// } from 'react-native-google-mobile-ads';
import {
  StyledScroll,
  StyledCardOption,
  StyledContainerDietUp,
  StyledCircle,
  StyledLabelExplainDietUp,
  StyledContainerOverviewDietUp,
  StyledDayWeek,
  StyledContainerMenuOptions,
  // StyledContainerBannerAD,
} from './styles';
import Link from '@/core/presentation/shared/Link';
import Icon from '@/core/presentation/shared/Icon';

const MenuView = () => {
  const { menuOptions, handlePressMenuOption } = useMenu();
  const { logout } = useLogin();
  const { colors, fonts } = useTheme();

  return (
    <StyledScroll>
      <StyledContainerDietUp>
        <StyledContainerOverviewDietUp>
          {new Array(7).fill(0).map((_, index) => {
            const date = new Date();
            date.setDate(date.getDay() - (6 + index) * -1);

            return (
              <View key={index} style={{ alignItems: 'center' }}>
                <StyledDayWeek>{moment(date).format('ddd')}</StyledDayWeek>

                <StyledCircle isDiscoloring={index === 0 || index === 6}>
                  {index < 4 && (
                    <Icon name="check" color={colors.primary[400]} size={24} />
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

      {/* <StyledContainerBannerAD>
        <BannerAd
          unitId={TestIds.BANNER}
          size={BannerAdSize.LARGE_BANNER}
          requestOptions={{ requestNonPersonalizedAdsOnly: true }}
        />
      </StyledContainerBannerAD> */}

      <StyledContainerMenuOptions>
        {menuOptions
          .filter(item => item.show)
          .map(option => (
            <StyledCardOption
              key={option.key}
              title={option.name}
              subtitle={option.description}
              type="bottomLine"
              iconLeft={{ name: option.iconName }}
              icon={{ name: 'right' }}
              onPress={() => handlePressMenuOption(option)}
            />
          ))}
      </StyledContainerMenuOptions>

      <Link
        title="Sair"
        size={fonts.size.s2}
        icon={{ name: 'logout', position: 'right' }}
        onPress={logout}
      />
    </StyledScroll>
  );
};

export default MenuView;
