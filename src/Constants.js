const MESSAGES = Object.freeze({
    INPUT: {
        ASK_USER_MONEY: '구입 금액을 입력해 주세요.\n',
        ASK_WINNING_NUMBERS: '당첨 번호를 입력해 주세요.\n',
        // ASK_BONUS_NUMBER: '보너스 번호를 입력해 주세요.\n',
    },
    OUTPUT: {
        
    },
    ERROR: {
        NOT_A_NUMBER: '[ERROR] 숫자만 입력해 주세요!',
        EMPTY_INPUT: '[ERROR] 입력 값이 없어요!',
        NEGATIVE_AMOUNT: '[ERROR] 자연수만 입력해 주세요!',
        MONEY_NOT_DIVISIBLE_BY_THOUSAND: '[ERROR] 구입 금액은 1000원 단위로 입력해 주세요!',
        CANNOT_BUY_OVER_LIMIT: '[ERROR] 한 번에 10만원까지만 구입할 수 있어요!',
        NUMBER_OUT_OF_RANGE: '[ERROR] 1~45 범위 안의 숫자를 입력해 주세요!',
        HAS_DUPLICATES: '[ERROR] 중복된 숫자를 입력했어요!',
        NOT_SIX_NUMBERS: '[ERROR] 6개의 숫자를 입력해 주세요! 쉼표(,)로 구분.',
    },
});

const GENERALS = Object.freeze({
    LOTTO_PRICE: 1000,
    LOTTO_BUY_LIMIT: 100000,
    LOTTO_MIN_NUMBER: 1,
    LOTTO_MAX_NUMBER: 45,
});

export { MESSAGES, GENERALS };