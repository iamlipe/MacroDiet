import React from 'react';
import moment from 'moment';
import { firstLetterUppercase } from '@/utils/helpers/help';
import { useTheme } from 'styled-components/native';
import { View, ViewStyle, useWindowDimensions } from 'react-native';
import DiagonalPartter from '../DiagonalPattern';
import {
  StyledChartBar,
  StyledContainer,
  StyledContainerChart,
  StyledContainerEmptyChart,
  StyledContainerGrid,
  StyledDashedLine,
  StyledLabel,
  StyledLabelChartBar,
  StyledLabelEmptyChart,
  StyledLabelGoal,
  StyledLabelOrigin,
} from './styles';
import Icon from '../Icon';

interface BarChartProps {
  title: string;
  data: (number | undefined)[];
  wrapperStyle?: ViewStyle;
  goal?: number;
}

const BarChart: React.FC<BarChartProps> = ({
  title,
  data,
  goal = 0,
  wrapperStyle = {},
}) => {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();

  const maxDataValue = Math.max(...(data.filter(item => item) as number[]));

  const maxValue = maxDataValue > goal * 1.2 ? maxDataValue : goal * 1.2;

  if (!data.length) {
    return (
      <View style={wrapperStyle}>
        <StyledLabel>{firstLetterUppercase(title)}</StyledLabel>

        <StyledContainerEmptyChart width={width}>
          <Icon name="chart" color={colors.white} size={32} />
          <StyledLabelEmptyChart>Dados indisponíveis</StyledLabelEmptyChart>
        </StyledContainerEmptyChart>
      </View>
    );
  }

  return (
    <View style={wrapperStyle}>
      <StyledLabel>{firstLetterUppercase(title)}</StyledLabel>

      <StyledContainer>
        <StyledContainerChart width={width}>
          <StyledLabelOrigin bottom={-12} left={-12}>
            0
          </StyledLabelOrigin>

          {goal ? (
            <>
              <StyledLabelGoal
                bottom={(goal * 0.9 * 100) / maxValue}
                left={-32}>
                {goal.toFixed(0)}
                {'\n'}
                kcal
              </StyledLabelGoal>

              <StyledDashedLine
                bottom={(goal * 0.9 * 100) / maxValue}
                height={(goal * 0.2 * 100) / maxValue}>
                <DiagonalPartter fill={colors.primary[200]} />
              </StyledDashedLine>
            </>
          ) : null}

          {data.slice(0, 7).map((item = 0, index) => {
            const isGoal = item >= goal * 0.9 && item <= goal * 1.1;

            return (
              <StyledChartBar
                key={index}
                isGoal={isGoal}
                height={(item * 100) / maxValue}
              />
            );
          })}
        </StyledContainerChart>

        <StyledContainerGrid width={width}>
          {new Array(7).fill(0).map((_, index) => {
            const date = new Date();

            date.setDate(date.getDate() + index + 1);

            return (
              <StyledLabelChartBar key={index}>
                {moment(date).format('ddd')}
              </StyledLabelChartBar>
            );
          })}
        </StyledContainerGrid>
      </StyledContainer>
    </View>
  );
};

export default BarChart;
