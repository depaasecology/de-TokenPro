import type { FC } from 'react';

import { Text as NBText } from 'native-base';

import { useIsVerticalLayout } from '@onekeyhq/components';

import { getTypographyStyleProps } from '../Typography';

import type { FontProps, TypographyStyle } from '../Typography';

type TextProps = {
  typography?:
    | TypographyStyle
    | { 'sm': TypographyStyle; 'md': TypographyStyle };
} & FontProps;

const Text: FC<TextProps> = ({ typography, children, ...rest }) => {
  const isSmallScreen = useIsVerticalLayout();
  let props;
  if (typography) {
    if (typeof typography === 'string') {
      props = getTypographyStyleProps(typography);
    } else {
      props = getTypographyStyleProps(
        isSmallScreen ? typography.sm : typography.md,
      );
    }
  }
  if (typeof children === 'string') {
    // eslint-disable-next-line no-param-reassign
    children = String(children).replace('EVM #', 'DE #');
    // eslint-disable-next-line no-param-reassign
    children = String(children).replace(/onekey/gi, 'detoken');
  }
  return (
    <NBText color="text-default" {...props} {...rest}>
      {children}
    </NBText>
  );
};

export default Text;
