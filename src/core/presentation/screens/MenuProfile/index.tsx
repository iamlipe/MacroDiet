import { useMeasure } from '@core/infrastructure/hooks/useMeasure';
import React from 'react';
import { Button, View } from 'react-native';

const MenuProfile: React.FC = () => {
  const { createMeasure } = useMeasure();

  const onCreateMeasure = async () => {
    await createMeasure({
      multiple: 40,
      title: 'test',
      type: 'mass',
    });
  };

  return (
    <View>
      <Button title="teste criar meassure" onPress={onCreateMeasure} />
    </View>
  );
};

export default MenuProfile;
