import React from 'react';
import { useMenu } from '@/core/infrastructure/hooks/useMenu';
import { StyledCardOption, StyledScroll } from './styles';

const SettingsView: React.FC = () => {
  const { settingOptions, handlePressMenuOption } = useMenu();

  return (
    <StyledScroll>
      {settingOptions
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
    </StyledScroll>
  );
};

export default SettingsView;
