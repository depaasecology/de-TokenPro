import type { FC } from 'react';
import { useMemo } from 'react';

import { useIntl } from 'react-intl';

import { useIsVerticalLayout } from '@onekeyhq/components';

import {
  useActiveWalletAccount,
  useAppSelector,
  useNavigationActions,
} from '../../../hooks';
import ExternalAccountImg from '../../../views/ExternalAccount/components/ExternalAccountImg';

import { BaseSelectorTrigger } from './BaseSelectorTrigger';

import type { INetworkAccountSelectorTriggerProps } from './BaseSelectorTrigger';

interface AccountSelectorTriggerProps
  extends INetworkAccountSelectorTriggerProps {
  showAddress?: boolean;
}

const AccountSelectorTrigger: FC<AccountSelectorTriggerProps> = ({
  showAddress = true,
  type = 'plain',
  bg,
  mode,
}) => {
  const { account, accountDE, networkId } = useActiveWalletAccount();
  const { openAccountSelector } = useNavigationActions();
  const activeExternalWalletName = useAppSelector(
    (s) => s.general.activeExternalWalletName,
  );
  // console.log(networkId);
  // console.log(account);
  // console.log(accountDE);
  const intl = useIntl();
  const activeOption = useMemo(
    () => ({
      label: /EVM #./gim.test(String(account?.name))
        ? account?.name.replace('EVM', 'DE')
        : account?.name,
      // label:
      //   networkId === 'evm--9000'
      //     ? accountDE?.name
      //     : account?.name ||
      //       intl.formatMessage({ id: 'empty__no_account_title' }),
      description:
        (account?.displayAddress || account?.address || '').slice(-4) || '',
      value: account?.id,
    }),
    [
      networkId,
      account?.displayAddress,
      account?.address,
      accountDE?.name,
      account?.id,
      account?.name,
      intl,
    ],
  );
  const isVertical = useIsVerticalLayout();
  // console.log({
  //   // account,
  //   // activeOption
  // });
  return (
    <BaseSelectorTrigger
      type={type}
      bg={bg}
      icon={
        // eslint-disable-next-line no-nested-ternary
        isVertical ? null : account?.id ? (
          <ExternalAccountImg
            accountId={account?.id}
            walletName={activeExternalWalletName}
          />
        ) : null
      }
      label={activeOption.label}
      description={showAddress && activeOption.description}
      onPress={() => {
        openAccountSelector({ mode });
      }}
    />
  );
};

export { AccountSelectorTrigger };
