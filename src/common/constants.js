const title = Object.freeze({
    NONE: '',
    MR: 'Mr.',
    MRS: 'Mrs.',
    MS: 'Ms.',
    MISS: 'Miss.',
    DR: 'Dr.',
    PROF: 'Prof.',
    REV: 'Rev.',
    HON: 'Hon.'
});

const role = Object.freeze({
    TESTATOR: 'testator',
    SPOUSE: 'spouse',
    PARTNER: 'partner',
    KID: 'kid',
    BENEFIARY: 'beneficiary',
    ADDITIONAL_BENEFICIARY: 'additional beneficiary',
    EXECUTOR: 'executor',
    ADDITIONAL_EXECUTOR:'additional executor'
})

const maritalStatus = Object.freeze({
    MARRIED: 'married',
    PARTNER: 'partner',
    WIDOWED: 'widowed',
    SINGLE: 'single'
})

const assetType = Object.freeze({
    BANK_ACCOUNT: 'Bank Account',
    PENSION: 'Pension',
    LIFE_INSURANCE: 'Life insurance',
    STOCKS_AND_SHARES: 'Stocks and shares',
    PROPERTY: 'Property',
    OTHER: 'Other'
})


const constants = {
    title,
    role,
    maritalStatus,
    assetType
}


export default constants