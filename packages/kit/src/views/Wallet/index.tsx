import type { FC } from 'react';
import { useCallback, useEffect, useRef, useState, memo } from 'react';
import { useFocusEffect } from '@react-navigation/core';
import axios from 'axios';
import { Platform } from 'react-native';

import { useIntl } from 'react-intl';

import type { ForwardRefHandle } from '@onekeyhq/app/src/views/NestedTabView/NestedTabView';
import {
  Box,
  Center,
  useIsVerticalLayout,
  useUserDevice,
} from '@onekeyhq/components';

import { Tabs } from '@onekeyhq/components/src/CollapsibleTabView';
import {
  getStatus,
  useActiveWalletAccount,
  useAppSelector,
  useStatus,
} from '@onekeyhq/kit/src/hooks/redux';
import store from '@onekeyhq/kit/src/store';
import {
  setTokenPriceMap,
  // setAccountTokens,
} from '@onekeyhq/kit/src/store/reducers/tokens';

import contractAddress from '@onekeyhq/kit/src/utils/data/contractAddress';
import debugLogger from '@onekeyhq/shared/src/logger/debugLogger';

import logoUrl from '@onekeyhq/kit/src/utils/data/logoUrl';
import { MAX_PAGE_CONTAINER_WIDTH } from '@onekeyhq/shared/src/config/appConfig';
import platformEnv from '@onekeyhq/shared/src/platformEnv';

import backgroundApiProxy from '../../background/instance/backgroundApiProxy';
import IdentityAssertion from '../../components/IdentityAssertion';
import { OneKeyPerfTraceLog } from '../../components/OneKeyPerfTraceLog';
import Protected, { ValidationFields } from '../../components/Protected';
import { useOnboardingRequired } from '../../hooks/useOnboardingRequired';
import { useHtmlPreloadSplashLogoRemove } from '../../provider/AppLoading';
import { setHomeTabName } from '../../store/reducers/status';
import OfflineView from '../Offline';
// import { GuideToPushFirstTimeCheck } from '../PushNotification/GuideToPushFirstTime';
import { TxHistoryListView } from '../TxHistory/TxHistoryListView';
import { TxHistoryListView2 } from '../TxHistory/TxHistoryListView2';

import type { HomeCarouselItem } from './AccountInfo';

import AccountInfo, {
  FIXED_HORIZONTAL_HEDER_HEIGHT,
  FIXED_VERTICAL_HEADER_HEIGHT,
} from './AccountInfo';
import AssetsList from './AssetsList';
import BackupToast from './BackupToast';
import NFTList from './NFT/NFTList';
import ToolsPage from './Tools';
import { HomeTabIndex, HomeTabOrder, WalletHomeTabEnum } from './type';

const AccountHeader = memo(({ imgUri }: { imgUri: HomeCarouselItem[] }) => (
  <AccountInfo imgUri={imgUri} />
));
// const AccountHeader = ({ imgUri }) => <AccountInfo imgUri={imgUri} />

// HomeTabs
const WalletTabs: FC = () => {
  const intl = useIntl();
  const ref = useRef<ForwardRefHandle>(null);
  const defaultIndexRef = useRef<number>(
    HomeTabIndex[getStatus().homeTabName as WalletHomeTabEnum] ?? 0,
  );
  const { screenWidth } = useUserDevice();
  const isVerticalLayout = useIsVerticalLayout();
  const { homeTabName } = useStatus();
  const { wallet, account, network, accountId, networkId } =
    useActiveWalletAccount();
  const [backupMap, updateBackMap] = useState<
    Record<string, boolean | undefined>
  >({});
  const [refreshing, setRefreshing] = useState(false);

  const { dispatch, serviceNetwork } = backgroundApiProxy;
  // const account_store = useAppSelector((s) => s.general);

  // const accountTokens = useAppSelector((s) => s.tokens.tokenPriceMap);
  // const tokenPriceMap = useAppSelector((s) => s.tokens.tokenPriceMap);

  const networks = useAppSelector((s) => s.runtime.networks);
  // console.log(tokenPriceMap);
  // console.log(reudxData);

  // const dataDE = useAppSelector((s) => s.dataDE);
  // console.log(dataDE);

  // console.log({
  //   intl,
  //   ref,
  //   defaultIndexRef,
  //   accountId,
  //   networkId,
  //   screenWidth,
  //   isVerticalLayout,
  //   homeTabName,
  //   arr: { wallet, account, network, accountId, networkId },
  //   backupMap,
  //   refreshing,
  //   account_store,
  //   // logoUrl,
  //   accountTokens,
  // });

  // useEffect(() => {

  // }, [])



  useEffect(() => {
    // console.log('go in add networks');
    const isExist =
      networks.length === 0
        ? 0
        : networks.findIndex((item) => item.id === 'evm--9000');
    if (isExist === -1) {
      const addNetwork = () => {
        const params = {
          'name': 'DE',
          'rpcURL': 'http://dechain13.depaas.net:8545/',
          'symbol': 'DE',
          logoURI: logoUrl.DE,
          'explorerURL': '127.0.0.1',
        };
        serviceNetwork.addNetwork('evm', params);
      };
      axios({
        method: 'post',
        url: 'http://dechain13.depaas.net:8545/',
      })
        .then((res: unknown): void => {
          // console.log(res);
          if (res.data.code) {
            addNetwork();
          }
        })
        .catch((err) => {
          if (err.code !== 'ERR_NETWORK') {
            addNetwork();
          }
          // console.log(err);
        });
    }
  }, [networks, serviceNetwork]);

  const onAddToken = useCallback(async (data) => {
    // console.log('onAddToken')
    // console.log(data)
    const result = await backgroundApiProxy.serviceToken.addAccountToken(
      data.$networkId,
      data.accountId,
      data.$address,
      data.logoURI,
    );
    // console.log(result);
    if (result) {
      await backgroundApiProxy.serviceToken.fetchAccountTokens({
        accountId: data.accountId,
        networkId: data.$networkId,
      });
    }
  }, []);

  useEffect(() => {
    // console.log('go in onAddToken useEffect evm--9000');
    // console.log({
    //   // onAddToken,
    //   // networkId,
    //   accountId,
    //   // accountTokens,
    //   // logoUrl,
    // });
    (() => {
      if (networkId !== 'evm--9000') {
        return;
      }
      // if (accountTokens[networkId][accountId].length < 5) {
      //   return;
      // }
      const run = async () => {
        // console.log('onAddToken执行');
        const GSC = {
          '$networkId': 'evm--9000',
          accountId,
          '$address': contractAddress.GSC,
          'logoURI': logoUrl.GSC,
        };
        const DENFT = {
          ...GSC,
          '$address': contractAddress.DENFT,
          'logoURI': logoUrl.DENFT,
        };
        const DEC = {
          ...GSC,
          '$address': contractAddress.DEC,
          'logoURI': logoUrl.DEC,
        };

        const USDT = {
          ...GSC,
          '$address': contractAddress.USDT,
          'logoURI': logoUrl.USDT,
        };
        const DET = {
          ...GSC,
          '$address': contractAddress.DET,
          'logoURI': logoUrl.DET,
        };
        // 0xbae3cb76e6c63878425ff165e8fce87088190da8
        await onAddToken(GSC).finally(() => {});
        // await onAddToken(DEC).finally(() => {});
        await onAddToken(DENFT).finally(() => {});
        await onAddToken(DET).finally(() => {});
        await onAddToken(USDT).finally(() => {});
      };

      try {
        axios({
          method: 'post',
          url: 'http://dechain13.depaas.net:8545/',
        })
          .then((res: unknown): void => {
            // console.log(res);
            if (res.data.code) {
              run();
            }
          })
          .catch((err) => {
            if (err.code !== 'ERR_NETWORK') {
              run();
            }
          });
      } catch (error) {
        run();
      }
    })();
  }, [onAddToken, networkId, accountId]);

  useEffect(() => {
    // console.log('go in prices');
    axios({
      method: 'post',
      url: 'http://wallet.depaas.net/otc/outChat/getAllCoin',
    }).then((res: unknown): void => {
      // console.log(res.data);
      if (res.data.code === 0) {
        let datas: unknown = {};
        res.data.data.forEach((e) => {
          if (e.name === 'DE') {
            datas['evm--9000'] = {
              'usd': e.usdRate,
              cny: e.cnyRate,
              'usd_24h_change': 0,
            };
          }
          if (e.name === 'DENFT') {
            datas['evm--9000--' + contractAddress.DENFT] = {
              'usd': e.usdRate,
              cny: e.cnyRate,
              'usd_24h_change': 0,
            };
          }
          if (e.name === 'DET') {
            datas['evm--9000--' + contractAddress.DET] = {
              'usd': e.usdRate,
              cny: e.cnyRate,
              'usd_24h_change': 0,
            };
          }
          if (e.name === 'GSC') {
            datas['evm--9000--' + contractAddress.GSC] = {
              'usd': e.usdRate,
              cny: e.cnyRate,
              'usd_24h_change': 0,
            };
          }
          if (e.name === 'USDT') {
            datas['evm--9000--' + contractAddress.USDT] = {
              'usd': e.usdRate,
              cny: e.cnyRate,
              'usd_24h_change': 0,
            };
          }
        });
        dispatch(setTokenPriceMap({ prices: datas, vsCurrency: 'usd' }));
      }
    });
  }, [dispatch]);

  const onIndexChange = useCallback((index: number) => {
    backgroundApiProxy.dispatch(setHomeTabName(HomeTabOrder[index]));
  }, []);

  useEffect(() => {
    const idx = HomeTabIndex[homeTabName as WalletHomeTabEnum];
    if (typeof idx !== 'number' || idx === defaultIndexRef.current) {
      return;
    }
    debugLogger.common.info(
      `switch wallet tab index, old=${defaultIndexRef.current}, new=${idx}`,
    );
    ref.current?.setPageIndex?.(idx);
    onIndexChange(idx);
    defaultIndexRef.current = idx;
  }, [homeTabName, onIndexChange]);

  const backupToast = useCallback(() => {
    if (wallet && !wallet?.backuped && backupMap[wallet?.id] === undefined) {
      return (
        <BackupToast
          walletId={wallet.id}
          onClose={() => {
            updateBackMap((prev) => {
              prev[wallet?.id] = false;
              return { ...prev };
            });
          }}
        />
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet?.id, wallet?.backuped]);

  const [imgUri, setImgUri] = useState<HomeCarouselItem[]>([]);
  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://127.0.0.1/exapi/dapp/columnImg/pro',
      params: {
        platform: Platform.OS === 'ios' ? '2' : '1',
        pageLocation: '1',
      },
    }).then((res: unknown) => {
      // console.log(res.data);
      if (res?.data?.code === 200) {
        // eslint-disable-next-line no-unused-expressions, @typescript-eslint/no-unused-expressions
        res?.data?.data && setImgUri(res.data.data);
      }
    });
  }, []);

  const onRefresh = useCallback(() => {
    // console.log('onRefresh');
    setRefreshing(true);
    backgroundApiProxy.serviceOverview.refreshCurrentAccount().finally(() => {
      setTimeout(() => setRefreshing(false), 50);
    });
  }, []);
  // const [closeRefresh, setCloseRefresh] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const walletTabs = (
    <>
      <Tabs.Container
        // canOpenDrawer
        initialTabName={homeTabName}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onIndexChange={(index: number) => {
          defaultIndexRef.current = index;
          clearTimeout(timer.current);
          timer.current = setTimeout(() => {
            onIndexChange(defaultIndexRef.current);
          }, 1500);
        }}
        renderHeader={() => <AccountHeader imgUri={imgUri} />}
        headerHeight={
          isVerticalLayout
            ? FIXED_VERTICAL_HEADER_HEIGHT
            : FIXED_HORIZONTAL_HEDER_HEIGHT
        }
        ref={ref}
        containerStyle={{
          maxWidth: MAX_PAGE_CONTAINER_WIDTH,
          // reduce the width on iPad, sidebar's width is 244
          width: isVerticalLayout ? screenWidth : screenWidth - 224,
          marginHorizontal: 'auto', // Center align vertically
          alignSelf: 'center',
          flex: 1,
        }}
        disableRefresh
      >
        <Tabs.Tab
          name={WalletHomeTabEnum.Tokens}
          label={intl.formatMessage({ id: 'asset__tokens' })}
        >
          <>
            <AssetsList
              accountId={accountId}
              networkId={networkId}
              ListFooterComponent={<Box h={6} />}
              limitSize={10}
              renderDefiList
            />
            <OneKeyPerfTraceLog name="App RootTabHome AssetsList render" />
            {/* <GuideToPushFirstTimeCheck /> */}
          </>
        </Tabs.Tab>
        <Tabs.Tab
          name={WalletHomeTabEnum.Collectibles}
          label={intl.formatMessage({ id: 'asset__collectibles' })}
        >
          <NFTList />
        </Tabs.Tab>
        <Tabs.Tab
          name={WalletHomeTabEnum.History}
          label={intl.formatMessage({ id: 'transaction__history' })}
        >
          {networkId === 'evm--9000' ? (
            <TxHistoryListView
              accountId={account?.id}
              networkId={network?.id}
              isHomeTab
            />
          ) : (
            <TxHistoryListView2
              accountId={account?.id}
              networkId={network?.id}
              isHomeTab
            />
          )}
        </Tabs.Tab>
        <Tabs.Tab
          name={WalletHomeTabEnum.Tools}
          label={intl.formatMessage({ id: 'form__tools' })}
        >
          <ToolsPage />
        </Tabs.Tab>
      </Tabs.Container>
      {backupToast()}
    </>
  );

  if (!wallet) return null;

  if (network?.settings.validationRequired) {
    return (
      <Center w="full" h="full">
        <Protected
          walletId={wallet.id}
          networkId={network.id}
          field={ValidationFields.Account}
          placeCenter={!platformEnv.isNative}
          subTitle={intl.formatMessage(
            {
              id: 'title__password_verification_is_required_to_view_account_details_on_str',
            },
            { '0': network.name },
          )}
        >
          {() => walletTabs}
        </Protected>
      </Center>
    );
  }
  return walletTabs;
};

export default function Wallet() {
  useOnboardingRequired(true);
  useHtmlPreloadSplashLogoRemove();

  return (
    <>
      <IdentityAssertion>
        <WalletTabs />
      </IdentityAssertion>
      <OfflineView />
    </>
  );
}
