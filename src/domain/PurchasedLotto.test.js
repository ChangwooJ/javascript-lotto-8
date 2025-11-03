import PurchasedLotto from './PurchasedLotto.js';
import Lotto from '../Lotto.js';
import { MissionUtils } from '@woowacourse/mission-utils';

describe('PurchasedLotto 클래스 테스트', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('구매 수만큼 로또를 생성하여 보유한다.', () => {
    const lottoCount = 8;

    const returns = [
      [8, 21, 23, 41, 42, 43],
      [3, 5, 11, 16, 32, 38], 
      [7, 11, 16, 35, 36, 44], 
      [1, 8, 11, 31, 41, 42], 
      [13, 14, 16, 38, 42, 45], 
      [7, 11, 30, 40, 42, 43], 
      [2, 13, 22, 32, 38, 45], 
      [1, 3, 5, 14, 22, 45],
    ];

    const pickSpy = jest
      .spyOn(MissionUtils.Random, 'pickUniqueNumbersInRange')
      .mockImplementation(() => returns.shift());

    const purchased = new PurchasedLotto(lottoCount);
    const lottos = purchased.getLottos();

    expect(pickSpy).toHaveBeenCalledTimes(lottoCount);
    expect(lottos.length).toBe(lottoCount);
    lottos.forEach((lotto) => expect(lotto).toBeInstanceOf(Lotto));
  });

  test('각 로또 번호는 6개의 숫자이며 오름차순으로 정렬된다.', () => {
    const lottoCount = 2;

    const unsorted = [
      [6, 1, 3, 5, 2, 4],
      [12, 9, 7, 11, 10, 8],
    ];

    jest
      .spyOn(MissionUtils.Random, 'pickUniqueNumbersInRange')
      .mockImplementation(() => unsorted.shift());

    const purchased = new PurchasedLotto(lottoCount);
    const lottos = purchased.getLottos();

    expect(lottos[0].getNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
    expect(lottos[1].getNumbers()).toEqual([7, 8, 9, 10, 11, 12]);
  });
});
