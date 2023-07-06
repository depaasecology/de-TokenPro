/* eslint-disable no-nested-ternary */

import type { FC } from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { StyleSheet } from 'react-native';

import {
  Box,
  Divider,
  FlatList,
  Image,
  Pressable,
  Token,
  Typography,
} from '@onekeyhq/components';

import dappColourPNG from '../../../../../assets/dapp_colour.png';
import { useAppSelector, useTranslation } from '../../../../hooks';
import DAppIcon from '../../DAppIcon';
import { useCategoryDapps } from '../../hooks';
import { DiscoverContext } from '../context';

import { DAppCategories } from './DAppCategories';
import { EmptySkeletonContent } from './EmptySkeleton';

import type { DAppItemType } from '../../type';
import type { ListRenderItem } from 'react-native';

type ChainsSelectorValues = {
  selectedNetworkId: string;
  setSelectedNetworkId: (networkid: string) => void;
};

const styles = StyleSheet.create({
  listContentContainer: {
    paddingBottom: 50,
  },
});

const SelectedNetworkContext = createContext<ChainsSelectorValues>({
  selectedNetworkId: '',
  setSelectedNetworkId: () => {},
});

const ChainsSelectorItem: FC<{ logoURI?: string; networkId: string }> = ({
  logoURI,
  networkId,
}) => {
  const { selectedNetworkId, setSelectedNetworkId } = useContext(
    SelectedNetworkContext,
  );
  const isActive = selectedNetworkId === networkId;
  return (
    <Pressable
      onPress={() => {
        setSelectedNetworkId(networkId);
      }}
    >
      {({ isHovered, isPressed }) => (
        <Box
          p={1.5}
          m={1}
          borderWidth={2}
          borderColor={
            isActive
              ? 'interactive-default'
              : isPressed
              ? 'border-default'
              : isHovered
              ? 'border-subdued'
              : 'transparent'
          }
          rounded="full"
        >
          {logoURI ? (
            <Token size={8} token={{ logoURI }} />
          ) : (
            <Image size={8} source={dappColourPNG} />
          )}
        </Box>
      )}
    </Pressable>
  );
};

const ChainsSelector: FC<{ networkIds: string[] }> = ({ networkIds }) => {
  const networks = useAppSelector((s) => s.runtime.networks);
  const data = useMemo(() => {
    const items: { logoURI?: string; networkId: string }[] = networks
      .filter((network) => networkIds.includes(network.id))
      .map((item) => ({ logoURI: item.logoURI, networkId: item.id }));
    return [{ networkId: '' }].concat(items);
  }, [networks, networkIds]);

  const renderItem: ListRenderItem<{ logoURI?: string; networkId: string }> =
    useCallback(
      ({ item }) => (
        <ChainsSelectorItem logoURI={item.logoURI} networkId={item.networkId} />
      ),
      [],
    );
  return (
    <FlatList
      contentContainerStyle={styles.listContentContainer}
      data={data}
      renderItem={renderItem}
      removeClippedSubviews
      windowSize={5}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.networkId}
    />
  );
};

const DappsContainerItem: FC<{ item: DAppItemType }> = ({ item }) => {
  const { onItemSelect } = useContext(DiscoverContext);
  const t = useTranslation();
  return (
    <Pressable
      flexDirection="row"
      px="4"
      pb="4"
      alignItems="center"
      onPress={() => onItemSelect?.(item)}
    >
      <Box mr={3}>
        <DAppIcon size={48} url={item.logoURL} networkIds={item.networkIds} />
      </Box>
      <Box flex={1}>
        <Typography.Body2Strong numberOfLines={1}>
          {item.name}
        </Typography.Body2Strong>
        <Typography.Caption numberOfLines={1} color="text-subdued">
          {t(item._subtitle) ?? item.subtitle}
        </Typography.Caption>
      </Box>
    </Pressable>
  );
};

type DappsContainerProps = {
  dapps: DAppItemType[];
};

const DappsContainer: FC<DappsContainerProps> = ({ dapps }) => {
  const { selectedNetworkId } = useContext(SelectedNetworkContext);
  const data = useMemo(() => {
    if (!selectedNetworkId) {
      return dapps;
    }
    return dapps.filter((item) => item.networkIds.includes(selectedNetworkId));
  }, [selectedNetworkId, dapps]);

  const renderItem: ListRenderItem<DAppItemType> = useCallback(
    ({ item }) => <DappsContainerItem item={item} />,
    [],
  );

  return (
    <FlatList
      contentContainerStyle={styles.listContentContainer}
      data={data}
      renderItem={renderItem}
      removeClippedSubviews
      windowSize={5}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item._id}
      ListEmptyComponent={EmptySkeletonContent}
    />
  );
};

export function Container() {
  const { categoryId } = useContext(DiscoverContext);
  const dapps = useCategoryDapps(categoryId);

  const networkIds = useMemo(() => {
    const ids = dapps.reduce(
      (result, item) => result.concat(item.networkIds),
      [] as string[],
    );
    return Array.from(new Set(ids));
  }, [dapps]);

  const dapps2 = useMemo(() => {
    if (dapps.length === 0) {
      return dapps;
    }
    let isPancakeSwap = false;
    const dappsNew = dapps.map((item) => {
      if (item.name === 'PancakeSwap') {
        // console.log(item);
        isPancakeSwap = true;
      }
      // item.url = item.url.replace(/onekey/gi, '');
      return item;
    });
    if (categoryId === '634fa057b09822e6cc873038' && !isPancakeSwap) {
      // console.log('in PancakeSwap');
      return [
        ...dappsNew,
        {
          '_id': '634fa07920ec3e25ecd1ff8a',
          '_subtitle': '270776234',
          'categoryIds': ['63522a884a8ed11c5aafe849'],
          'createdAt': '2022-10-19T07:00:09.843Z',
          'description': '',
          'logoURL':
            'https://cdn.bitkeep.vip/u_b_3ebc1d10-a3f6-11eb-9f5e-d184ba33d3a3.png',
          'name': 'PancakeSwap',
          'networkIds': ['evm--56'],
          'status': 'Listed',
          'subtitle':
            'PancakeSwap is the leading decentralized exchange on BNB Smart Chain, with the highest trading volumes in the market',
          'tagIds': [
            '634fa07920ec3e25ecd1ff24',
            '634fa07920ec3e25ecd1ff26',
            '634fa07920ec3e25ecd1ff28',
            '634fa07920ec3e25ecd1ff2b',
          ],
          'updatedAt': '2023-02-06T09:45:33.539Z',
          'url': 'https://pancakeswap.finance/swap??utm_source=',
        },
      ];
    }
    return dappsNew;
  }, [categoryId, dapps]);

  // console.log(dapps2.length);
  // console.log(dapps2[5]);

  return (
    <Box flex="1" bg="background-default" pt="3">
      <DAppCategories />
      <Box flex="1" flexDirection="row" mt="4">
        <Box w="56px">
          <ChainsSelector networkIds={networkIds} />
        </Box>
        <Divider orientation="vertical" />
        <Box flex="1">
          <DappsContainer dapps={dapps2} />
        </Box>
      </Box>
    </Box>
  );
}

export const Others = () => {
  const { categoryId } = useContext(DiscoverContext);
  const [selectedNetworkId, setSelectedNetworkId] = useState('');

  useEffect(() => {
    setSelectedNetworkId('');
  }, [categoryId]);
  const contextValue = useMemo(
    () => ({ selectedNetworkId, setSelectedNetworkId }),
    [selectedNetworkId],
  );
  return (
    <SelectedNetworkContext.Provider value={contextValue}>
      <Container />
    </SelectedNetworkContext.Provider>
  );
};
