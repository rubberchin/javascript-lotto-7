class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    const removeDuplicates = new Set(numbers)
    if (removeDuplicates.size !== numbers.length) {
      throw new Error('[ERROR] 로또 번호는 중복되지 않는 6개의 숫자여야 합니다.');
    }

    if (numbers.length !== 6) {
      throw new Error('[ERROR] 로또 번호는 6개여야 합니다.');
    }

    const isNumberInRange = numbers.every(number => (number >= 1 && number <= 45))
    if (!isNumberInRange) {
      throw new Error('[ERROR] 로또 번호는 1~45 사이의 자연수여야 합니다.')
    }
  }

  getNumbers() {
    return this.#numbers;
  }

  // TODO: 추가 기능 구현
}

export default Lotto;
