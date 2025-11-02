import { validatePurchaseAmount } from './validate/validators.js';
import inputView from './view/inputView.js';

class App {
  async run() {
    while (true) {
      try {
        const input = await inputView.inputPurchaseAmount();
        const amount = validatePurchaseAmount(input);
        return amount;
      } catch (error) {
        console.log(`[ERROR] ${error.message}`);
      }
    }
  }
}

export default App;
