import React, { useRef } from 'react';
import moment from 'moment';
import { enumerateDaysBetweenDates } from '@/utils/helpers/help';
import { FlatList } from 'react-native';
import {
  StyledContainerDate,
  StyledHorizontalFlatList,
  StyledLabelDate,
} from './styles';

interface HorizontalDateListProps {
  selectedDate: string;
  setSelectedDate: (resp: string) => void;
}

const HorizontalDateList: React.FC<HorizontalDateListProps> = ({
  selectedDate,
  setSelectedDate,
}) => {
  const horizontalDateList = useRef<FlatList>(null);

  const renderItem = ({ item }: { item: unknown }) => {
    const date = item as string;

    return (
      <StyledContainerDate
        selected={date === selectedDate}
        onPress={() => setSelectedDate(date)}>
        <StyledLabelDate>
          {moment(date).format('D')}
          {'\n'}
          {moment(date).format('ddd')}
        </StyledLabelDate>
      </StyledContainerDate>
    );
  };

  return (
    <StyledHorizontalFlatList
      ref={horizontalDateList}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={enumerateDaysBetweenDates(new Date('2023-05-01'))}
      renderItem={({ item }) => renderItem({ item })}
    />
  );
};

export default HorizontalDateList;
