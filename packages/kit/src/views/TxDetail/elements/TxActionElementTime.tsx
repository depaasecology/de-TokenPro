import type { ComponentProps } from 'react';
import { useMemo } from 'react';

import { Text } from '@onekeyhq/components';

import useFormatDate from '../../../hooks/useFormatDate';

function TxActionElementTime(
  props: { timestamp?: number; isShort?: boolean } & ComponentProps<
    typeof Text
  >,
) {
  const { timestamp, isShort, ...others } = props;
  const formatDate = useFormatDate();

  const time = useMemo(() => {
    if (!timestamp) {
      return '';
    }
    const date = new Date(timestamp);
    if (isShort) {
      return formatDate.format(new Date(date), 'MMMd日 HH:mm:ss', 'zh-CN');
    }
    return date.toLocaleString();
  }, [formatDate, isShort, timestamp]);
  return <Text {...others}>{time}</Text>;
}

export { TxActionElementTime };
