import { LottoPrice } from '../constant/config.js';

export function CalCulateLottoCount(amount) {
  const lottoCount = amount / LottoPrice;
  return lottoCount;
}
