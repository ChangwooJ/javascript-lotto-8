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
        const inputAmount = await inputView.inputPurchaseAmount();
        const amount = validatePurchaseAmount(inputAmount);
        const lottoCount = CalCulateLottoCount(amount);
        OutputView.printPurchaseCount(lottoCount);

        const purchasedLotto = new PurchasedLotto(lottoCount);
        const lottos = purchasedLotto.getLottos();
        lottos.forEach((lotto) => {
          OutputView.printPurchaseLottos(lotto.getNumbers());
        });

        const inputWinningNumber = await inputView.inputWinningNumber();
        const inputBonusNumber = await inputView.inputBonusNumber();
        const winningNumber = new WinningLotto(
          inputWinningNumber,
          inputBonusNumber,
          purchasedLotto
        );
        const { summary, ROI } = winningNumber.getResult();
        OutputView.printResultHeader();
        for (const rank of Object.values(RANK)) {
          OutputView.printWinningResult(rank, summary[rank]);
        }
        OutputView.printROI(ROI);
      } catch (error) {
        console.log(`${error.message}`);
      }
    }
  }
}

export default App;
