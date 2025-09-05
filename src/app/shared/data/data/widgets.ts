import { offlineData, onlineData, totalEarningData, totalExpenseData } from "../chart/widgets";

export interface topChart {
    header: {
        title: string;
        subtitle: string;
        iconHref: string;
        iconClass: string;
    };
    comment: {
        date: string;
        messages: number;
        links: number;
    };
    users: string[];
    progress: {
        value: number;
        type: string;
    };
}

export interface LearningListItem {
    title: string;
    amount: string;
    icon: string;
    backgroundClass: string;
}

export interface Product {
    name: string;
    currentPrice: number;
    originalPrice: number;
    specialDiscount: string;
    dealOfTheDayPrice: number;
    countdown: {
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    };
    imageUrl: string;
}

export interface Task {
    title: string;
    description: string;
}

export const WebMobile: topChart = {
    header: {
        title: 'Web & mobile app',
        subtitle: 'Dribble Presentation',
        iconHref: 'improvement',
        iconClass: 'bg-light-primary'
    },
    comment: {
        date: 'June 18, 2024',
        messages: 18,
        links: 8
    },
    users: [
        'assets/images/widgets/user/1.png',
        'assets/images/widgets/user/2.png',
        'assets/images/widgets/user/3.png'
    ],
    progress: {
        value: 70,
        type: 'primary'
    }
}

export const nftWebsite: topChart = {
    header: {
        title: 'NFT website design',
        subtitle: 'Pinterest Promotion',
        iconHref: 'NFT',
        iconClass: 'bg-light-success'
    },
    comment: {
        date: 'June 15, 2024',
        messages: 20,
        links: 10
    },
    users: [
        'assets/images/widgets/user/8.png',
        'assets/images/widgets/user/4.png',
        'assets/images/widgets/user/7.png'
    ],
    progress: {
        value: 60,
        type: 'primary'
    }
}

export const categoriesSales: topChart = {
    header: {
        title: 'Project dashboard',
        subtitle: 'Twitter Marketing',
        iconHref: 'management',
        iconClass: 'bg-light-danger'
    },
    comment: {
        date: 'June 25, 2024',
        messages: 30,
        links: 12
    },
    users: [
        'assets/images/widgets/user/9.png',
        'assets/images/widgets/user/5.png',
        'assets/images/widgets/user/6.png'
    ],
    progress: {
        value: 50,
        type: 'danger'
    }
}

export const learningListItem: LearningListItem[] = [
    {
        title: 'Design',
        amount: '$ 35,842.00',
        icon: 'design',
        backgroundClass: 'bg-light-primary',
    },
    {
        title: 'Development',
        amount: '$ 5,647.00',
        icon: 'development',
        backgroundClass: 'bg-light-secondary',
    },
    {
        title: 'Others',
        amount: '$ 3,237.00',
        icon: 'other',
        backgroundClass: 'bg-light-success',
    }
];

export const products: Product[] = [
    {
        name: "IPhone 14 Pro",
        currentPrice: 21.45,
        originalPrice: 65.40,
        specialDiscount: "Special Discount",
        dealOfTheDayPrice: 48,
        countdown: {
            days: 28,
            hours: 3,
            minutes: 14,
            seconds: 45,
        },
        imageUrl: "assets/images/dashboard-2/product/7.png",
    },
    {
        name: "Apple Airpods",
        currentPrice: 20.35,
        originalPrice: 35.43,
        specialDiscount: "Special Discount",
        dealOfTheDayPrice: 38,
        countdown: {
            days: 20,
            hours: 5,
            minutes: 30,
            seconds: 15,
        },
        imageUrl: "assets/images/dashboard-2/product/8.png",
    },
    {
        name: "Apple Watch Series 7",
        currentPrice: 25.30,
        originalPrice: 45.40,
        specialDiscount: "Special Discount",
        dealOfTheDayPrice: 25,
        countdown: {
            days: 15,
            hours: 6,
            minutes: 18,
            seconds: 30,
        },
        imageUrl: "assets/images/dashboard-2/product/9.png",
    },
];


export const totalEarning = {
    title: 'Total Earning',
    subTitle: '16.06% than last week',
    currentPrice: '20.790',
    chart: totalEarningData
}

export const totalExpense = {
    title: 'Total Earning',
    subTitle: '10.34% than last week',
    currentPrice: '4.683.90',
    chart: totalExpenseData
}

export const activeTasks: Task[] = [
    { title: 'Regina Cooper', description: 'Create userflow social application design' },
    { title: 'Install Appointment', description: 'Homepage design for slimmuch product' },
    { title: 'Regina Cooper', description: 'Interactive prototype design - web design' },
    { title: 'Regina Cooper', description: 'Create Application design for topbuzz' }
]

export const online = {
    icon_class : 'bg-light-primary',
    icon : 'basket',
    arrow_icon : 'arrow-chart',
    arrow_class : 'font-danger',
    value : '-6.3',
    title : 'Online Order',
    price : '16,2873',
    chart : onlineData
} 

export const offline = {
    icon_class : 'bg-light-secondary',
    icon : 'delivery',
    arrow_icon : 'arrow-chart-up',
    arrow_class : 'font-success',
    value : '+8.3',
    title : 'Offline Order',
    price : '62,5461',
    chart_class : 'offline-chart',
    chart : offlineData

} 

