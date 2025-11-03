import WinningLotto from './WinningLotto.js';
import Lotto from '../Lotto.js';
import { RANK, LottoPrice, winnings } from '../constant/config.js';

describe('WinningLotto 클래스 테스트', () => {
  const makeLotto = (numbers) => new Lotto(numbers);
  
  test('당첨 결과를 계산하고 요약 결과와 ROI를 반환한다.', () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    const lottos = [
      makeLotto([1, 2, 3, 4, 5, 6]),  // 1등: 6개 일치
      makeLotto([1, 2, 3, 4, 5, 7]),  // 2등: 5개 + 보너스
      makeLotto([1, 2, 3, 4, 5, 8]),  // 3등: 5개 일치 (보너스 없음)
      makeLotto([1, 2, 3, 4, 9, 10]),  // 4등: 4개 일치
      makeLotto([1, 2, 3, 11, 12, 13]),  // 5등: 3개 일치
      makeLotto([20, 21, 22, 23, 24, 25]),  // 낙첨: 0-2개 일치
    ];

    const purchasedLotto = { getLottos: () => lottos };

    const app = new WinningLotto(winningNumbers, bonusNumber, purchasedLotto);
    const { summary, ROI } = app.getResult();

    expect(summary).toEqual({
      [RANK.FIFTH]: 1,
      [RANK.FOURTH]: 1,
      [RANK.THIRD]: 1,
      [RANK.SECOND]: 1,
      [RANK.FIRST]: 1,
    });

    // 총 수익
    const totalReturn =
      1 * winnings[RANK.FIRST] +
      1 * winnings[RANK.SECOND] +
      1 * winnings[RANK.THIRD] +
      1 * winnings[RANK.FOURTH] +
      1 * winnings[RANK.FIFTH];
    
    // 총 투자 금액
    const totalInvestment = lottos.length * LottoPrice;

    // 수익률
    const expectedROI = ((totalReturn / totalInvestment) * 100).toLocaleString('ko-KR', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });

    expect(ROI).toBe(expectedROI);
  });

  test('당첨이 하나도 없으면 모든 카운트는 0이고 ROI는 0.0이어야한다.', () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    const lottos = [
      makeLotto([8, 9, 10, 11, 12, 13]),
      makeLotto([14, 15, 16, 17, 18, 19]),
    ];
    const purchasedLotto = { getLottos: () => lottos };

    const app = new WinningLotto(winningNumbers, bonusNumber, purchasedLotto);
    const { summary, ROI } = app.getResult();

    expect(summary).toEqual({
      [RANK.FIFTH]: 0,
      [RANK.FOURTH]: 0,
      [RANK.THIRD]: 0,
      [RANK.SECOND]: 0,
      [RANK.FIRST]: 0,
    });

    expect(ROI).toBe('0.0');
  });
});
