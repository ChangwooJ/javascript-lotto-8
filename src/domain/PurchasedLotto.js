import { MissionUtils } from '@woowacourse/mission-utils';
import Lotto from '../Lotto.js';

class PurchasedLotto {
  #lottos;

  constructor(lottoCount) {
    this.#lottos = Array.from(
      { length: lottoCount },
      () => new Lotto(this.#gernerateLottoNumber())
    );
  }

  #gernerateLottoNumber() {
    const lottoNumber = MissionUtils.Random.pickUniqueNumbersInRange(
      1,
      45,
      6
    ).sort((a, b) => a - b);
    return lottoNumber;
  }

  getLottos() {
    return this.#lottos;
  }
}

export default PurchasedLotto;
