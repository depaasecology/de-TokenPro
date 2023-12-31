import type { FC } from 'react';
import { useMemo } from 'react';

import type { IDecodedTx } from '@onekeyhq/engine/src/vaults/types';

import { useClipboard } from '../../../hooks/useClipboard';
import { useNetwork } from '../../../hooks/useNetwork';
import useOpenBlockBrowser from '../../../hooks/useOpenBlockBrowser';
import useOpenBlockBrowserDE from '../../../hooks/useOpenBlockBrowser';
import BaseMenu from '../../Overlay/BaseMenu';

import type { IBaseMenuOptions, IMenu } from '../../Overlay/BaseMenu';

type Props = {
  decodedTx: IDecodedTx;
};
const TxDetailHashMoreMenu: FC<IMenu & Props> = (props) => {
  const { decodedTx } = props;
  const { copyText } = useClipboard();
  const { network } = useNetwork({ networkId: decodedTx.networkId });
  const openBlockBrowser = useOpenBlockBrowser(network);
  // console.log({
  //   decodedTx,
  //   copyText,
  //   network,
  // });
  const options = useMemo(() => {
    const baseOptions: IBaseMenuOptions = [
      // {
      //   id: 'action_copy_hash',
      //   onPress: () => setTimeout(() => copyText(decodedTx.txid), 200),
      //   icon: 'Square2StackOutline',
      // },
      (openBlockBrowser.hasAvailable || decodedTx.networkId.includes('evm--9000')) && {
        id: 'action__view_in_browser',
        onPress: () => {
          if (decodedTx.networkId.includes('evm--9000')) {
            openBlockBrowser.openTransactionDetailsDE(decodedTx.txid)
          } else {
            openBlockBrowser.openTransactionDetails(decodedTx.txid)
          }
        },
        icon: 'ArrowTopRightOnSquareOutline',
      },
    ];
    return baseOptions;
  }, [copyText, decodedTx.txid, openBlockBrowser]);

  return <BaseMenu options={options} {...props} />;
};

export { TxDetailHashMoreMenu };
