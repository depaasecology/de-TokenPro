import { TabActions } from '@react-navigation/routers';
import { openURL as LinkingOpenURL } from 'expo-linking';

import platformEnv from '@onekeyhq/shared/src/platformEnv';

import backgroundApiProxy from '../background/instance/backgroundApiProxy';
import { getAppNavigation } from '../hooks/useAppNavigation';
import { ModalRoutes, RootRoutes, TabRoutes } from '../routes/routesEnum';
import { setIncomingUrl } from '../store/reducers/webTabs';

export const openUrlByWebview = (
  url: string,
  title?: string,
  options?: {
    modalMode?: boolean;
  },
) => {
  const navigation = getAppNavigation();
  // console.log({
  //   url,
  //   title,
  //   options,
  //   platformEnv,
  //   navigation,
  // });
  navigation.navigate(RootRoutes.Modal, {
    screen: ModalRoutes.Webview,
    params: {
      url,
      title,
      modalMode: options?.modalMode ?? true,
    },
  });
};

export const openUrl = (
  url: string | any,
  title?: string,
  options?: {
    modalMode?: boolean;
    openWebString?: boolean;
    webString?: string;
  },
) => {
  // console.log({
  //   url,
  //   title,
  //   options,
  //   platformEnv,
  // });
  if (platformEnv.isNative) {
    openUrlByWebview(url, title, options);
  } else if (options?.openWebString) {
    const myWindow = window.open('', '123', 'width: 100%,height: 100%;');
    myWindow?.document.write(options?.webString ?? '');
  } else {
    window.open(url, '_blank');
  }
};

export const openDapp = (url: string) => {
  if (platformEnv.isNative || platformEnv.isDesktop) {
    const navigation = getAppNavigation();
    backgroundApiProxy.dispatch(setIncomingUrl(url));

    navigation?.dispatch(TabActions.jumpTo(TabRoutes.Discover, {}));
  } else {
    window.open(url, '_blank');
  }
};

export const openUrlExternal = (url: string) => {
  if (platformEnv.isNative) {
    // open by OS default browser
    LinkingOpenURL(url);
  } else {
    window.open(url, '_blank');
  }
};
