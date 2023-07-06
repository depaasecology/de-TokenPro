import type { FC } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import axios from 'axios';
import { useIntl } from 'react-intl';
import { Platform } from 'react-native';

import {
  Box,
  Button,
  Icon,
  Pressable,
  Text,
  ToastManager,
  useIsVerticalLayout,
} from '@onekeyhq/components';
import { useAppSelector, useAutoUpdate } from '@onekeyhq/kit/src/hooks/redux';
import useAppNavigation from '@onekeyhq/kit/src/hooks/useAppNavigation';
import { UpdateFeatureModalRoutes } from '@onekeyhq/kit/src/routes/Modal/UpdateFeature';
import { ModalRoutes, RootRoutes } from '@onekeyhq/kit/src/routes/routesEnum';
// import { disable } from '@onekeyhq/kit/src/store/reducers/autoUpdater';
import updateInfo from '@onekeyhq/kit/src/utils/data/updateInfo';
import requestAddress from '@onekeyhq/kit/src/utils/requestAddress';
import appUpdates from '@onekeyhq/kit/src/utils/updates/AppUpdates';
import versionCompare from '@onekeyhq/kit/src/utils/versionCompare';
import platformEnv from '@onekeyhq/shared/src/platformEnv';

interface LastVersion {
  os: string;
}

const UpdateAlert: FC = () => {
  const intl = useIntl();
  const canSendGetversion = useRef(true);

  const { enabled, latest: lastVersion } = useAutoUpdate();
  const dataDE = useAppSelector((s) => s.dataDE);
  const [updateDate, setUpdateDate] = useState(() => ({
    enabled: false,
    forceUpdate: false,
    ...updateInfo,
  }));

  const navigation = useAppNavigation();
  const isSmallScreen = useIsVerticalLayout();

  const lastVersionLess = useMemo<LastVersion>(
    () => ({
      os: Platform.OS,
    }),
    [],
  );

  const sendGetversion = useCallback(
    (_lastVersionLess: LastVersion, checkUpdates: number) => {
      if (!canSendGetversion.current) {
        return;
      }
      canSendGetversion.current = false;
      axios({
        method: 'get',
        url: `${requestAddress.addr}/exapi/dapp/version/pro`,
        params: {
          platform: _lastVersionLess.os === 'ios' ? '2' : '1',
          region: '2',
        },
      })
        .then((res: unknown) => {
          if (res.data.code === 200) {
            const data = res.data.data;
            setUpdateDate((item) => {
              if (
                checkUpdates !== 0 &&
                !versionCompare(item.version, data.version)
              ) {
                ToastManager.show({
                  title: intl.formatMessage({
                    id: 'msg__the_current_version_is_the_latest',
                  }),
                });
              }
              return {
                ...item,
                remoteVersion: data.version,
                enabled: versionCompare(item.version, data.version),
                forceUpdate: data.ismay === 1 ? true : false,
                urlAndroid: String(data.href),
                urlIOS: String(data.url),
                updateContent: data.updateContent,
              };
            });
          }
        })
        .finally(() => {
          setTimeout(() => {
            canSendGetversion.current = true;
          }, 2000);
        });
    },
    [intl],
  );
  useEffect(() => {
    if (lastVersionLess.os !== 'web') {
      sendGetversion(lastVersionLess, 0);
    }
  }, [lastVersionLess, sendGetversion]);
  useEffect(() => {
    if (dataDE.checkUpdates !== 0 && lastVersionLess.os !== 'web') {
      sendGetversion(lastVersionLess, dataDE.checkUpdates);
    }
  }, [lastVersionLess, sendGetversion, dataDE.checkUpdates]);

  const releaseOpenUrl = useMemo(() => {
    if (lastVersionLess.os !== 'web') {
      if (lastVersionLess.os === 'ios') {
        return updateDate.urlIOS;
      }
      return updateDate.urlAndroid;
    }
    return '';
  }, [lastVersionLess, updateDate]);

  if (
    updateDate.enabled &&
    lastVersion &&
    'forceUpdate' in lastVersion &&
    updateDate.forceUpdate
  ) {
    navigation.navigate(RootRoutes.Modal, {
      screen: ModalRoutes.UpdateFeature,
      params: {
        screen: UpdateFeatureModalRoutes.ForcedUpdateModal,
        params: {
          versionInfo: {
            ...lastVersion,
            forceUpdate: true,
          },
          updateDate: {
            ...updateDate,
            releaseOpenUrl,
          },
        },
      },
    });
    return null;
  }

  if (
    platformEnv.isWeb ||
    platformEnv.isExtension ||
    platformEnv.isDesktopMac ||
    platformEnv.isDesktopWin
  ) {
    return null;
  }

  if (!lastVersion) {
    return null;
  }

  // Narrowing type to VersionInfo
  if (!('package' in lastVersion)) {
    return null;
  }

  return updateDate.enabled ? (
    <Box
      position="absolute"
      width={isSmallScreen ? 'full' : '358px'}
      left={isSmallScreen ? 0 : '288px'}
      bottom={isSmallScreen ? '58px' : '32px'}
      justifyContent="center"
      alignItems="center"
      px={{ base: 4, md: 0 }}
    >
      <Box
        flexDirection="row"
        width="full"
        px={4}
        py={4}
        bg="surface-default"
        borderRadius="xl"
        borderWidth={0.5}
        borderColor="border-subdued"
        shadow="depth.4"
      >
        <Box mr="12px">
          <Icon size={24} name="ArrowDownTrayOutline" color="icon-success" />
        </Box>
        <Box flex={1} mt={0.5}>
          <Text flex={1} typography="Body2Strong" color="text-default">
            {intl.formatMessage(
              { id: 'msg__update_to_onekey_str_is_available' },
              { 0: updateDate.remoteVersion },
            )}
          </Text>
          <Box>
            <Text flex={1} typography="Body2Strong" fontSize="xs" color="#666">
              {updateDate.updateContent}
            </Text>
          </Box>
          <Button
            alignSelf="flex-start"
            mt={3}
            onPress={() => {
              // console.log('立即更新')
              // console.log(lastVersion.package.os)
              appUpdates.openUrl({
                download: releaseOpenUrl,
              });
            }}
          >
            {intl.formatMessage({ id: 'action__update_now' })}
          </Button>
        </Box>
        {updateDate.forceUpdate ? null : (
          <Pressable
            ml={4}
            padding={0.5}
            onPress={() => {
              setUpdateDate((item) => ({
                ...item,
                enabled: false,
              }));
            }}
            rounded="full"
            _hover={{ bgColor: 'surface-hovered' }}
            _pressed={{ bgColor: 'surface-pressed' }}
            alignSelf="flex-start"
          >
            <Icon size={20} name="XMarkOutline" color="icon-default" />
          </Pressable>
        )}
      </Box>
    </Box>
  ) : null;
};

export default UpdateAlert;
