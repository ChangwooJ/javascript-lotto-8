import { LottoConfig } from '../constant/config.js';
import { ERROR_MESSAGE } from '../constant/consoleMessage.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== LottoConfig.NUMBER_COUNT) {
      throw new Error(ERROR_MESSAGE.LOTTO_CASE.MUST_BE_SIX_NUMBER);
    }

    numbers.forEach((number) => {
      if (Number.isNaN(number)) {
        throw new Error(ERROR_MESSAGE.LOTTO_CASE.MUST_BE_NUMBER);
      }
      if (
        number < LottoConfig.MIN_LOTTO_NUMBER ||
        number > LottoConfig.MAX_LOTTO_NUMBER
      ) {
        throw new Error(ERROR_MESSAGE.LOTTO_CASE.MUST_BE_IN_RANGE);
      }
    });

    const uniqueNumbers = new Set(numbers);
    if (uniqueNumbers.size !== numbers.length) {
      throw new Error(ERROR_MESSAGE.LOTTO_CASE.MUST_BE_UNIQUE);
    }
  }

  getNumbers() {
    return this.#numbers;
  }
}

export default Lotto;
