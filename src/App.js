import PurchasedLotto from './domain/PurchasedLotto.js';
import { CalCulateLottoCount } from './util/calculateLottoCount.js';
import { GernerateLottoNumber } from './util/generateLottoNumber.js';
import { validatePurchaseAmount } from './validate/validators.js';
import inputView from './view/inputView.js';
import { OutputView } from './view/outputView.js';

class App {
  async run() {
    while (true) {
      try {
        const input = await inputView.inputPurchaseAmount();
        const amount = validatePurchaseAmount(input);
        const lottoCount = CalCulateLottoCount(amount);
        OutputView.printPurchaseCount(lottoCount);

        const purchasedLotto = new PurchasedLotto(lottoCount);
        const lottos = purchasedLotto.getLottos();
        lottos.forEach((lotto) => {
          OutputView.printPurchaseLottos(lotto.getNumbers());
        });
      } catch (error) {
        console.log(`${error.message}`);
      }
    }
  }
}

export default App;
