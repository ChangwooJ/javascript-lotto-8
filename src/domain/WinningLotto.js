import { LottoConfig } from '../constant/config.js';
import { ERROR_MESSAGE } from '../constant/consoleMessage.js';
import Lotto from './Lotto.js';

class WinningLotto extends Lotto {
  #bonusNumber;

  constructor(numbers, bonusNumber) {
    const winningNumbers = WinningLotto.parsingNumbers(numbers);
    super(winningNumbers);
    this.#validateBonus(bonusNumber, winningNumbers);
    this.#bonusNumber = bonusNumber;
  }

  static parsingNumbers(winningNumbers) {
    const numbersArray = winningNumbers
      .split(',')
      .map((number) => Number(number.trim()));

    return numbersArray;
  }

  #validateBonus(bonusNumber, winningNumbers) {
    if (Number.isNaN(bonusNumber)) {
      throw new Error(ERROR_MESSAGE.LOTTO_CASE.MUST_BE_NUMBER);
    }
    if (winningNumbers.includes(bonusNumber)) {
      throw new Error(ERROR_MESSAGE.LOTTO_CASE.MUST_BE_UNIQUE);
    }
    if (
      bonusNumber < LottoConfig.MIN_LOTTO_NUMBER ||
      bonusNumber > LottoConfig.MAX_LOTTO_NUMBER
    ) {
      throw new Error(ERROR_MESSAGE.LOTTO_CASE.MUST_BE_IN_RANGE);
    }
  }

  getBonusNumber() {
    return this.#bonusNumber;
  }
}

export default WinningLotto;
