import { useRef } from 'react';

import BigNumber from 'bignumber.js';
import { useIntl } from 'react-intl';

import { IconButton, Pressable, Box } from '@onekeyhq/components';
import type { Network } from '@onekeyhq/engine/src/types/network';
import type { IDecodedTx } from '@onekeyhq/engine/src/vaults/types';
import {
  calculateTotalFeeNative,
  calculateTotalFeeRange,
} from '@onekeyhq/engine/src/vaults/utils/feeInfoUtils';
import useFormatDate from '@onekeyhq/kit/src/hooks/useFormatDate';
import platformEnv from '@onekeyhq/shared/src/platformEnv';

import { useClipboard } from '../../../hooks/useClipboard';
import { useNetwork } from '../../../hooks/useNetwork';
import { TxActionElementAddressNormal } from '../elements/TxActionElementAddress';
import { TxActionElementDetailCellTitleText } from '../elements/TxActionElementDetailCell';

import { TxDetailActionBox } from './TxDetailActionBox';
import { TxDetailHashMoreMenu } from './TxDetailHashMoreMenu';

import type { ITxActionElementDetail, ITxActionListViewProps } from '../types';

function getFeeInNativeText(options: {
  network?: Network | null;
  decodedTx: IDecodedTx;
}) {
  const {
    decodedTx: { feeInfo, totalFeeInNative },
    network,
  } = options;
  if (!!totalFeeInNative && !!network) {
    return `${totalFeeInNative} ${network.symbol}`;
  }
  if (!feeInfo || !network) {
    return '--';
  }
  const feeRange = calculateTotalFeeRange(feeInfo);
  const calculatedTotalFeeInNative = calculateTotalFeeNative({
    amount: feeRange.max,
    info: {
      defaultPresetIndex: '0',
      prices: [],

      feeSymbol: network.feeSymbol,
      feeDecimals: network.feeDecimals,
      nativeSymbol: network.symbol,
      nativeDecimals: network.decimals,
    },
  });
  return `${calculatedTotalFeeInNative} ${network.symbol}`;
}

function checkIsValidHistoryTxId({
  txid,
  txidPattern,
}: {
  txid: string | undefined;
  txidPattern: string | undefined;
}) {
  if (!txid) return false;

  if (!txidPattern) return true;

  return new RegExp(txidPattern).test(txid);
}

// TODO rename ExtraInfoBox
export function TxDetailExtraInfoBox(props: ITxActionListViewProps) {
  const formatDate = useFormatDate();
  const { decodedTx, historyTx, feeInput, feeInfo } = props;
  const { network } = useNetwork({ networkId: decodedTx.networkId });
  const details: ITxActionElementDetail[] = [];
  const intl = useIntl();
  const { copyText } = useClipboard();
  const clickTimes = useRef(0);
  // console.log({
  //   // props,
  //   // network,
  //   id: network?.id,
  //   nonce: decodedTx.nonce,
  //   // decodedTx,
  //   // feeInfo,
  // });
  // ？？？ decodedTx.nonce 为0 了
  if (platformEnv.isDev && decodedTx.nonce && decodedTx.nonce >= 0) {
    details.push({
      title: 'Nonce',
      content: `${new BigNumber(decodedTx.nonce).toFixed()}`,
    });
  }
  let fee = {
    title: intl.formatMessage({ id: 'content__fee' }),
    content:
      feeInput ||
      getFeeInNativeText({
        network,
        decodedTx,
      }),
  };
  if (network?.id === 'evm--9000' || decodedTx.feeInfo?.id === 'evm--9000') {
    fee.content = '≈ 0 DE';
  }
  details.push(fee);
  // 为什么这里变成了 undefined  # 猜测 decodedTx.nonce 为0 了
  // console.log(decodedTx.feeInfo?.id);
  // console.log(network?.id);
  // console.log(fee);

  details.push({
    title: intl.formatMessage({ id: 'content__time' }),
    content: decodedTx.createdAt
      ? formatDate.format(
          new Date(decodedTx.createdAt),
          'yyyy年 MMMd日 HH:mm:ss',
          'zh-CN',
        )
      : '--',
  });
  // console.log({
  //   // clickTimes,
  //   // historyTx,
  //   id: decodedTx.txid,
  // });
  if (
    checkIsValidHistoryTxId({
      txid: decodedTx.txid,
      txidPattern: network?.settings.transactionIdPattern,
    })
  ) {
    details.push({
      title: (
        <Pressable
          cursor="default" // not working
          style={{
            // @ts-ignore
            cursor: 'default',
          }}
          onPress={() => {
            clickTimes.current += 1;
            if (clickTimes.current > 5) {
              clickTimes.current = 0;
              copyText(JSON.stringify(historyTx ?? decodedTx, null, 2));
            }
          }}
        >
          <TxActionElementDetailCellTitleText>
            {intl.formatMessage({ id: 'content__hash' })}
          </TxActionElementDetailCellTitleText>
        </Pressable>
      ),
      // content: (
      //   <TxActionElementAddressNormal
      //     address={decodedTx.txid}
      //     isCopy={false}
      //     isLabelShow={false}
      //   />
      // ),
      content: (
        <Pressable
          w="94.5%"
          onPress={() => {
            setTimeout(() => {
              copyText(decodedTx.txid);
            }, 150);
          }}
        >
          <Box>{decodedTx.txid}</Box>
        </Pressable>
      ),
      extra: (
        <TxDetailHashMoreMenu decodedTx={decodedTx}>
          <IconButton
            circle
            type="plain"
            iconSize={18}
            name="EllipsisVerticalOutline"
          />
        </TxDetailHashMoreMenu>
      ),
    });
  }

  if (network?.settings.txExtraInfo) {
    network?.settings.txExtraInfo.forEach((item) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const extraInfo = decodedTx.extraInfo && decodedTx.extraInfo[item.key];
      if (extraInfo !== undefined && extraInfo !== null) {
        details.push({
          title: intl.formatMessage({ id: item.title }),
          content: (
            <TxActionElementAddressNormal
              address={extraInfo}
              isCopy={item.canCopy}
              isLabelShow={false}
              isShorten={item.isShorten}
            />
          ),
        });
      }
    });
  }
  return <TxDetailActionBox details={details} />;
}
