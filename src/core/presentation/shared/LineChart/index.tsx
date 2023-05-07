import React from 'react';
import { firstLetterUppercase } from '@/utils/helpers/help';
import { useTheme } from 'styled-components/native';
import { View, ViewStyle, useWindowDimensions } from 'react-native';
import {
  Svg,
  Line,
  Circle,
  Text,
  LineProps,
  CircleProps,
  TextProps,
} from 'react-native-svg';
import Icon from '@/core/presentation/shared/Icon';
import {
  StyledContainer,
  StyledContainerEmptyChart,
  StyledContainerGrid,
  StyledLabel,
  StyledLabelChartBar,
  StyledLabelEmptyChart,
  StyledLabelOrigin,
} from './styles';

interface LineChartProps {
  title: string;
  data: { title: string; value: number }[];
  wrapperStyle?: ViewStyle;
}

const LineChart: React.FC<LineChartProps> = ({
  title,
  data,
  wrapperStyle = {},
}) => {
  const { colors, fonts } = useTheme();
  const { width } = useWindowDimensions();

  const calculatePositionY = (y: number) => {
    const maxValue = Math.max(...data.map(item => item.value));
    const minValue = Math.min(...data.map(item => item.value));

    return ((208 - 32) / (maxValue - minValue)) * (maxValue - y) + 32;
  };

  const calculatePositionX = (x: number) => {
    return ((width - 144) / (data.length - 1)) * x + 32;
  };

  const renderLineChart = ({ x1, x2, y1, y2 }: LineProps) => (
    <Line
      y1={y1}
      x1={x1}
      y2={y2}
      x2={x2}
      strokeWidth={2}
      stroke={colors.primary[500]}
    />
  );

  const renderCircleChart = ({ x, y }: CircleProps) => (
    <Circle
      y={y}
      x={x}
      r="6"
      fill={colors.primary[500]}
      stroke={colors.white}
      strokeWidth={2}
    />
  );

  const renderValueItemChart = ({ x, y, children }: TextProps) => (
    <Text
      x={x}
      y={y}
      fill={colors.gray[400]}
      fontFamily={fonts.family.regular}
      fontSize={fonts.size.sm}>
      {children}
    </Text>
  );

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

      <StyledContainer width={width}>
        <Svg>
          {data.map((item, index, array) => {
            if (!array[index + 1]) {
              return null;
            }

            const y1 = calculatePositionY(item.value);
            const y2 = calculatePositionY(array[index + 1].value);
            const x1 = calculatePositionX(index);
            const x2 = calculatePositionX(index + 1);

            return (
              <React.Fragment key={index}>
                {index === 0
                  ? renderValueItemChart({
                      x: x1 + 12,
                      y: y1 - 12,
                      children: item.value,
                    })
                  : null}
                {renderValueItemChart({
                  x: x2 - 20,
                  y: y1 > y2 ? y2 - 12 : y2 + 20,
                  children: array[index + 1].value,
                })}
                {renderLineChart({ y1, x1, y2, x2 })}
                {index === 0 ? renderCircleChart({ x: x1, y: y1 }) : null}
                {renderCircleChart({ x: x2, y: y2 })}
              </React.Fragment>
            );
          })}
        </Svg>

        <StyledContainerGrid width={width}>
          {data.map((item, index) => {
            const date = new Date();

            date.setDate(date.getDay() - index + 1);

            return (
              <StyledLabelChartBar key={index}>
                {item.title}
              </StyledLabelChartBar>
            );
          })}

          <StyledLabelOrigin bottom={-16} left={-28}>
            0
          </StyledLabelOrigin>
        </StyledContainerGrid>
      </StyledContainer>
    </View>
  );
};

export default LineChart;
