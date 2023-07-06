import type { INetwork } from '@onekeyhq/engine/src/types';
import { CHAINS_DISPLAYED_IN_DEV } from '@onekeyhq/shared/src/engine/engineConsts';
import platformEnv from '@onekeyhq/shared/src/platformEnv';

import logoUrl from '@onekeyhq/kit/src/utils/data/logoUrl';

import { makeSelector } from './redux';

export type IManageNetworks = {
  allNetworks: INetwork[];
  enabledNetworks: INetwork[];
};

const emptyArray = Object.freeze([]);


const DEToken = {
  "id": "evm--9000",
  "name": "DE",
  "impl": "evm",
  "symbol": "DE",
  "logoURI": logoUrl.DE,
  "enabled": true,
  "feeSymbol": "Gwei",
  "decimals": 18,
  "feeDecimals": 9,
  "balance2FeeDecimals": 9,
  "rpcURL": "http://dechain13.depaas.net:8545",
  "explorerURL": "127.0.0.1/",
  "shortName": "DE",
  "shortCode": "",
  "preset": false,
  "isTestnet": false,
  "nativeDisplayDecimals": 6,
  "tokenDisplayDecimals": 4,
  "extraInfo": {
    "chainId": "0x2328",
    "networkVersion": "9000"
  },
  "accountNameInfo": {
    "default": {
      "prefix": "EVM",
      "category": "44'/60'",
      "template": "m/44'/60'/0'/0/$$INDEX$$",
      "coinType": "60",
      "label": {
        "id": "form__bip44_standard"
      },
      "desc": {
        "id": "form__bip44_standard_desc"
      },
      "recommended": true
    },
    "etcNative": {
      "prefix": "ETC-Native",
      "category": "44'/61'",
      "template": "m/44'/61'/0'/0/$$INDEX$$",
      "coinType": "61",
      "label": {
        "id": "form__bip44_standard_cointype_61"
      }
    },
    "ledgerLive": {
      "prefix": "Ledger Live",
      "category": "44'/60'",
      "template": "m/44'/60'/$$INDEX$$'/0/0",
      "coinType": "60",
      "label": "Ledger Live"
    }
  },
  "blockExplorerURL": {
    "name": "127.0.0.1/",
    "address": "127.0.0.1/#/address?addressId={address}",
    "block": "127.0.0.1/block/{block}",
    "transaction": "127.0.0.1/transaction/{transaction}"
  },
  "settings": {
    "feeInfoEditable": true,
    "privateKeyExportEnabled": true,
    "tokenEnabled": true,
    "txCanBeReplaced": true,
    "importedAccountEnabled": true,
    "hardwareAccountEnabled": true,
    "externalAccountEnabled": true,
    "watchingAccountEnabled": true,
    "isUTXOModel": false,
    "subNetworkSettings": {
      "evm--86": {
        "isIntegerGasPrice": true
      }
    },
    "supportDeflationary": true,
    "supportFilterScam": true,
    "supportBatchTransfer": true,
    "batchTokenTransferApprovalRequired": true,
    "accountNameInfo": {
      "default": {
        "prefix": "EVM",
        "category": "44'/60'",
        "template": "m/44'/60'/0'/0/$$INDEX$$",
        "coinType": "60",
        "label": {
          "id": "form__bip44_standard"
        },
        "desc": {
          "id": "form__bip44_standard_desc"
        },
        "recommended": true
      },
      "etcNative": {
        "prefix": "ETC-Native",
        "category": "44'/61'",
        "template": "m/44'/61'/0'/0/$$INDEX$$",
        "coinType": "61",
        "label": {
          "id": "form__bip44_standard_cointype_61"
        }
      },
      "ledgerLive": {
        "prefix": "Ledger Live",
        "category": "44'/60'",
        "template": "m/44'/60'/$$INDEX$$'/0/0",
        "coinType": "60",
        "label": "Ledger Live"
      }
    }
  }
}


export const { use: useManageNetworks, get: getManageNetworks } =
  makeSelector<IManageNetworks>((selector, { useMemo }) => {
    const devModeEnable = selector((s) => s.settings.devMode)?.enable;
    const networks = selector((s) => s.runtime.networks) ?? emptyArray;

    const [allNetworks, enabledNetworks] = useMemo(() => {
      const chainsToHide = devModeEnable ? [] : CHAINS_DISPLAYED_IN_DEV;

      const all = networks.filter(
        (network) =>
          !chainsToHide.includes(network.impl) &&
          (platformEnv.isExtension
            ? !network.settings.disabledInExtension
            : true),
      );
      let enabled = all.filter((network) => network.enabled);

      enabled = enabled.filter((e) => e.id !== 'evm--undefined')
      
      const subscript = enabled.findIndex((e) => e.id === 'evm--9000')
      if (subscript !== -1) {
        enabled.splice(subscript, 1);
        enabled.splice(2, 0, DEToken);
      }
      return [all, enabled];
    }, [devModeEnable, networks]);

    return {
      allNetworks,
      enabledNetworks,
    };
  });
