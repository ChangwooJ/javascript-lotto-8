import Lotto from './domain/Lotto.js';
import PurchasedLotto from './domain/PurchasedLotto.js';
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
        const winningNumbersArray = inputWinningNumber.split(',');
        const winningNumber = new Lotto(winningNumbersArray);
      } catch (error) {
        console.log(`${error.message}`);
      }
    }
  }
}

export default App;
