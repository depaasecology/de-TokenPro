import { useCallback } from 'react';

import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { useIntl } from 'react-intl';

import Layout from '../../../Layout';
import { EOnboardingRoutes } from '../../../routes/enums';
import VerifyMnemonic from './VerifyMnemonic';

import type { IOnboardingRoutesParams } from '../../../routes/types';
import type { RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

type NavigationProps = StackNavigationProp<
  IOnboardingRoutesParams,
  EOnboardingRoutes.ShowRecoveryPhrase
>;
type RouteProps = RouteProp<
  IOnboardingRoutesParams,
  EOnboardingRoutes.ShowRecoveryPhrase
>;

const ShowRecoveryPhrase = () => {
  const intl = useIntl();
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProps>();
  const { mnemonic } = route.params;
  const onPressSavedPhrase = useCallback(() => {
    navigation.replace(EOnboardingRoutes.BehindTheScene, route.params);
  }, [navigation, route.params]);

  return (
    <Layout
      title={intl.formatMessage({
        id: 'confirm_mnemonic',
      })}
      // fullHeight
      secondaryContent={
        <VerifyMnemonic
          mnemonic={mnemonic}
          onPressSavedPhrase={onPressSavedPhrase}
        />
      }
    />
  );
};

export default ShowRecoveryPhrase;
