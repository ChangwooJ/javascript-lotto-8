import { RANK } from './constant/config.js';
import PurchasedLotto from './domain/PurchasedLotto.js';
import WinningLotto from './domain/WinningLotto.js';
import { CalCulateLottoCount } from './util/calculateLottoCount.js';
import { validatePurchaseAmount } from './validate/validators.js';
import inputView from './view/inputView.js';
import { OutputView } from './view/outputView.js';

class App {
  async run() {
    while (true) {
      try {
        const amount = await this.#getPurchaseAmount();
        const lottoCount = CalCulateLottoCount(amount);
        const purchasedLotto = this.#printPurchasedLottos(lottoCount);

        const winningNumber = await this.#getValidatedWinningNumbers();
        const bonusNumber = await this.#getValidatedBonusNumber();

        this.#printWinningResults(winningNumber, bonusNumber, purchasedLotto);
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  async #getPurchaseAmount() {
    while (true) {
      try {
        const input = await inputView.inputPurchaseAmount();
        return validatePurchaseAmount(input);
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  async #getValidatedWinningNumbers() {
    while (true) {
      try {
        return await inputView.inputWinningNumber();
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  async #getValidatedBonusNumber() {
    while (true) {
      try {
        return await inputView.inputBonusNumber();
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  #printPurchasedLottos(count) {
    const purchasedLotto = new PurchasedLotto(count);
    OutputView.printPurchaseCount(count);

    purchasedLotto.getLottos().forEach((lotto) => {
      OutputView.printPurchaseLottos(lotto.getNumbers());
    });

    return purchasedLotto;
  }

  #printWinningResults(winningNumber, bonusNumber, purchasedLotto) {
    const winningLotto = new WinningLotto(
      winningNumber,
      bonusNumber,
      purchasedLotto
    );
    const { summary, ROI } = winningLotto.getResult();

    OutputView.printResultHeader();
    for (const rank of Object.values(RANK)) {
      OutputView.printWinningResult(rank, summary[rank]);
    }
    OutputView.printROI(ROI);
  }
}

export default App;
