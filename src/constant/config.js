export const LottoPrice = 1000;
export const LottoConfig = {
  NUMBER_COUNT: 6,
  MIN_LOTTO_NUMBER: 1,
  MAX_LOTTO_NUMBER: 45,
};
export const RANK = Object.freeze({
  FIFTH: 'FIFTH',
  FOURTH: 'FOURTH',
  THIRD: 'THIRD',
  SECOND: 'SECOND',
  FIRST: 'FIRST',
});
export const winnings = {
  [RANK.FIFTH]: 5000,
  [RANK.FOURTH]: 50000,
  [RANK.THIRD]: 1500000,
  [RANK.SECOND]: 30000000,
  [RANK.FIRST]: 2000000000,
};
