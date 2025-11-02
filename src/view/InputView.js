import { Console } from '@woowacourse/mission-utils';
import { INPUT_MESSAGE } from '../constant/consoleMessage.js';

const inputView = {
  async inputPurchaseAmount() {
    const input = await Console.readLineAsync(INPUT_MESSAGE.PURCHASE_AMOUNT);
    return input;
  },
};

export default inputView;
