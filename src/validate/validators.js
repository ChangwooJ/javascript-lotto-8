import { ERROR_MESSAGE } from '../constant/consoleMessage.js';

export function validatePurchaseAmount(amount) {
  const numAmount = Number(amount);

  if (Number.isNaN(numAmount)) {
    throw new Error(ERROR_MESSAGE.PURCHASE_CASE.MUST_BE_NUMBER);
  }

  if (numAmount <= 0) {
    throw new Error(ERROR_MESSAGE.PURCHASE_CASE.MUST_BE_POSITIVE_NUMBER);
  }

  if (numAmount % 1000 !== 0) {
    throw new Error(ERROR_MESSAGE.PURCHASE_CASE.MUST_BE_THOUSAND_UNIT);
  }

  return numAmount;
}
