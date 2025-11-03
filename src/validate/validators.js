import { LottoConfig, LottoPrice } from "../constant/config.js";
import { ERROR_MESSAGE } from "../constant/consoleMessage.js";

export function validatePurchaseAmount(amount) {
  const numAmount = Number(amount);

  if (Number.isNaN(numAmount)) {
    throw new Error(ERROR_MESSAGE.PURCHASE_CASE.MUST_BE_NUMBER);
  }

  if (numAmount <= 0) {
    throw new Error(ERROR_MESSAGE.PURCHASE_CASE.MUST_BE_POSITIVE_NUMBER);
  }

  if (numAmount % LottoPrice !== 0) {
    throw new Error(ERROR_MESSAGE.PURCHASE_CASE.MUST_BE_THOUSAND_UNIT);
  }

  return numAmount;
}

export function validateBonusNumber(bonusNumber, winningNumberArray) {
  const numBonusNumber = Number(bonusNumber);

  if (Number.isNaN(numBonusNumber)) {
    throw new Error(ERROR_MESSAGE.LOTTO_CASE.MUST_BE_NUMBER);
  }
  if (winningNumberArray.includes(numBonusNumber)) {
    throw new Error(ERROR_MESSAGE.LOTTO_CASE.MUST_BE_UNIQUE);
  }
  if (
    numBonusNumber < LottoConfig.MIN_LOTTO_NUMBER ||
    numBonusNumber > LottoConfig.MAX_LOTTO_NUMBER
  ) {
    throw new Error(ERROR_MESSAGE.LOTTO_CASE.MUST_BE_IN_RANGE);
  }

  return numBonusNumber;
}
