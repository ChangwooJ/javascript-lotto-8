export const INPUT_MESSAGE = Object.freeze({
  PURCHASE_AMOUNT: '구입금액을 입력해 주세요.\n',
});

export const ERROR_MESSAGE = Object.freeze({
  PURCHASE_CASE: {
    MUST_BE_NUMBER: '[ERROR] 금액은 숫자여야 합니다.',
    MUST_BE_POSITIVE_NUMBER: '[ERROR] 금액은 0보다 커야 합니다.',
    MUST_BE_THOUSAND_UNIT: '[ERROR] 금액은 1,000원 단위여야 합니다.',
  },
});
