import {
  useState,
  // useCallback
} from 'react';

import { useIntl } from 'react-intl';

import {
  Box,
  Icon,
  Pressable,
  Text,
  // ToastManager,
  Typography,
  useTheme,
} from '@onekeyhq/components';
// import { useAppSelector } from '@onekeyhq/kit/src/hooks/redux';

import { useNavigation } from '@react-navigation/core';

// import { copyToClipboard } from '@onekeyhq/components/src/utils/ClipboardUtils';
import backgroundApiProxy from '@onekeyhq/kit/src/background/instance/backgroundApiProxy';
// import { useSettings } from '@onekeyhq/kit/src/hooks/redux';
// import { useHelpLink } from '@onekeyhq/kit/src/hooks/useHelpLink';
// import { setDevMode } from '@onekeyhq/kit/src/store/reducers/settings';
import { setCheckUpdates } from '@onekeyhq/kit/src/store/reducers/dataDE';

// import { openUrlByWebview, openUrlExternal } from '../../../utils/openUrl';

// import AppRateSectionItem from './AppRateSectionItem';
// import AutoUpdateSectionItem from './AutoUpdateSectionItem';

import platformEnv from '@onekeyhq/shared/src/platformEnv';
import updateInfo from '@onekeyhq/kit/src/utils/data/updateInfo';
import { HomeRoutes } from '../../../routes/routesEnum';

export const AboutSection = () => {
  const intl = useIntl();
  const navigation = useNavigation();

  // const dataDE = useAppSelector(s => s.dataDE);
  const { dispatch } = backgroundApiProxy;
  const { themeVariant } = useTheme();
  // const userAgreementUrl = useHelpLink({ path: 'articles/360002014776' });
  // const privacyPolicyUrl = useHelpLink({ path: 'articles/360002003315' });
  const [settings] = useState(() => ({
    version: updateInfo.version,
    buildNumber: updateInfo.buildNumber,
  }));
  // let lastTime: Date | undefined;
  // let num = 0;
  // const openDebugMode = () => {
  //   const nowTime = new Date();
  //   if (
  //     lastTime === undefined ||
  //     Math.round(nowTime.getTime() - lastTime.getTime()) > 5000
  //   ) {
  //     // 重置
  //     lastTime = nowTime;
  //     num = 0;
  //   } else {
  //     num += 1;
  //   }
  //   if (num >= 9) {
  //     dispatch(setDevMode(true));
  //   }
  // };

  // const handleCopyVersion = useCallback(
  //   (version) => {
  //     copyToClipboard(version);
  //     ToastManager.show({ title: intl.formatMessage({ id: 'msg__copied' }) });
  //   },
  //   [intl],
  // );

  // console.log(platformEnv);

  return (
    <Box w="full" mb="6">
      <Box pb="2">
        <Typography.Subheading color="text-subdued">
          {intl.formatMessage({
            id: 'form__about_uppercase',
          })}
        </Typography.Subheading>
      </Box>
      <Box
        borderRadius="12"
        bg="surface-default"
        borderWidth={themeVariant === 'light' ? 1 : undefined}
        borderColor="border-subdued"
      >
        <Pressable
          display="flex"
          flexDirection="row"
          alignItems="center"
          py={4}
          px={{ base: 4, md: 6 }}
          borderBottomWidth="1"
          borderBottomColor="divider"
          onPress={() => {
            dispatch(setCheckUpdates());
            // openDebugMode();
            // handleCopyVersion(
            //   `${settings.version}${settings.buildNumber ? `-${settings.buildNumber}` : ''
            //   }`,
            // );
          }}
        >
          <Icon name="HashtagOutline" />
          <Text
            typography={{ sm: 'Body1Strong', md: 'Body2Strong' }}
            flex={1}
            mx={3}
            style={[
              {
                // @ts-ignore
                WebkitUserSelect: 'none',
                userSelect: 'none',
              },
            ]}
          >
            {platformEnv.symbol === 'native'
              ? intl.formatMessage({
                  id: 'form__check_for_updates',
                })
              : intl.formatMessage({
                  id: 'form__version',
                })}
          </Text>
          <Text
            typography={{ sm: 'Body1Strong', md: 'Body2Strong' }}
            color="text-subdued"
          >
            V {settings.version}
            {updateInfo.buildNumber ? `-${updateInfo.buildNumber}` : ''}
          </Text>
        </Pressable>
        <Pressable
          display="flex"
          flexDirection="row"
          alignItems="center"
          py={4}
          px={{ base: 4, md: 6 }}
          borderBottomWidth="1"
          borderBottomColor="divider"
          onPress={() => {
            navigation.navigate(HomeRoutes.DownloadApp);
          }}
        >
          <Icon name="ShareOutline" />
          <Text
            typography={{ sm: 'Body1Strong', md: 'Body2Strong' }}
            flex={1}
            mx={3}
            style={[
              {
                // @ts-ignore
                WebkitUserSelect: 'none',
                userSelect: 'none',
              },
            ]}
          >
            {intl.formatMessage({
              id: 'title__share_APP',
            })}
          </Text>
          <Box>
            <Icon name="ChevronRightMini" color="icon-subdued" size={20} />
          </Box>
        </Pressable>
        {/* <AutoUpdateSectionItem /> */}
        {/* <AppRateSectionItem /> */}
        {/* <Pressable
          display="flex"
          flexDirection="row"
          alignItems="center"
          py={4}
          px={{ base: 4, md: 6 }}
          borderBottomWidth="1"
          borderBottomColor="divider"
          onPress={() =>
            openUrlByWebview(
              userAgreementUrl,
              intl.formatMessage({
                id: 'form__user_agreement',
              }),
            )
          }
        >
          <Icon name="UserCircleOutline" />
          <Text
            typography={{ sm: 'Body1Strong', md: 'Body2Strong' }}
            flex={1}
            mx={3}
          >
            {intl.formatMessage({
              id: 'form__user_agreement',
            })}
          </Text>
          <Box>
            <Icon name="ChevronRightMini" color="icon-subdued" size={20} />
          </Box>
        </Pressable> */}
        {/* <Pressable
          display="flex"
          flexDirection="row"
          alignItems="center"
          py={4}
          px={{ base: 4, md: 6 }}
          borderBottomWidth="1"
          borderBottomColor="divider"
          onPress={() =>
            openUrlByWebview(
              privacyPolicyUrl,
              intl.formatMessage({
                id: 'form__privacy_policy',
              }),
            )
          }
        >
          <Icon name="EllipsisHorizontalCircleOutline" />
          <Text
            typography={{ sm: 'Body1Strong', md: 'Body2Strong' }}
            flex={1}
            mx={3}
          >
            {intl.formatMessage({
              id: 'form__privacy_policy',
            })}
          </Text>
          <Box>
            <Icon name="ChevronRightMini" color="icon-subdued" size={20} />
          </Box>
        </Pressable> */}
        {/* <Pressable
          display="flex"
          flexDirection="row"
          alignItems="center"
          py={4}
          px={{ base: 4, md: 6 }}
          borderBottomWidth="1"
          borderBottomColor="divider"
          onPress={() =>
            openUrlByWebview(
              'https://www.onekey.so',
              intl.formatMessage({
                id: 'form__website',
              }),
            )
          }
        >
          <Icon name="GlobeAltOutline" />
          <Text
            typography={{ sm: 'Body1Strong', md: 'Body2Strong' }}
            flex={1}
            mx={3}
          >
            {intl.formatMessage({
              id: 'form__website',
            })}
          </Text>
          <Icon
            name="ArrowTopRightOnSquareMini"
            color="icon-subdued"
            size={20}
          />
        </Pressable> */}
        {/* <Pressable
          display="flex"
          flexDirection="row"
          alignItems="center"
          py={4}
          px={{ base: 4, md: 6 }}
          borderBottomWidth="1"
          borderBottomColor="divider"
          onPress={() => openUrlExternal('https://www.discord.gg/onekey')}
        >
          <Icon name="DiscordOutline" />
          <Text
            typography={{ sm: 'Body1Strong', md: 'Body2Strong' }}
            flex={1}
            mx={3}
          >
            Discord
          </Text>
          <Icon
            name="ArrowTopRightOnSquareMini"
            color="icon-subdued"
            size={20}
          />
        </Pressable> */}
        {/* <Pressable
          display="flex"
          flexDirection="row"
          alignItems="center"
          py={4}
          px={{ base: 4, md: 6 }}
          onPress={() => openUrlExternal('https://www.twitter.com/onekeyhq')}
        >
          <Icon name="TwitterOutline" />
          <Text
            typography={{ sm: 'Body1Strong', md: 'Body2Strong' }}
            flex={1}
            mx={3}
          >
            Twitter
          </Text>
          <Icon
            name="ArrowTopRightOnSquareMini"
            color="icon-subdued"
            size={20}
          />
        </Pressable> */}
      </Box>
    </Box>
  );
};
