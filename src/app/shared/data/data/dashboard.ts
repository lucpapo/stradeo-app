export interface Customer {
    name: string;
    email: string;
    image: string;
}

export interface Invoice {
    invoice: string;
    customer: Customer;
    status: string;
    amount: string;
    due_date: string;
}

export interface Transaction {
    id: number;
    title: string;
    date: string;
    status: string;
    amount: number;
    icon: string;
    class: string;
}

export interface commonTopData {
    title: string;
    price: string;
    color: string;
    complatedTo: string;
    image: string;
    persentage: string;
    class: string;
}

export interface Product {
    productName: string;
    orderDate: string;
    orderId: string;
    stock: number;
    amount: number;
    paymentStatus: string;
    imageUrl: string;
}

export interface User {
    img: string;
    name: string;
    status: string;
    time: string;
    date: string;
    buttonClass: string;
    buttonText: string;
    buttonIcon?: string;
}

export interface Message {
    icon: string;
    backgroundClass: string;
    title: string;
    user: string;
    timeAgo: string;
}

export interface Task {
    title: string;
    assignedTo: string;
    imageUrl?: string;
    class : string;
    imageUrls?: string[];
}

export const clearinvoicing: Invoice[] = [
    {
        invoice: "FV 00002/04/2024",
        customer: {
            name: "Terry Bowen",
            email: "terry.bowen@gmail.com",
            image: "assets/images/dashboard-2/user/1.png"
        },
        status: "Paid",
        amount: "$9,492.00",
        due_date: "May 20,2024"
    },
    {
        invoice: "FV 00008/07/2024",
        customer: {
            name: "Carole Ellis",
            email: "carole.ellis@gmail.com",
            image: "assets/images/dashboard-2/user/2.png"
        },
        status: "Unpaid",
        amount: "$4,942.00",
        due_date: "March 2,2024"
    },
    {
        invoice: "FV 00007/09/2024",
        customer: {
            name: "Cindy Hoyt",
            email: "cindy.hoyt@gmail.com",
            image: "assets/images/dashboard-2/user/3.png"
        },
        status: "Paid",
        amount: "$3,753.00",
        due_date: "Fav 10,2024"
    },
    {
        invoice: "FV 00009/04/2024",
        customer: {
            name: "Lisa Salazar",
            email: "lisa.salazar@gmail.com",
            image: "assets/images/dashboard-2/user/4.png"
        },
        status: "Overdue",
        amount: "$2,452.00",
        due_date: "May 20,2024"
    }
];

export const eventDetails: Transaction[] = [
    {
        id: 1,
        title: "Receipt for outer wallet",
        date: "Mar 22,2024, 4:50pm",
        status: "Completed",
        amount: 244.00,
        icon: "send",
        class: 'bg-light-primary'
    },
    {
        id: 2,
        title: "Process to reimburse to",
        date: "Feb 25,2024, 2:15pm",
        status: "Pending",
        amount: 948.00,
        icon: "work-file",
        class: 'bg-light-secondary'
    },
    {
        id: 3,
        title: "Delivered to Citizen",
        date: "Jun 10,2024, 12:40pm",
        status: "Verified",
        amount: 983.00,
        icon: "graph",
        class: 'bg-light-success'
    },
    {
        id: 4,
        title: "Received from #12345",
        date: "Mar 29,2024, 1:35pm",
        status: "Rejected",
        amount: 949.00,
        icon: "bookmark-mark",
        class: 'bg-light-danger'
    },
    {
        id: 5,
        title: "Fresh day offer added",
        date: "Oct 25,2024, 2:31pm",
        status: "Verified",
        amount: 442.00,
        icon: "wallet",
        class: 'bg-light-secondary'
    }
];

export const freshUpgrade = [
    {
        type: 'primary',
        title: 'Changed product',
        description: 'I like to be honest. I dislike things that are staged or fussy.',
        dot: false
    },
    {
        type: 'secondary',
        title: 'You enjoyed James\' items',
        description: 'If you have it, you can make things appear good.',
        dot: true
    },
    {
        type: 'primary',
        title: 'James likes your stuff',
        description: 'I enjoy designing anything to do with the body.',
        dot: false
    },
    {
        type: 'secondary',
        title: 'Jihan Doe just liked your goods',
        description: 'Design and style should work toward making you look good and feel good without lot of effort.',
        dot: true
    }
]

export const totalSells: commonTopData[] = [
    {
        image: "assets/images/dashboard-2/icon/coin1.png",
        title: "Total Sells",
        price: "12,463",
        color: "success",
        complatedTo: "Jan 2024",
        persentage: "+ 20.08%",
        class: "total-sells",
    },
];

export const dailyOrders: commonTopData[] = [
    {
        image: "assets/images/dashboard-2/icon/shopping1.png",
        title: "Orders Value",
        price: "78,596",
        color: "danger",
        complatedTo: "Aug 2024",
        persentage: "- 10.02%",
        class: "total-sells-2",
    },
];

export const ordersValue: commonTopData[] = [
    {
        title: "Daily Orders",
        image: "assets/images/dashboard-2/icon/sent1.png",
        price: "95,789",
        color: "success",
        complatedTo: "may 2024",
        persentage: "+ 13.23%",
        class: "total-sells-3",
    },
];

export const dailyRevenue: commonTopData[] = [
    {
        image: "assets/images/dashboard-2/icon/revenue1.png",
        title: "Daily Revenue",
        price: "41,954",
        color: "danger",
        complatedTo: "july 2024",
        persentage: "- 17.06%",
        class: "total-sells-4",
    },
];

export const totalOrder: Product[] = [
    {
        productName: 'Mi Watch Revolve',
        orderDate: '20 April 2024',
        orderId: '#748669',
        stock: 4657,
        amount: 35.00,
        paymentStatus: 'Pending',
        imageUrl: 'assets/images/dashboard-2/order/watch.png'
    },
    {
        productName: 'Stylish Plant Pot',
        orderDate: '10 June 2024',
        orderId: '#744U8F',
        stock: 7637,
        amount: 25.00,
        paymentStatus: 'Pending',
        imageUrl: 'assets/images/dashboard-2/order/flower.png'
    },
    {
        productName: 'Dark Oak Chair',
        orderDate: '13 May 2024',
        orderId: '#329478',
        stock: 3927,
        amount: 10.00,
        paymentStatus: 'Pending',
        imageUrl: 'assets/images/dashboard-2/order/bench.png'
    },
    {
        productName: '0 Sneakers For Men',
        orderDate: '12 April 2023',
        orderId: '#742445',
        stock: 6146,
        amount: 50.00,
        paymentStatus: 'Pending',
        imageUrl: 'assets/images/dashboard-2/order/shoes.png'
    }
];

export const totalAppointment: User[] = [
    {
        img: 'assets/images/dashboard-2/user/1.png',
        name: 'James Prather',
        status: 'active-online',
        time: '1 Hour',
        date: '16 August',
        buttonClass: 'btn-primary',
        buttonText: 'Pending',
    },
    {
        img: 'assets/images/dashboard-2/user/2.png',
        name: 'Robert Johnson',
        status: 'active-busy',
        time: 'Now',
        date: '21 September',
        buttonClass: 'btn-secondary',
        buttonText: 'Done',
        buttonIcon: 'fa fa-check-circle',
    },
    {
        img: 'assets/images/dashboard-2/user/3.png',
        name: 'Brian McKamey',
        status: 'active-offline',
        time: '2 Day After',
        date: '06 March',
        buttonClass: 'btn-success',
        buttonText: 'Pending',
    },
    {
        img: 'assets/images/dashboard-2/user/4.png',
        name: 'Graham Wolfe',
        status: 'active-online',
        time: 'Day End',
        date: '12 February',
        buttonClass: 'btn-info',
        buttonText: 'Pending',
    },
    {
        img: 'assets/images/dashboard-2/user/5.png',
        name: 'Walter Kendall',
        status: 'active-offline',
        time: '2 Day After',
        date: '06 March',
        buttonClass: 'btn-danger',
        buttonText: 'Pending',
    },
];

export const auditLog: Message[] = [
    {
        icon: 'fa fa-check-circle',
        backgroundClass: 'bg-primary',
        title: 'RP204_salesfores generated',
        user: 'Andre Sluczka',
        timeAgo: '2hr ago'
    },
    {
        icon: 'fa fa-exclamation-circle',
        backgroundClass: 'bg-secondary',
        title: 'R304_salesforece undeployed',
        user: 'Andre Sluczka',
        timeAgo: '4hr ago'
    },
    {
        icon: 'fa fa-times-circle',
        backgroundClass: 'bg-danger',
        title: 'R304_salesforece loast...',
        user: 'Andre Sluczka',
        timeAgo: '10 Jun'
    },
    {
        icon: 'fa fa-check-circle',
        backgroundClass: 'bg-primary',
        title: 'Dev created a new environment.',
        user: 'Andre Sluczka',
        timeAgo: '22 Oct'
    },
    {
        icon: 'fa fa-check-circle',
        backgroundClass: 'bg-primary',
        title: 'Project salesforce built.',
        user: 'Andre Sluczka',
        timeAgo: '25 Oct'
    }
];

export const theDutiesToday: Task[] = [
    {
        title: "NFT graphics packages",
        assignedTo: "Hedvige Bussière",
        class : 'font-primary',
        imageUrl: "assets/images/dashboard/user/8.png"
    },
    {
        title: "Radio Homepage",
        assignedTo: "schneider..",
        class : 'font-secondary',
        imageUrls: [
            "assets/images/dashboard/user/9.png",
            "assets/images/dashboard/user/10.png"
        ]
    },
    {
        title: "Deliver Dinner Apps",
        assignedTo: "Stéphane Chasse",
        class : 'font-warning',
        imageUrl: "assets/images/dashboard/user/11.png"
    },
    {
        title: "Todo Game Layout",
        assignedTo: "Isaac Dennis",
        class : 'font-success',
        imageUrls: [
            "assets/images/dashboard/user/12.png",
            "assets/images/dashboard/user/13.png"
        ]
    }
];