
export const VariationRadioPayment = [
    {
        id: 'ptm11',
        label: 'BOB',
        img: 'assets/images/ecommerce/card.png',
        check: false

    },
    {
        id: 'ptm22',
        label: 'MasterCard',
        img: 'assets/images/ecommerce/mastercard.png',
        check: true
    },
    {
        id: 'ptm33',
        label: 'Paypal',
        img: 'assets/images/ecommerce/paypal.png',
        check: false
    },
    {
        id: 'ptm44',
        label: 'VISA',
        img: 'assets/images/ecommerce/visa.png',
        check: false
    },
]

export const VariationsWebDesign = [
    {
        label: 'A.HTML',
        id: 'ptm101',
        check: false
    },
    {
        label: 'B. CSS',
        id: 'ptm201',
        check: false
    },
    {
        label: 'C. Javascript',
        id: 'ptm301',
        check: true
    },
    {
        label: 'D. Above the all',
        id: 'ptm401',
        check: false
    },
];

export const variationsIcons = [
    {
        label: 'The notification icon displayed new messages.',
        icon: 'notification',
        id: 'ptm100',
        check: false,
        class: 'danger'
    },
    {
        label: 'The download icon indicated completion.',
        icon: 'stroke-calendar',
        id: 'ptm200',
        check: false,
        class: 'success'

    },
    {
        label: 'The tag icon allowed easy categorization.',
        icon: 'tag',
        id: 'ptm300',
        check: true,
        class: 'dark'

    },
    {
        label: 'The email icon was inaccessibly located.',
        icon: 'stroke-email',
        id: 'ptm400',
        check: false,
        class: 'primary'
    },
]

export const checkBox = [
    {
        label: 'Reading',
        id: 'check-a',
        class: 'success',
        check: false
    },
    {
        label: 'Watching TV',
        id: 'check-b',
        class: 'success',
        check: true
    },
    {
        label: 'Listening to music',
        id: 'check-c',
        class: 'danger',
        check: false
    },
    {
        label: 'Playing video games',
        id: 'check-d',
        class: 'danger',
        check: false
    },
    {
        label: 'Painting/Drawing',
        id: 'check-e',
        class: 'success',
        check: false
    },
]
export const themeSales = [
    {
        list: 'Voxo',
        sales: '270 sales',
        check: false
    },
    {
        list: 'Kabul',
        sales: '4.8K Sales',
        check: false
    },
    {
        list: 'Multikart',
        sales: '2.6k Sales',
        check: false
    },
    {
        list: 'Viho',
        sales: '2k Sales',
        check: true
    }
]
export const inlineStyle = [
    {
        label: 'Estimated 14-20 Day Shipping ( Duties end taxes may be due upon delivery )',
        title: 'COD',
        digit: '50 INR',
        class: 'warning',
        id: 'radio19',
        check: false
    },
    {
        label: 'Estimated 1 Day Shipping ( Duties end taxes may be due upon delivery )',
        title: 'Fast',
        digit: '100 INR',
        class: 'secondary',
        id: 'radio20',
        check: true
    },
    {
        label: 'Estimated 3 Day Shipping ( Duties end taxes may be due upon delivery )',
        title: 'Standard',
        digit: '80 INR',
        class: 'secondary',
        id: 'radio21',
        check: true
    },
    {
        label: 'Estimated 15 Day Shipping ( Duties end taxes may be due upon delivery )',
        title: 'Local',
        digit: 'Free',
        class: 'warning',
        id: 'radio22',
        check: true
    },
]

export const VerticalStyle = [
    {
        label: 'Estimated 10 to 15 Day Shipping ( Duties end tax may be due delivery )',
        title: 'COD',
        digit: '50 INR',
        class: 'primary',
        id: 'radio23',
        check: false
    },
    {
        label: 'Estimated 10 to 12 Day Shipping ( Duties end tax may be due delivery )',
        title: 'Fast',
        digit: '100 INR',
        class: 'secondary',
        id: 'radio24',
        check: true
    },
    {
        label: 'Estimated 3 to 5 Day Shipping ( Duties end tax may be due delivery )',
        title: 'STANDARD',
        digit: '80 INR',
        class: 'success',
        id: 'radio25',
        check: true
    },
    {
        label: 'Estimated 3 to 5 Day Shipping ( Duties end taxes may be due upon delivery )',
        title: 'Local',
        digit: 'Free',
        class: 'info',
        id: 'radio26',
        check: true
    },
]


export const HorizontalStyle = [
    {
        title: 'Delivery Option',
        item: [
            {
                border: 'primary',
                badge: 'COD',
                digits: '50 INR',
                id: 'radio30',
                value: false,
                des: 'Estimated 5 Day Shipping ( Duties end tax may be due delivery )',
            },
            {
                border: 'secondary',
                badge: 'Fast',
                digits: '100 INR',
                id: 'radio31',
                value: true,
                des: 'Estimated 1 Day Shipping ( Duties end tax may be due delivery )',
                class: 'offset-sm-3'
            },
        ]
    }
]

