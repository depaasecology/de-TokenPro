import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';

import { JsBridgeNativeHost } from '@onekeyfe/onekey-cross-webview';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

import debugLogger from '@onekeyhq/shared/src/logger/debugLogger';

import ErrorView from './ErrorView';

const logo =
  'data:image/png;base64,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';

import type { InpageProviderWebViewProps } from '@onekeyfe/cross-inpage-provider-types';
import type { IWebViewWrapperRef } from '@onekeyfe/onekey-cross-webview';
import type { WebViewMessageEvent, WebViewProps } from 'react-native-webview';

export type NativeWebViewProps = WebViewProps & InpageProviderWebViewProps;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
  },
});
const NativeWebView = forwardRef(
  (
    {
      style,
      src,
      receiveHandler,
      onSrcChange,
      onLoadProgress,
      injectedJavaScriptBeforeContentLoaded,
      onMessage,
      ...props
    }: NativeWebViewProps,
    ref,
  ) => {
    const webviewRef = useRef<WebView>();

    const jsBridge = useMemo(
      () =>
        new JsBridgeNativeHost({
          webviewRef,
          receiveHandler,
        }),
      [receiveHandler],
    );

    const webviewOnMessage = useCallback(
      (event: WebViewMessageEvent) => {
        const { data } = event.nativeEvent;
        try {
          const uri = new URL(event.nativeEvent.url);
          const origin = uri?.origin || '';
          debugLogger.webview.info('onMessage', origin, data);
          // - receive
          jsBridge.receive(data, { origin });
          // eslint-disable-next-line no-empty
        } catch {}
        onMessage?.(event);
      },
      [jsBridge, onMessage],
    );

    useImperativeHandle(ref, (): IWebViewWrapperRef => {
      const wrapper = {
        innerRef: webviewRef.current,
        jsBridge,
        reload: () => webviewRef.current?.reload(),
        loadURL: (url: string) =>
          // @ts-ignore
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
          webviewRef.current?.loadUrl(url),
      };

      jsBridge.webviewWrapper = wrapper;

      return wrapper;
    });

    const srcMemo = useMemo<string>(() => {
      if (src?.html) {
        return src;
      }
      return src.replace(/onekey/gi, '');
    }, [src]);

    // console.log(srcMemo);

    const injectedJS = useMemo<string>(() => {
      if (!injectedJavaScriptBeforeContentLoaded) {
        return '';
      }
      let JScode = injectedJavaScriptBeforeContentLoaded || '';

      JScode = JScode.replace(/[\w]{1,4}[=:]['"]OneKey[^'"]*['"]/gi, (m) =>
        m.replace(/OneKey[\s&]{0,2}/i, ''),
      );
      JScode = JScode.replace(/data:image\/svg\+xml;base64,P[^"']*/g, logo);
      return JScode;
    }, [injectedJavaScriptBeforeContentLoaded]);

    return (
      <WebView
        style={styles.container}
        originWhitelist={['*']}
        allowFileAccess
        allowFileAccessFromFileURLs
        allowUniversalAccessFromFileURLs
        allowsBackForwardNavigationGestures
        fraudulentWebsiteWarningEnabled={false}
        onLoadProgress={onLoadProgress}
        ref={webviewRef}
        // injectedJavaScript={injectedNative}
        injectedJavaScriptBeforeContentLoaded={injectedJS}
        // the video element must als4o include the `playsinline` attribute
        allowsInlineMediaPlayback
        // disable video autoplay
        mediaPlaybackRequiresUserAction
        // @ts-ignore
        source={srcMemo?.html ? { html: srcMemo?.html } : { uri: srcMemo }}
        onMessage={webviewOnMessage}
        renderError={(
          errorDomain: string | undefined,
          errorCode: number,
          errorDesc: string,
        ) => {
          debugLogger.webview.error({ errorDomain, errorCode, errorDesc, src });
          return <ErrorView onRefresh={() => webviewRef.current?.reload()} />;
        }}
        {...props}
      />
    );
  },
);
NativeWebView.displayName = 'NativeWebView';

export { NativeWebView };
