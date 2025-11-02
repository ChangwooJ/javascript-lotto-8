export const INPUT_MESSAGE = Object.freeze({
  PURCHASE_AMOUNT: '구입금액을 입력해 주세요.\n',
  WINNING_NUMBERS: '당첨 번호를 입력해 주세요.\n',
  BONUS_NUMBER: '보너스 번호를 입력해 주세요.\n',
});

export const OUTPUT_MESSAGE = Object.freeze({
  PURCHASE_COUNT: (count) => `\n${count}개를 구매했습니다.`,
});

export const ERROR_MESSAGE = Object.freeze({
  PURCHASE_CASE: {
    MUST_BE_NUMBER: '[ERROR] 금액은 숫자여야 합니다.',
    MUST_BE_POSITIVE_NUMBER: '[ERROR] 금액은 0보다 커야 합니다.',
    MUST_BE_THOUSAND_UNIT: '[ERROR] 금액은 1,000원 단위여야 합니다.',
  },
  LOTTO_CASE: {
    MUST_BE_SIX_NUMBER: '[ERROR] 로또 번호는 6개여야 합니다.',
    MUST_BE_NUMBER: '[ERROR] 당첨 번호는 숫자여야 합니다.',
    MUST_BE_IN_RANGE: '[ERROR] 당첨 번호는 1이상 45이하의 숫자여야 합니다.',
    MUST_BE_UNIQUE: '[ERROR] 당첨 번호는 중복되지 않아야 합니다.',
  },
});
