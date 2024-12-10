import { Console, Random } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";

class InputView {
  async getUserMoney() {
    const userMoney = await Console.readLineAsync('구입 금액을 입력해 주세요.\n');

    this.isNumber(userMoney);
    this.isDividedByThounsand(userMoney);

    return Number(userMoney);
  }

  async getWinningNumbers() {
    const winningNumbers = await Console.readLineAsync('당첨 번호를 입력해 주세요.\n');

    this.isNumberAndComma(winningNumbers);

    return winningNumbers;
  }
  
  async getBonusNumber() {
    const bonusNumber = await Console.readLineAsync('보너스 번호를 입력해 주세요.\n');

    this.isNumber(bonusNumber);
    this.isNumberInRange(bonusNumber);

    return Number(bonusNumber);
  }


  isNumber(money) {
    const regex = /^\d+$/;
    const isAllNumbers = regex.test(money);
  
    if (!isAllNumbers) {
      throw new Error('[ERROR] 구입 금액은 자연수로 입력해주세요.');
    }
  }

  isDividedByThounsand(money) {
    const divideMoneyByThounsand = Number(money) % 1000;
    
    if (divideMoneyByThounsand !== 0) {
      throw new Error('[ERROR] 구입 금액은 1000 단위로 입력해주세요.');
    }
  }

  isNumberAndComma(winningNumbers) {
    const regex = /^[\d,]+$/;
    const isAllNumbersAndCommas = regex.test(winningNumbers);

    if (!isAllNumbersAndCommas) {
      throw new Error('[ERROR] 1~45 사이의 자연수와 구분자(,)만 입력해주세요.')
    }
  }

  isNumberInRange(bonusNumber) {
    if (!(bonusNumber >= 1 && bonusNumber <= 45)) {
      throw new Error('[ERROR] 보너스 번호는 1~45 사이의 자연수여야 합니다.')
    }

  }
}

class OutputView {
  printIssuedLottos(purchaseAmount, issuedLottos) {
    Console.print('\n');
    Console.print(`${purchaseAmount}개를 구매했습니다.`)
    const lottosArray = Object.values(issuedLottos);
    lottosArray.map(lotto => Console.print(lotto.getNumbers()));
    Console.print('\n');
  }

  printResult(lottoResult, profitRate) {
    Console.print('\n당첨 통계\n---')
    Console.print(`3개 일치 (5,000원) - ${lottoResult[5]}개`)
    Console.print(`4개 일치 (50,000원) - ${lottoResult[4]}개`)
    Console.print(`5개 일치 (1,500,000원) - ${lottoResult[3]}개`)
    Console.print(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${lottoResult[2]}개`)
    Console.print(`6개 일치 (2,000,000,000원) - ${lottoResult[1]}개`)
    Console.print(`총 수익률은 ${profitRate}%입니다.`);
  }

}

class App {
  issuedLottos = {};


  async run() {
    const inputView = new InputView();
    const outputView = new OutputView();

    const userMoney = await inputView.getUserMoney();
    const purchaseAmount = userMoney / 1000;

    for(let i = 1; i <= purchaseAmount; i++) {
      const numbers = Random.pickUniqueNumbersInRange(1, 45, 6).sort((a, b) => a - b);
      this.issuedLottos[i] = new Lotto(numbers);
    }

    outputView.printIssuedLottos(purchaseAmount, this.issuedLottos);
    
    const winningNumbers = (await inputView.getWinningNumbers()).split(',').map(Number);
    new Lotto(winningNumbers); //validateWinningLotto

    const bonusNumber = await inputView.getBonusNumber();
    this.isBonusNumberInWinningNumbers(winningNumbers, bonusNumber);


    const lottoResult = this.calculateResult(this.issuedLottos, winningNumbers, bonusNumber);
    const prize = this.calculatePrize(lottoResult);
    
    const profitRate = this.calculateProfitRate(userMoney, prize);
    
    outputView.printResult(lottoResult, profitRate);
    
  }

  isBonusNumberInWinningNumbers(winningNumbers, bonusNumber) {
    if (winningNumbers.includes(bonusNumber)) {
      throw new Error('[ERROR] 보너스 번호는 당첨 번호와 중복 될 수 없어요.')
    }
  }

  calculateResult(issuedLottos, winningNumbers, bonusNumber) {
    const lottoResult = {
      1 : 0,
      2 : 0,
      3 : 0,
      4 : 0,
      5 : 0
    }

    const lottosArray = Object.values(issuedLottos);
    lottosArray.map(lotto => {
      const lottoNumbers = lotto.getNumbers()
      const winningMatch = lottoNumbers.filter(number => winningNumbers.includes(number)).length;
      const bonusMatch = lottoNumbers.includes(bonusNumber);

      if (winningMatch === 6) lottoResult[1] += 1;
      if (winningMatch === 5 && bonusMatch) lottoResult[2] += 1;
      if (winningMatch === 5 && !bonusMatch) lottoResult[3] += 1;
      if (winningMatch === 4) lottoResult[4] += 1;
      if (winningMatch === 3) lottoResult[5] +=1;
    });

    return lottoResult;

  }

  calculatePrize(lottoResult) {
    return (lottoResult[1] * 2000000000) +
      (lottoResult[2] * 30000000) +
      (lottoResult[3] * 1500000) +
      (lottoResult[4] * 50000) +
      (lottoResult[5] * 5000) 
  }

  calculateProfitRate(userMoney, prize) {
    return (prize / userMoney).toFixed(1);
  }

}

export default App;