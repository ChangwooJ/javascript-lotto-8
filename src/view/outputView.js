import { Console } from '@woowacourse/mission-utils';
import { OUTPUT_MESSAGE } from '../constant/consoleMessage.js';

export const OutputView = {
  printPurchaseCount(count) {
    Console.print(OUTPUT_MESSAGE.PURCHASE_COUNT(count));
  },
  printPurchaseLottos(lotto) {
    Console.print(lotto);
  },
};
