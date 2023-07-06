import { useCallback, useMemo } from 'react';

import { useFocusEffect, useNavigation } from '@react-navigation/core';
import { omit } from 'lodash';

import {
  Box,
  Divider,
  FlatList,
  useIsVerticalLayout,
  useUserDevice,
} from '@onekeyhq/components';
import { Tabs } from '@onekeyhq/components/src/CollapsibleTabView';
import type { FlatListProps } from '@onekeyhq/components/src/FlatList';
import type { Token } from '@onekeyhq/engine/src/types/token';
import type { EVMDecodedItem } from '@onekeyhq/engine/src/vaults/impl/evm/decoder/types';
import { EVMDecodedTxType } from '@onekeyhq/engine/src/vaults/impl/evm/decoder/types';
import { HomeRoutes } from '@onekeyhq/kit/src/routes/types';
import type {
  HomeRoutesParams,
  RootRoutes,
  RootRoutesParams,
} from '@onekeyhq/kit/src/routes/types';
import { MAX_PAGE_CONTAINER_WIDTH } from '@onekeyhq/shared/src/config/appConfig';

import backgroundApiProxy from '../../../background/instance/backgroundApiProxy';
import { useAccountTokens, useActiveSideAccount } from '../../../hooks';
import { useAccountTokenLoading } from '../../../hooks/useTokens';
import { OverviewDefiThumbnal } from '../../Overview/Thumbnail';

import AssetsListHeader from './AssetsListHeader';
import { EmptyListOfAccount } from './EmptyList';
import AssetsListSkeleton from './Skeleton';
import TokenCell from './TokenCell';

import type { SimplifiedToken } from '../../../store/reducers/tokens';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProps = NativeStackNavigationProp<
  RootRoutesParams,
  RootRoutes.Root
> &
  NativeStackNavigationProp<HomeRoutesParams, HomeRoutes.ScreenTokenDetail>;

export type IAssetsListProps = Omit<FlatListProps, 'data' | 'renderItem'> & {
  onTokenPress?:
    | null
    | ((event: { token: SimplifiedToken }) => void)
    | undefined;
  singleton?: boolean;
  hidePriceInfo?: boolean;
  showRoundTop?: boolean;
  limitSize?: number;
  flatStyle?: boolean;
  accountId: string;
  networkId: string;
  renderDefiList?: boolean;
};
function AssetsList({
  showRoundTop,
  singleton,
  hidePriceInfo,
  ListHeaderComponent,
  ListFooterComponent,
  contentContainerStyle,
  onTokenPress,
  limitSize,
  flatStyle,
  accountId,
  networkId,
  renderDefiList,
}: IAssetsListProps) {
  const isVerticalLayout = useIsVerticalLayout();
  const loading = useAccountTokenLoading(networkId, accountId);
  const accountTokensWithoutLimit = useAccountTokens(
    networkId,
    accountId,
    true,
  );

  // console.log(accountTokensWithoutLimit)

  const accountTokens = useMemo(
    () =>
      limitSize
        ? accountTokensWithoutLimit.slice(0, limitSize)
        : accountTokensWithoutLimit,
    [accountTokensWithoutLimit, limitSize],
  );

  const { account, network } = useActiveSideAccount({
    accountId,
    networkId,
  });

  const navigation = useNavigation<NavigationProps>();

  const { size } = useUserDevice();
  const responsivePadding = () => {
    if (['NORMAL', 'LARGE'].includes(size)) return 32;
    return 16;
  };

  useFocusEffect(
    useCallback(() => {
      const { serviceToken, serviceOverview } = backgroundApiProxy;
      if (account && network) {
        serviceToken.startRefreshAccountTokens();
        serviceOverview.startQueryPendingTasks();
        serviceToken.fetchAccountTokens({
          includeTop50TokensQuery: true,
          networkId: network?.id,
          accountId: account?.id,
        });
      }
      return () => {
        serviceToken.stopRefreshAccountTokens();
        serviceOverview.stopQueryPendingTasks();
      };
    }, [account, network]),
  );

  const onTokenCellPress = useCallback(
    (item: Token) => {
      if (onTokenPress) {
        onTokenPress({ token: item });
        return;
      }
      // TODO: make it work with multi chains.
      const filter = item.tokenIdOnNetwork
        ? undefined
        : (i: EVMDecodedItem) => i.txType === EVMDecodedTxType.NATIVE_TRANSFER;

      navigation.navigate(HomeRoutes.ScreenTokenDetail, {
        accountId: account?.id ?? '',
        networkId: networkId ?? '',
        tokenId: item.tokenIdOnNetwork ?? '',
        sendAddress: item.sendAddress,
        historyFilter: filter,
      });
    },
    [account?.id, networkId, navigation, onTokenPress],
  );

  const renderListItem: FlatListProps<Token>['renderItem'] = ({
    item,
    index,
  }) => {

    return (
      <TokenCell
        accountId={accountId}
        // hidePriceInfo={hidePriceInfo}
        // bg={flatStyle ? 'transparent' : 'surface-default'}
        borderTopRadius={!flatStyle && showRoundTop && index === 0 ? '12px' : 0}
        borderRadius={
          // eslint-disable-next-line no-unsafe-optional-chaining
          !flatStyle && index === accountTokens?.length - 1 ? '12px' : '0px'
        }
        borderTopWidth={!flatStyle && showRoundTop && index === 0 ? 1 : 0}
        // eslint-disable-next-line no-unsafe-optional-chaining
        borderBottomWidth={index === accountTokens?.length - 1 ? 1 : 0}
        borderColor={flatStyle ? 'transparent' : 'border-subdued'}
        onPress={onTokenCellPress}
        {...omit(item, 'source')}
        networkId={networkId}
      />
    );
  };

  const Container = singleton ? FlatList : Tabs.FlatList;

  const footer = useMemo(
    () => (
      <Box>
        {ListFooterComponent}
        {renderDefiList ? (
          <OverviewDefiThumbnal
            networkId={networkId}
            accountId={accountId}
            address={account?.address ?? ''}
            limitSize={limitSize}
          />
        ) : null}
      </Box>
    ),
    [
      ListFooterComponent,
      networkId,
      accountId,
      account?.address,
      renderDefiList,
      limitSize,
    ],
  );

  // test12

  const accountTokens_DEToken = useMemo(() => {
    return accountTokens.map((item, index) => {
      // if (item.networkId !== 'evm--9000') { return item }

      // if (item.symbol === 'DE') {
      // }
      // if (item.symbol === 'DEC') {
      //   item.logoURI = 'http://file.depaas.net/icon/dec_logo.png';
      // }
      // if (item.symbol === 'DENFT') {
      //   item.logoURI = 'https://d23xm0xzbhyylj.cloudfront.net/denft.png';
      // }
      // if (item.symbol === 'DET') {
      //   item.logoURI = 'http://file.depaas.net/icon/det_logo.png';
      // }
      // if (item.symbol === 'GSC') {
      //   item.logoURI = 'http://file.depaas.net/icon/gsc_logo.png';
      // }
      // if (item.symbol === 'USDT') {
      //   item.logoURI = 'http://file.depaas.net/icon/icon_usdt3.png';
      // }
      return item;
    });
  }, [accountTokens]);

  // console.log(accountTokens)
  // console.log(accountTokens_DEToken)
  return (
    <Container
      style={{
        maxWidth: MAX_PAGE_CONTAINER_WIDTH,
        width: '100%',
        marginHorizontal: 'auto',
        alignSelf: 'center',
      }}
      contentContainerStyle={[
        {
          paddingHorizontal: flatStyle ? 0 : responsivePadding(),
          marginTop: 24,
        },
        contentContainerStyle,
      ]}
      data={[...accountTokens_DEToken]}
      renderItem={renderListItem}
      ListHeaderComponent={
        loading
          ? null
          : ListHeaderComponent ?? (
              <AssetsListHeader
                innerHeaderBorderColor={
                  flatStyle ? 'transparent' : 'border-subdued'
                }
                showTokenCount={limitSize !== undefined}
                showOuterHeader={limitSize !== undefined}
                showInnerHeader={accountTokens_DEToken.length > 0}
                showInnerHeaderRoundTop={!flatStyle}
              />
            )
      }
      ItemSeparatorComponent={Divider}
      ListEmptyComponent={
        loading
          ? AssetsListSkeleton
          : // eslint-disable-next-line react/no-unstable-nested-components
            () => <EmptyListOfAccount network={network} accountId={accountId} />
      }
      ListFooterComponent={footer}
      keyExtractor={(_item: SimplifiedToken) =>
        `${_item.tokenIdOnNetwork}--${_item.sendAddress ?? ''}`
      }
      extraData={isVerticalLayout}
      showsVerticalScrollIndicator={false}
    />
  );
}

export default AssetsList;

const test = {
  '_id': '63455df060ad34cc8f4c23b9',
  'name': 'DE',
  'address': '',
  'symbol': 'DE',
  'decimals': 18,
  'logoURI': 'https://common.onekey-asset.com/chain/eth.png',
  'coingeckoId': 'DE',
  'status': 'LISTED',
  'impl': 'evm',
  'chainId': '1',
  'checked': true,
  'isNative': true,
  'addToIndex': true,
  'source': 'Coingecko',
  'updatedAt': '2022-11-15T02:53:53.828Z',
  'onramperId': 'DE',
  'moonpayId': 'de',
  'riskLevel': 0,
  'id': 'evm--9000',
  'networkId': 'evm--9000',
  'tokenIdOnNetwork': '',
  'price': 1879.4737202915503,
  'balance': '1',
  'value': '2',
  'usdValue': '3',
  'value24h': '4',
};
