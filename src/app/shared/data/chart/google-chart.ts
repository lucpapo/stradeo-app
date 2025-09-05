import { GoogleChartType } from "ng2-google-charts";

let primary_color = localStorage.getItem('primary_color') || '#678f44';
let secondary_color = localStorage.getItem('secondary_color') || '#d1823f';

export var areaChart1: any = {
    chartType: 'AreaChart',
    dataTable: [
        ['Year', 'Sales', 'Expenses'],
        ['2013', 1000, 400],
        ['2014', 1170, 460],
        ['2015', 660, 1120],
        ['2016', 1030, 540]
    ],
    options: {
        title: 'Company Performance',
        hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
        vAxis: { minValue: 0 },
        width: '100%',
        height: 400,
        colors: [primary_color, secondary_color],
        backgroundColor: 'transparent'
    },
};

export var areaChart2: any = {
    chartType: 'AreaChart',
    dataTable: [
        ['Year', 'Cars', 'Trucks', 'Drones', 'Segways'],
        ['2013', 100, 400, 2000, 400],
        ['2014', 500, 700, 530, 800],
        ['2015', 2000, 1000, 620, 120],
        ['2016', 120, 201, 2501, 540]
    ],
    options: {
        title: 'Company Performance',
        hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
        vAxis: { minValue: 0 },
        width: '100%',
        height: 400,
        colors: [primary_color, secondary_color, "#479447", "#da9817"],
        backgroundColor: 'transparent'
    },
};

export var columnChart1: any = {
    chartType: 'ColumnChart',
    dataTable: [
        ["Year", "Sales", "Expenses", "Profit"],
        ["2018", 1e3, 400, 250],
        ["2019", 1170, 460, 300],
        ["2020", 660, 1120, 400],
        ["2021", 1030, 540, 450]
    ],
    options: {
        chart: {
            title: "Company Performance",
            subtitle: "Sales, Expenses, and Profit: 2014-2017"
        },
        bars: "vertical",
        vAxis: {
            format: "decimal"
        },
        height: 400,
        width: '100%',
        colors: [primary_color, secondary_color, "#479447"],
    },
};

export var columnChart2: any = {
    chartType: 'BarChart',
    dataTable: [
        ["Year", "Sales", "Expenses", "Profit"],
        ["2018", 1e3, 400, 250],
        ["2019", 1170, 460, 300],
        ["2020", 660, 1120, 400],
        ["2021", 1030, 540, 450]
    ],
    options: {
        chart: {
            title: "Company Performance",
            subtitle: "Sales, Expenses, and Profit: 2014-2017"
        },
        bars: "horizontal",
        vAxis: {
            format: "decimal"
        },
        height: 400,
        width: '100%',
        colors: [primary_color, secondary_color, "#479447"],

    },
};

export const lineChart = {
    chartType: 'LineChart',
    dataTable: [
        ['Month', 'Guardians of the Galaxy', 'The Avengers', 'Transformers: Age of Extinction'],
        [1, 37.8, 80.8, 41.8],
        [2, 30.9, 10.5, 32.4],
        [3, 40.4, 57, 25.7],
        [4, 11.7, 18.8, 10.5],
        [5, 20, 17.6, 10.4],
        [6, 8.8, 13.6, 7.7],
        [7, 7.6, 12.3, 9.6],
        [8, 12.3, 29.2, 10.6],
        [9, 16.9, 42.9, 14.8],
        [10, 12.8, 30.9, 11.6],
        [11, 5.3, 7.9, 4.7],
        [12, 6.6, 8.4, 5.2],
    ],
    options: {
        chart: {
            title: 'Box Office Earnings in First Two Weeks of Opening',
            subtitle: 'in millions of dollars (USD)'
        },
        vAxis: { ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90,], },
        colors: [primary_color, secondary_color, "#479447"],
        height: 500,
        width: '100%',
    }
}

export var comboChart: any = {
    chartType: 'ComboChart',
    dataTable: [
        ['Month', 'Bolivia', 'Ecuador', 'Madagascar', 'Papua', 'Rwanda', 'Average'],
        ["2004/05", 165, 938, 522, 998, 450, 614.6],
        ["2005/06", 135, 1120, 599, 1268, 288, 682],
        ["2006/07", 157, 1167, 587, 807, 397, 623],
        ["2007/08", 139, 1110, 615, 968, 215, 609.4],
        ["2008/09", 136, 691, 629, 1026, 366, 569.6]
    ],
    options: {
        title: 'Monthly Coffee Production by Country',
        vAxis: { title: 'Cups' },
        hAxis: { title: 'Month' },
        seriesType: 'bars',
        series: { 5: { type: 'line' } },
        height: 500,
        fullWidth: true,
        colors: [primary_color, secondary_color, "#479447",
            "#26a9d2",
            "#da9817"
        ],
    },
};

export var barChart2: any = {
    chartType: 'BarChart',
    dataTable: [
        ["Element", "Density", {
            role: "style"
        }],
        ["Copper", 10, "#26a9d2"],
        ["Silver", 12, "#da9817"],
        ["Gold", 14, "#e87f24"],
        ["Platinum", 16, "color:#678f44"]
    ],
    options: {
        title: "Density of Precious Metals, in g/cm^3",
        width: '100%',
        height: 400,
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
        backgroundColor: 'transparent'
    },
};

export var pieChart1: any = {
    chartType: 'PieChart',
    dataTable: [
        ['Task', 'Hours per Day'],
        ['Work', 5],
        ['Eat', 10],
        ['Commute', 15],
        ['Watch TV', 20],
        ['Sleep', 25]
    ],
    options: {
        title: 'My Daily Activities',
        width: "100%",
        height: 300,
        colors: ["#da9817", "#479447", "#26a9d2", secondary_color, primary_color,]
    }
}

export var pieChart2: any = {
    chartType: 'PieChart',
    dataTable: [
        ["Task", "Hours per Day"],
        ["Work", 2],
        ["Eat", 2],
        ["Commute", 11],
        ["Watch TV", 2],
        ["Sleep", 7],
    ],
    options: {
        title: 'My Daily Activities',
        pieHole: 0.4,
        width: '100%',
        height: 300,
        colors: ["#da9817", "#26a9d2", "#479447", secondary_color, primary_color]
    }
}

export var pieChart3: any = {
    chartType: 'PieChart',
    dataTable: [
        ['Language', 'Speakers (in millions)'],
        ['Assamese', 13],
        ['Bengali', 83],
        ['Bodo', 1.4],
        ['Dogri', 2.3],
        ['Gujarati', 46],
        ['Hindi', 300],
        ['Kannada', 38],
        ['Kashmiri', 5.5],
        ['Konkani', 5],
        ['Maithili', 20],
        ['Malayalam', 33],
        ['Manipuri', 1.5],
        ['Marathi', 72],
        ['Nepali', 2.9],
        ['Oriya', 33],
        ['Punjabi', 29],
        ['Sanskrit', 0.01],
        ['Santhali', 6.5],
        ['Sindhi', 2.5],
        ['Tamil', 61],
        ['Telugu', 74],
        ['Urdu', 52]
    ],
    options: {
        title: 'Indian Language Use',
        legend: 'none',
        width: '100%',
        height: 300,
        pieSliceText: 'label',
        slices: {
            4: { offset: 0.2 },
            12: { offset: 0.3 },
            14: { offset: 0.4 },
            15: { offset: 0.5 },
        },
        colors: ["#da9817", primary_color, secondary_color, "#479447", "#26a9d2", "#da9817", "#da9817", primary_color, "#da9817", "#479447", primary_color, secondary_color, "#479447", primary_color, "#26a9d2", "#da9817", primary_color, primary_color, "#26a9d2", secondary_color, primary_color, "#479447"]
    }
}

export var pieChart4: any = {
    chartType: 'PieChart',
    dataTable: [
        ['Task', 'Hours per Day'],
        ['Work', 5],
        ['Eat', 10],
        ['Commute', 15],
        ['Watch TV', 20],
        ['Sleep', 25]
    ],

    options: {
        title: 'My Daily Activities',
        is3D: true,
        width: '100%',
        height: 300,
        colors: ["#da9817", "#26a9d2", "#479447", secondary_color, primary_color, ,]
    }
}

// Word Tree Chart
export const wordTreeChart = {
    chartType: GoogleChartType.WordTree,
    dataTable: [
        ["Phrases"],
        ["cats are better than dogs"],
        ["cats eat kibble"],
        ["cats are better than hamsters"],
        ["cats are awesome"],
        ["cats are people too"],
        ["cats eat mice"],
        ["cats meowing"],
        ["cats in the cradle"],
        ["cats eat mice"],
        ["cats in the cradle lyrics"],
        ["cats eat kibble"],
        ["cats for adoption"],
        ["cats are family"],
        ["cats eat mice"],
        ["cats are better than kittens"],
        ["cats are evil"],
        ["cats are weird"],
        ["cats eat mice"],
    ],
    options: {
        width: "100%",
        height: 400,
        wordtree: {
            format: "implicit",
            word: "cats",
        },
    },
};
