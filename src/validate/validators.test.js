import { validatePurchaseAmount, validateBonusNumber } from './validators.js';
import { ERROR_MESSAGE } from '../constant/consoleMessage.js';

describe('validators 테스트', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  
  describe('validatePurchaseAmount 메서드 테스트', () => {
    test('숫자가 아니면 예외를 던진다.', () => {
      expect(() => validatePurchaseAmount('a')).toThrow(
        ERROR_MESSAGE.PURCHASE_CASE.MUST_BE_NUMBER
      );
    });

    test('0 이하이면 예외를 던진다.', () => {
      expect(() => validatePurchaseAmount(0)).toThrow(
        ERROR_MESSAGE.PURCHASE_CASE.MUST_BE_POSITIVE_NUMBER
      );
      expect(() => validatePurchaseAmount(-1000)).toThrow(
        ERROR_MESSAGE.PURCHASE_CASE.MUST_BE_POSITIVE_NUMBER
      );
    });

    test('1000원 단위가 아니면 예외를 던진다.', () => {
      expect(() => validatePurchaseAmount(1234)).toThrow(
        ERROR_MESSAGE.PURCHASE_CASE.MUST_BE_THOUSAND_UNIT
      );
    });

    test('정상 입력이면 숫자형 금액을 반환한다.', () => {
      expect(validatePurchaseAmount('2000')).toBe(2000);
      expect(validatePurchaseAmount(3000)).toBe(3000);
    });
  });

  describe('validateBonusNumber 메서드 테스트', () => {
    const winning = [1, 2, 3, 4, 5, 6];

    test('숫자가 아니면 예외를 던진다.', () => {
      expect(() => validateBonusNumber('a', winning)).toThrow(
        ERROR_MESSAGE.LOTTO_CASE.MUST_BE_NUMBER
      );
    });

    test('당첨 번호와 중복되면 예외를 던진다.', () => {
      expect(() => validateBonusNumber(3, winning)).toThrow(
        ERROR_MESSAGE.LOTTO_CASE.MUST_BE_UNIQUE
      );
    });

    test('1~45 범위를 벗어나면 예외를 던진다.', () => {
      expect(() => validateBonusNumber(0, winning)).toThrow(
        ERROR_MESSAGE.LOTTO_CASE.MUST_BE_IN_RANGE
      );
      expect(() => validateBonusNumber(46, winning)).toThrow(
        ERROR_MESSAGE.LOTTO_CASE.MUST_BE_IN_RANGE
      );
    });

    test('정상 입력이면 숫자형 보너스 번호를 반환한다.', () => {
      expect(validateBonusNumber('7', winning)).toBe(7);
      expect(validateBonusNumber(33, winning)).toBe(33);
    });
  });
});
