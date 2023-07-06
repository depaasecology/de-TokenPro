import type { FC } from 'react';
import { useState, useMemo, useCallback } from 'react';

import { Flex } from 'native-base';
import { useIntl } from 'react-intl';

import {
  Box,
  Button,
  MnemonicCard,
  Text,
  Center,
  useIsVerticalLayout,
  ToastManager,
} from '@onekeyhq/components';

import { wait } from '../../../../../utils/helper';

import type { IBoxProps } from 'native-base';

type PhraseSheetProps = {
  onPressSavedPhrase?: () => void;
  mnemonic: string;
} & IBoxProps;

const VerifyMnemonic: FC<PhraseSheetProps> = ({
  onPressSavedPhrase,
  mnemonic,
  ...rest
}) => {
  const intl = useIntl();
  const isVerticalLayout = useIsVerticalLayout();

  const onPressSavedPhrasePromise = useCallback(async () => {
    onPressSavedPhrase?.();
    await wait(3000);
  }, [onPressSavedPhrase]);

  // console.log({
  //   mnemonic,
  //   // onPressSavedPhrase,
  //   // rest,
  //   // isVerticalLayout,
  // });

  const [generatedMnemonic] = useState<string[]>(() => {
    const mnemonicArr = mnemonic.split(' ');
    return mnemonicArr;
  });

  // const [mnemonicBtns, setMnemonicBtns] = useState<string[]>(() => {
  //   const mnemonicArr = mnemonic.split(' ').sort(() => Math.random() - 0.5);
  //   // mnemonicArr.pop();
  //   // mnemonicArr.pop();
  //   // mnemonicArr.push('investinvestinvestinvest');
  //   // mnemonicArr.push('');
  //   return mnemonicArr;
  // });
  // const [mnemonicSelected, setMnemonicSelected] = useState<string[]>([]);

  const num: number = 4 // 需要的随机数个数
  const arrayItemLen: number = 4 // 二维数组子项长度

  // 随机数数组
  const [mnemonicRandomNum] = useState<number[]>(() => {
    let result: number[] = []
    let testNum: number = (generatedMnemonic.length || 12) / num;
    for(let i = 0; i <= testNum; i++) {
      result.push(Math.floor(Math.random() * testNum + i * testNum))
    }
    console.log('mnemonicInfo', generatedMnemonic)
    return result;
  });

  // 随机助记词数组（二维数组）
  const mnemonicRandomArray = useMemo(() => {
    let result = []
    for (const number of mnemonicRandomNum) {
      let array = generatedMnemonic.filter(item => item !== generatedMnemonic[number])
      let random = Math.floor(Math.random() * mnemonicRandomNum.length)
      let resultItem = []
      for (let i = 0; i < arrayItemLen; i++) {
        if(i === random) {
          resultItem.push(generatedMnemonic[number])
        } else {
          let testNum = Math.floor(Math.random() * array.length)
          resultItem.push(array[testNum])
          array.splice(testNum, 1)
        }
      }
      result.push(resultItem)
    }
    return result;
  }, [mnemonicRandomNum, generatedMnemonic])

  const [selectArray, setSelectArray] = useState<string []>([]) //选中的助记词列表

  // const selectedMnemonic = useCallback((index: number) => {
  //   setMnemonicBtns((item) => {
  //     const arr = [...item];
  //     const str = arr.splice(index, 1)[0];
  //     setMnemonicSelected((item2) => item2.concat(str));
  //     return arr;
  //   });
  // }, []);

  // const delSelectedMnemonic = useCallback((str: string, index: number) => {
  //   setMnemonicBtns((item) => item.concat(str));
  //   setMnemonicSelected((item) => {
  //     const arr = [...item];
  //     arr.splice(index, 1);
  //     return arr;
  //   });
  // }, []);

  const clickMnemonic = (content: string, index: number) => {
    let newArr: string[] = selectArray.slice()
    newArr[index] = content
    setSelectArray(newArr)
  }

  // 点击"下一步"（校验选中的助记词是否正确）
  const handleCheckMnemonic = () => {
    let checkNum = 0
    for (let i = 0; i < selectArray.length; i++) {
      if(selectArray[i] === generatedMnemonic[mnemonicRandomNum[i]]) {
        checkNum++
      }
    }
    isGeneratedMnemonic(generatedMnemonic, checkNum && checkNum === selectArray.length ? generatedMnemonic : [])
  }

  const isGeneratedMnemonic = useCallback(
    (_generatedMnemonic: string[], _mnemonicSelected: string[]) => {
      // onPressSavedPhrasePromise(); //test2
      // 校验成功的时候调用
      if (_generatedMnemonic.toString() === _mnemonicSelected.toString()) {
        onPressSavedPhrasePromise();
      } else {
        ToastManager.show(
          {
            title: intl.formatMessage({
              id: 'tip_mnemonic_wrong',
            }),
          },
          { type: 'error' },
        );
      }
    },
    [intl, onPressSavedPhrasePromise],
  );

  return (
    <>
      <Box>
        {
          mnemonicRandomArray.map((mItem, mIndex) => {
            return (
              <Box key={mIndex}>
                <Box>
                  {intl.formatMessage({ id: 'select_mnemonic' }, { 'num': mnemonicRandomNum[mIndex] + 1 })}
                </Box>
                <Flex flexDir={'row'} justifyContent={'space-between'} mt={'12px'} mb={'12px'}>
                  {
                    mItem.map((item, index) => {
                      return (
                        <Button
                          key={index}
                          type={selectArray[mIndex] && selectArray[mIndex] === item ? 'primary' : 'basic'}
                          w='23%'
                          pl={'2px'}
                          pr={'2px'}
                          onPress={() => clickMnemonic(item, mIndex)}
                        >
                          {item}
                        </Button>
                      )
                    })
                  }
                </Flex>
              </Box>
            )
          })
        }
      </Box>
      {/*<Box*/}
      {/*  minH="190px"*/}
      {/*  pt={2}*/}
      {/*  mb={4}*/}
      {/*  borderRadius="md"*/}
      {/*  borderWidth="1"*/}
      {/*  borderColor="#000:alpha.40"*/}
      {/*  mt={-4}*/}
      {/*>*/}
      {/*  <Flex flexDir="row" flexWrap="wrap">*/}
      {/*    {mnemonicSelected.map((item, index) => (*/}
      {/*      <Button*/}
      {/*        onPress={() => {*/}
      {/*          delSelectedMnemonic(item, index);*/}
      {/*        }}*/}
      {/*        key={`id1${item}`}*/}
      {/*        w="30.5%"*/}
      {/*        maxW="30.5%"*/}
      {/*        ml="2%"*/}
      {/*        mb={2}*/}
      {/*      >*/}
      {/*        {item}*/}
      {/*      </Button>*/}
      {/*    ))}*/}
      {/*  </Flex>*/}
      {/*</Box>*/}
      {/*<Box*/}
      {/*  minH="190px"*/}
      {/*  pt={2}*/}
      {/*  mb={4}*/}
      {/*  borderRadius="md"*/}
      {/*  borderWidth="1"*/}
      {/*  borderColor="#000:alpha.40"*/}
      {/*>*/}
      {/*  <Flex flexDir="row" flexWrap="wrap">*/}
      {/*    {mnemonicBtns.map((item, index) => (*/}
      {/*      <Button*/}
      {/*        onPress={() => {*/}
      {/*          selectedMnemonic(index);*/}
      {/*        }}*/}
      {/*        key={`id2${item}`}*/}
      {/*        w="30.5%"*/}
      {/*        maxW="30.5%"*/}
      {/*        ml="2%"*/}
      {/*        mb={2}*/}
      {/*      >*/}
      {/*        {item}*/}
      {/*      </Button>*/}
      {/*    ))}*/}
      {/*  </Flex>*/}
      {/*</Box>*/}
      <Button
        type="primary"
        size={isVerticalLayout ? 'xl' : 'base'}
        onPress={handleCheckMnemonic}
      >
        {intl.formatMessage({
          id: 'action__next',
        })}
      </Button>
    </>
  );
};

export default VerifyMnemonic;
