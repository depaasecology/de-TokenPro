import type { FC } from 'react';
import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';

import { EOnboardingRoutes } from '@onekeyhq/kit/src/views/Onboarding/routes/enums';

import { useIntl } from 'react-intl';

import {
  Box,
  Button,
  MnemonicCard,
  Text,
  useIsVerticalLayout,
} from '@onekeyhq/components';

// import { wait } from '../../../../utils/helper';

import type { IBoxProps } from 'native-base';

import type { IOnboardingRoutesParams } from '@onekeyhq/kit/src/routes/types';
import type { RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

type PhraseSheetProps = {
  onPressSavedPhrase?: () => void;
  mnemonic: string;
} & IBoxProps;

type NavigationProps = StackNavigationProp<
  IOnboardingRoutesParams,
  EOnboardingRoutes.RecoveryPhrase
>;
type RouteProps = RouteProp<
  IOnboardingRoutesParams,
  EOnboardingRoutes.RecoveryPhrase
>;

const PhraseSheet: FC<PhraseSheetProps> = ({
  onPressSavedPhrase,
  mnemonic,
  ...rest
}) => {
  const intl = useIntl();
  const isVerticalLayout = useIsVerticalLayout();
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavigationProps>();

  // const onPressSavedPhrasePromise = useCallback(async () => {
  //   onPressSavedPhrase?.();
  //   await wait(3000);
  // }, [onPressSavedPhrase]);

  const onPressShowPhraseButton = useCallback(() => {
    navigation.replace(EOnboardingRoutes.VerifyMnemonic, route.params);
  }, [navigation, route.params]);

  return (
    <Box alignSelf="stretch" flex={1} {...rest}>
      <Text typography="Body2" color="text-subdued" textAlign="center" mb={4}>
        ↓ {intl.formatMessage({ id: 'content__click_below_to_copy' })} ↓
      </Text>
      <Box flex={1} mb={8}>
        <MnemonicCard mnemonic={mnemonic} />
      </Box>
      <Text typography="Body2" color="text-subdued" textAlign="center" mb={4}>
        {intl.formatMessage({ id: 'content__save_phrase_securely' })}
      </Text>
      <Button
        type="primary"
        size={isVerticalLayout ? 'xl' : 'base'}
        onPromise={onPressShowPhraseButton}
      >
        {intl.formatMessage({ id: 'action__i_have_saved_the_phrase' })}
      </Button>
    </Box>
  );
};

export default PhraseSheet;
