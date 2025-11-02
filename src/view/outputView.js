import { Console } from '@woowacourse/mission-utils';
import { OUTPUT_MESSAGE } from '../constant/consoleMessage.js';

export const OutputView = {
  printPurchaseCount(count) {
    Console.print(OUTPUT_MESSAGE.PURCHASE_COUNT(count));
  },
  printPurchaseLottos(lotto) {
    Console.print(lotto);
  },
  printResultHeader() {
    Console.print(OUTPUT_MESSAGE.RESULT_HEADER);
  },
  printWinningResult(matchedNumber, count) {
    Console.print(OUTPUT_MESSAGE.RESULT(matchedNumber, count));
  },
  printROI(ROI) {
    Console.print(OUTPUT_MESSAGE.ROI(ROI));
  },
};
