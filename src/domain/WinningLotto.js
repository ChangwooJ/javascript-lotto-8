import { LottoConfig, RANK, winnings } from '../constant/config.js';
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
    this.#winningNumbers = winningNumberArray;
    this.#purchasedLotto = purchasedLotto;
    this.#bonusNumber = Number(bonusNumber);
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
      const lottoNumbers = lotto.getNumbers();
      const matchingLotto = lottoNumbers.filter((lottoNumber) =>
        this.#winningNumbers.includes(lottoNumber)
      );
      results.push({ lottoNumbers, matchingLotto });
    });

    const summary = this.#getSummary(results);
    const ROI = this.#getROI(summary);

    return { summary, ROI };
  }

  #getSummary(results) {
    const summary = {
      [RANK.FIFTH]: 0,
      [RANK.FOURTH]: 0,
      [RANK.THIRD]: 0,
      [RANK.SECOND]: 0,
      [RANK.FIRST]: 0,
    };

    results.forEach(({ lottoNumbers, matchingLotto }) => {
      const matchCount = matchingLotto.length;

      if (matchCount === RANK.FIFTH) summary[RANK.FIFTH] += 1;
      if (matchCount === RANK.FOURTH) summary[RANK.FOURTH] += 1;
      if (matchCount === RANK.FIRST) summary[RANK.FIRST] += 1;

      if (matchCount === RANK.THIRD) {
        console.log(lottoNumbers);
        const hasBonus = lottoNumbers.includes(this.#bonusNumber);
        if (hasBonus) summary[RANK.SECOND] += 1;
        else summary[RANK.THIRD] += 1;
      }
    });

    return summary;
  }

  #getROI(summary) {
    let totalReturn = 0;
    for (const rank in summary) {
      totalReturn += summary[rank] * winnings[rank];
    }
    const ROIValue =
      (totalReturn / this.#purchasedLotto.getLottos().length) * 100;
    const ROI = Number(ROIValue.toFixed(2));
    return ROI;
  }
}

export default WinningLotto;
