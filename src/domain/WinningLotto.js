import { LottoConfig } from '../constant/config.js';
import { ERROR_MESSAGE } from '../constant/consoleMessage.js';
import Lotto from './Lotto.js';

class WinningLotto extends Lotto {
  #winningNumbers;
  #purchasedLotto;
  #bonusNumber;

  constructor(numbers, bonusNumber, purchasedLotto) {
    const winningNumberArray = WinningLotto.parsingNumbers(numbers);
    super(winningNumberArray);
    this.#validateBonus(bonusNumber, winningNumberArray);
    this.#winningNumbers = winningNumberArray + bonusNumber;
    this.#purchasedLotto = purchasedLotto;
    this.bonusNumber = bonusNumber;
  }

  static parsingNumbers(winningNumberArray) {
    const numbersArray = winningNumberArray
      .split(',')
      .map((number) => Number(number.trim()));

    return numbersArray;
  }

  #validateBonus(bonusNumber, winningNumberArray) {
    if (Number.isNaN(bonusNumber)) {
      throw new Error(ERROR_MESSAGE.LOTTO_CASE.MUST_BE_NUMBER);
    }
    if (winningNumberArray.includes(bonusNumber)) {
      throw new Error(ERROR_MESSAGE.LOTTO_CASE.MUST_BE_UNIQUE);
    }
    if (
      bonusNumber < LottoConfig.MIN_LOTTO_NUMBER ||
      bonusNumber > LottoConfig.MAX_LOTTO_NUMBER
    ) {
      throw new Error(ERROR_MESSAGE.LOTTO_CASE.MUST_BE_IN_RANGE);
    }
  }

  getResult() {
    const results = [];
    const myLottos = this.#purchasedLotto.getLottos();

    myLottos.forEach((lotto) => {
      const matchingLotto = lotto
        .getNumbers()
        .filter((lottoNumber) => this.#winningNumbers.includes(lottoNumber));
      results.push(matchingLotto);
    });

    const summary = this.#getSummary(results);

    return summary;
  }

  #getSummary(results) {
    const summary = Array(7).fill(0);
    results.forEach((result) => {
      if (result.length >= 3 && result.length <= 5) {
        summary[result.length] = (summary[result.length] || 0) + 1;
      }
      if (result.length === 6) {
        summary[this.#determineRank(result)] =
          (summary[this.#determineRank(result)] || 0) + 1;
      }
    });

    return summary;
  }

  #determineRank(result) {
    if (result.includes(this.#bonusNumber)) {
      return 5;
    }
    return 6;
  }
}

export default WinningLotto;
