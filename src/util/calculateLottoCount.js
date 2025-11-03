import { LottoPrice } from "../constant/config.js";

export function calculateLottoCount(amount) {
  const lottoCount = amount / LottoPrice;
  return lottoCount;
}
