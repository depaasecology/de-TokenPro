import { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/core';
import { useIntl } from 'react-intl';

import {
  Box,
  Button,
  CustomSkeleton,
  Divider,
  Icon,
  Pressable,
  QRCode,
  Text,
  useTheme,
} from '@onekeyhq/components';
import { useClipboard } from '@onekeyhq/kit/src//hooks/useClipboard';
import type {
  HomeRoutesParams,
  HomeRoutes,
} from '@onekeyhq/kit/src/routes/types';
import backgroundApiProxy from '@onekeyhq/kit/src/background/instance/backgroundApiProxy';
import { setAppDownloadAddress } from '@onekeyhq/kit/src/store/reducers/dataDE';
import { RootRoutes } from '@onekeyhq/kit/src/routes/types';
import requestAddress from '@onekeyhq/kit/src/utils/requestAddress';
import supportedNFC from '@onekeyhq/shared/src/detector/nfc';

import useAppNavigation from '../../../hooks/useAppNavigation';
import { EOnboardingRoutes } from '../../Onboarding/routes/enums';
import { MigrationEnable } from '../../Onboarding/screens/Migration/util';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import exp from 'constants';

import platformEnv from '@onekeyhq/shared/src/platformEnv';

import axios from 'axios';
import { useAppSelector } from '@onekeyhq/kit/src/hooks/redux';

type NavigationProps = NativeStackNavigationProp<
  HomeRoutesParams,
  HomeRoutes.InitialTab
>;

const DownloadApp = () => {
  const intl = useIntl();
  const navigation = useNavigation<NavigationProps>();
  const appNavigation = useAppNavigation();
  const { themeVariant } = useTheme();
  const dataDE = useAppSelector((s) => s.dataDE);
  const { dispatch } = backgroundApiProxy;
  // console.log(dataDE);

  // 二维码
  const { copyText } = useClipboard();
  const [downloadLink, setDownloadLink] = useState<string>(
    () => dataDE.appDownloadAddress,
  );

  useEffect(() => {
    axios({
      method: 'get',
      url: `${requestAddress.addr}/exapi/dapp/version/pro`,
      params: {
        platform: '1',
        region: '2',
      },
    }).then((res: unknown) => {
      if (res.data.code === 200 && res.data.data?.href !== '') {
        setDownloadLink(res.data.data.href);
        dispatch(setAppDownloadAddress(res.data.data.href));
      }
    });
  }, [dispatch]);
  // console.log(downloadLink);
  return (
    <Box w="full" mb="6">
      <Box alignItems="center" py="16px">
        <Text fontSize="md">
          {intl.formatMessage({
            id: 'content__use_browser_download',
          })}
        </Text>
      </Box>
      <Box
        alignItems="center"
        justifyContent="center"
        h="320px"
        // backgroundColor={'red.900'}
      >
        {downloadLink !== '--' && downloadLink !== '' ? (
          <Box w="288px" h="288px" borderRadius="3xl" overflow="hidden">
            <QRCode value={downloadLink} size={288} />
          </Box>
        ) : (
          <CustomSkeleton w="288px" h="288px" rounded="2xl" />
        )}
      </Box>
      <Box p="16px" px="32px">
        <Button
          size="xl"
          mb="16px"
          onPress={() => {
            if (downloadLink !== '--') copyText(downloadLink);
          }}
        >
          {intl.formatMessage({
            id: 'action__copy',
          })}
        </Button>
      </Box>
    </Box>
  );
};

export default DownloadApp;
