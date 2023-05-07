import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTheme } from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWaterStore } from '@/core/infrastructure/store/waterStore';
import { useWindowDimensions } from 'react-native';
import { useWater } from '@/core/infrastructure/hooks/useWater';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Circle, Path, Svg } from 'react-native-svg';
import Animated, {
  withTiming,
  withRepeat,
  Easing,
  useAnimatedProps,
  interpolate,
  useSharedValue,
} from 'react-native-reanimated';
import {
  StyledButtonAddWater,
  StyledIconDroplet,
  StyledFotter,
  StyledContainerInfo,
  StyledTitle,
  StyledDescription,
  StyledWrapperCups,
  StyledCupIconContainer,
  StyledPercentage,
  StyledSelectedCup,
  StyledLinkChangeCup,
  StyledRow,
  StyledAnimatedNumbersPercentage,
  StyledLabelCardSelectCup,
  StyledContainerBottomSheetSelectSizeCup,
  StyledCardSelectCup,
} from './styles';
import Icon from '@/core/presentation/shared/Icon';
import BottomSheet from '@/core/presentation/shared/BottomSheet';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const DrinkWaterView: React.FC = () => {
  const [cupQuantity, setCupQuantity] = useState(200);
  const { waterDay } = useWaterStore();
  const { colors, fonts } = useTheme();
  const { width, height } = useWindowDimensions();
  const { addWaterDay } = useWater();

  const [water, setWater] = useState(waterDay?.quantity || 0);

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const insets = useSafeAreaInsets();

  const heightAnimated = useSharedValue(0.2);
  const waveAnimated = useSharedValue(5);
  const buttonBorderAnimated = useSharedValue(0);

  useEffect(() => {
    addWaterDay(water);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [water]);

  useEffect(() => {
    const heightWater = (water * height) / (waterDay?.goal || 0);

    heightAnimated.value = withTiming(heightWater * 2, {
      duration: 1000,
      easing: Easing.ease,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [water, waterDay?.goal]);

  const percentageWater = useMemo(
    () => ((waterDay?.quantity || 0) / (waterDay?.goal || 0)) * 100,
    [waterDay?.goal, waterDay?.quantity],
  );

  const buttonProps = useAnimatedProps(() => {
    return {
      strokeWidth: interpolate(
        buttonBorderAnimated.value,
        [0, 0.5, 1],
        [16, 40, 16],
      ),
    };
  });

  const firstWaveProps = useAnimatedProps(() => {
    return {
      d: `
      M 0 0
      Q 45 ${waveAnimated.value} 90 0
      T 180 0
      T 270 0
      T 360 0
      T 900 0
      T 540 0
      V ${heightAnimated.value}
      H 0
      Z
    `,
    };
  });

  const secondWaveProps = useAnimatedProps(() => {
    return {
      d: `
      M 0 0
      Q 35 ${waveAnimated.value + 10} 70 0
      T 140 0
      T 210 0
      T 280 0
      T 350 0
      T 420 0
      V ${heightAnimated.value}
      H 0
      Z
    `,
    };
  });

  const svgWaveProps = useAnimatedProps(() => {
    return {
      height: heightAnimated.value,
      viewBox: `0 0 ${width} ${heightAnimated.value} `,
    };
  });

  const changeCup = (size: number) => {
    setCupQuantity(size);
    bottomSheetRef.current?.close();
  };

  const handleDrink = () => {
    setWater(water + cupQuantity);

    buttonBorderAnimated.value = 0;
    waveAnimated.value = 5;

    buttonBorderAnimated.value = withTiming(1, {
      duration: 500,
      easing: Easing.ease,
    });

    waveAnimated.value = withRepeat(
      withTiming(16, { duration: 500, easing: Easing.ease }),
      2,
      true,
    );
  };

  return (
    <React.Fragment>
      <StyledContainerInfo>
        <StyledTitle>{`${waterDay?.goal} ml`}</StyledTitle>
        <StyledDescription>
          Ingerir água diariamente é fundamental para o bom funcionamento do
          nosso corpo.
        </StyledDescription>

        <StyledWrapperCups>
          {new Array(10).fill(undefined).map((_, index) => {
            const isFilled = percentageWater >= (index + 1) * 10;

            return (
              <StyledCupIconContainer key={index}>
                <Icon
                  name={isFilled ? 'cup-filled' : 'cup'}
                  color={isFilled ? colors.primary[600] : colors.white}
                  size={24}
                />
              </StyledCupIconContainer>
            );
          })}
        </StyledWrapperCups>

        <React.Fragment>
          <StyledSelectedCup>{`tamanho do copo ${cupQuantity}ml`}</StyledSelectedCup>

          <StyledLinkChangeCup
            title="Trocar"
            position="center"
            onPress={() => bottomSheetRef.current?.present()}
          />
        </React.Fragment>

        <StyledRow>
          <StyledAnimatedNumbersPercentage
            animationDuration={1000}
            animateToNumber={(percentageWater >= 100
              ? 100
              : percentageWater
            ).toFixed(0)}
          />
          <StyledPercentage>{'%'}</StyledPercentage>
        </StyledRow>
      </StyledContainerInfo>

      <StyledFotter insets={insets}>
        <StyledButtonAddWater onPress={() => handleDrink()}>
          <Svg width={120} height={120}>
            <AnimatedCircle
              cx={60}
              cy={60}
              r={40}
              fill={colors.primary[600]}
              stroke={colors.primary[300]}
              strokeOpacity={0.4}
              animatedProps={buttonProps}
            />
          </Svg>

          <StyledIconDroplet
            name="droplet"
            size={fonts.size.tl}
            color={colors.primary[300]}
          />
        </StyledButtonAddWater>
      </StyledFotter>

      <AnimatedSvg animatedProps={svgWaveProps} width={width}>
        <AnimatedPath
          animatedProps={firstWaveProps}
          fill={colors.primary[400]}
          transform={'translate(0, 4)'}
        />

        <AnimatedPath
          animatedProps={secondWaveProps}
          fill={colors.primary[500]}
          transform={'translate(0, 16)'}
        />
      </AnimatedSvg>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[220]}
        close={() => bottomSheetRef.current?.close()}>
        <StyledContainerBottomSheetSelectSizeCup>
          <StyledCardSelectCup onPress={() => changeCup(200)}>
            <Icon name="cup" color={colors.white} size={40} />
            <StyledLabelCardSelectCup>200ml</StyledLabelCardSelectCup>
          </StyledCardSelectCup>

          <StyledCardSelectCup onPress={() => changeCup(500)}>
            <Icon name="cup" color={colors.white} size={40} />
            <StyledLabelCardSelectCup>500ml</StyledLabelCardSelectCup>
          </StyledCardSelectCup>

          <StyledCardSelectCup onPress={() => changeCup(1000)}>
            <Icon name="cup" color={colors.white} size={40} />
            <StyledLabelCardSelectCup>1000ml</StyledLabelCardSelectCup>
          </StyledCardSelectCup>
        </StyledContainerBottomSheetSelectSizeCup>
      </BottomSheet>
    </React.Fragment>
  );
};

export default DrinkWaterView;
