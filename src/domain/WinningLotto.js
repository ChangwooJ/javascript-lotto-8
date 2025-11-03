import { LottoPrice, RANK, winnings } from '../constant/config.js';
import Lotto from '../Lotto.js';

class WinningLotto extends Lotto {
  #winningNumbers;
  #purchasedLotto;
  #bonusNumber;

  constructor(winningNumber, bonusNumber, purchasedLotto) {
    super(winningNumber);
    this.#winningNumbers = winningNumber;
    this.#purchasedLotto = purchasedLotto;
    this.#bonusNumber = Number(bonusNumber);
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

      if (matchCount === 3) summary[RANK.FIFTH] += 1;
      if (matchCount === 4) summary[RANK.FOURTH] += 1;
      if (matchCount === 6) summary[RANK.FIRST] += 1;

      if (matchCount === 5) {
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
    const totalInvestment =
      this.#purchasedLotto.getLottos().length * LottoPrice;
    const ROIValue = (totalReturn / totalInvestment) * 100;
    const ROI = ROIValue.toLocaleString('ko-KR', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    return ROI;
  }
}

export default WinningLotto;
