import {
    ApexAnnotations,
    ApexAxisChartSeries,
    ApexChart,
    ApexDataLabels,
    ApexFill,
    ApexGrid,
    ApexLegend,
    ApexMarkers,
    ApexNonAxisChartSeries,
    ApexPlotOptions,
    ApexResponsive,
    ApexStroke,
    ApexTheme,
    ApexTitleSubtitle,
    ApexXAxis,
    ApexYAxis,
} from "ng-apexcharts";

export type ChartOptions = {
    series?: ApexAxisChartSeries;
    chart?: ApexChart;
    xaxis?: ApexXAxis;
    stroke?: ApexStroke;
    tooltip?: any;
    dataLabels?: ApexDataLabels;
    hover?: number;
    yaxis?: ApexYAxis;
    legend?: ApexLegend;
    labels?: string[];
    plotOptions?: ApexPlotOptions;
    fill?: ApexFill;
    responsive?: ApexResponsive[];
    pieseries?: ApexNonAxisChartSeries;
    title?: ApexTitleSubtitle;
    theme?: ApexTheme;
    colors?: string[];
    markers?: ApexMarkers;
    annotations?: ApexAnnotations;
    grid?: ApexGrid;
};

let primary_color = localStorage.getItem('primary_color') || '#678f44';
let secondary_color = localStorage.getItem('secondary_color') || '#d1823f';

var trigoStrength = 3;

export let TotalSale: ChartOptions | any = {
    series: [{
        name: "Desktops",
        data: [50, 50, 50, 25, 25, 25, 2, 2, 2, 25, 25, 25, 62, 62, 62, 35, 35, 35, 66, 66],
    }],
    chart: {
        type: 'area',
        height: 200,
        zoom: {
            enabled: false
        },
        toolbar: {
            show: false,
        },
        dropShadow: {
            enabled: true,
            top: 5,
            left: 0,
            bottom: 3,
            blur: 2,
            color: primary_color,
            opacity: 0.2,
        },
    },
    colors: [primary_color],
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.5,
            opacityTo: 0.1,
            stops: [0, 90, 100]
        }
    },
    dataLabels: {
        enabled: false
    },
    grid: {
        show: false,
    },
    xaxis: {
        labels: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        show: false,
    },
    stroke: {
        curve: 'straight',
        width: 2,
    },
    markers: {
        discrete: [{
            seriesIndex: 0,
            dataPointIndex: 12,
            fillColor: primary_color,
            strokeColor: '#fff',
            size: 5,
            shape: "circle"
        }],
    },
    responsive: [{
        breakpoint: 1661,
        options: {
            chart: {
                height: 140
            },
        },
    }
    ],
}

export let TotalProject: ChartOptions | any = {
    series: [
        {
            name: 'series2',
            data: [15, 25, 20, 35, 55, 30, 20, 30, 20, 35, 25, 20, 15, 25, 20, 35, 50, 30, 20, 30, 20, 35, 25, 20],
        },
    ],
    colors: [primary_color, secondary_color],
    chart: {
        height: 215,
        offsetY: 20,
        type: 'bar',
        sparkline: {
            enabled: true,
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: 'smooth',
    },
    plotOptions: {
        bar: {
            borderRadius: 5,
            distributed: true,
            columnWidth: "50%",
            barHeight: '38%',
            dataLabels: {
                position: 'top',
            },
        }
    },
}

export let TotalProduct: ChartOptions | any = {
    series: [{
        name: "Desktops",
        data: [15, 14, 11, 20, 10, 15, 11],
    }],
    chart: {
        type: 'area',
        height: 200,
        offsetY: 10,
        zoom: {
            enabled: false
        },
        toolbar: {
            show: false,
        },
        dropShadow: {
            enabled: true,
            top: 5,
            left: 0,
            bottom: 3,
            blur: 2,
            color: secondary_color,
            opacity: 0.2,
        },
    },
    colors: [secondary_color],
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.6,
            opacityTo: 0.2,
            stops: [0, 100, 100]
        }
    },
    dataLabels: {
        enabled: false
    },
    grid: {
        show: false,
    },
    xaxis: {
        labels: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        show: false,
    },
    stroke: {
        curve: 'smooth',
        width: 2,
    },
    markers: {
        discrete: [{
            seriesIndex: 0,
            dataPointIndex: 3,
            fillColor: secondary_color,
            strokeColor: "#fff",
            size: 6,
            shape: "circle"
        },
        ],
    }
}

export let SaleOverview: ChartOptions | any = {
    series: [{
        name: 'TEAM A',
        type: 'area',
        data: [183, 175, 170, 178, 185, 171, 177, 185, 170, 180, 175, 170]
    }, {
        name: 'TEAM B',
        type: 'line',
        data: [183, 193, 170, 182, 200, 180, 185, 178, 165, 175, 190, 190],
    }],
    chart: {
        height: 320,
        type: 'line',
        stacked: false,
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: false,
        },
    },
    stroke: {
        curve: 'smooth',
        width: [3, 3],
        dashArray: [0, 4]

    },
    grid: {
        show: true,
        borderColor: '#000000',
        strokeDashArray: 0,
        position: 'back',
        xaxis: {
            lines: {
                show: false,
            },
        },
        yaxis: {
            lines: {
                show: false,
            },
        },
    },
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',],
    markers: {
        discrete: [{
            seriesIndex: 0,
            dataPointIndex: 2,
            fillColor: "#fff",
            strokeColor: '#000',
            size: 7,
            shape: "circle"
        },
        {
            seriesIndex: 0,
            dataPointIndex: 4,
            fillColor: "#fff",
            strokeColor: '#000',
            size: 7,
            shape: "circle"
        },
        {
            seriesIndex: 0,
            dataPointIndex: 6,
            fillColor: "#fff",
            strokeColor: '#000',
            size: 7,
            shape: "circle"
        },
        {
            seriesIndex: 0,
            dataPointIndex: 9,
            fillColor: "#fff",
            strokeColor: '#000',
            size: 7,
            shape: "circle"
        },
        ],
    },
    tooltip: {
        shared: true,
        intersect: false,
        y: {
            formatter: function (y: Number) {
                if (typeof y !== "undefined") {
                    return y.toFixed(0) + " points";
                }
                return y;
            }
        }
    },
    legend: {
        show: false,
    },
    colors: [primary_color, '#EAEAEA'],
    fill: {
        type: ['gradient', 'solid', 'gradient'],
        gradient: {
            shade: 'light',
            type: "vertical",
            shadeIntensity: 1,
            gradientToColors: [primary_color, '#fff5f7', primary_color],
            inverseColors: true,
            opacityFrom: 0.4,
            opacityTo: 0,
            stops: [0, 100, 100, 100],
        }
    },

    xaxis: {
        labels: {
            style: {
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 500,
                colors: '#8D8D8D',
            },
        },
        axisBorder: {
            show: false
        },
    },
    yaxis: {
        labels: {
            show: false
        },
    },
}

export let MonthlyHistory: ChartOptions | any = {
    series: [
        {
            name: "Profit",
            data: [100, 50, 25, 50, 30, 50, 70],
        },
        {
            name: "Revenue",
            data: [70, 20, 55, 45, 35, 110, 85],
        },
        {
            name: "Cash Flow",
            data: [85, 55, 100, 35, 90, 60, 80],
        },
    ],
    chart: {
        type: "bar",
        height: 380,
        toolbar: {
            show: false,
        },
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: "30%",
            endingShape: "rounded",
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        show: true,
        width: 1,
        colors: ["transparent"],
        curve: "smooth",
        lineCap: "butt",
    },
    xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        floating: false,
        axisTicks: {
            show: false,
        },
        axisBorder: {
            color: "#C4C4C4",
        },
    },
    yaxis: {
        title: {
            text: "Dollars in thounand",
            style: {
                fontSize: "14px",
                fontFamily: "Roboto, sans-serif",
                fontWeight: 500,
            },
        },
    },
    colors: [secondary_color, "#479447", primary_color],
    fill: {
        type: "gradient",
        gradient: {
            shade: "light",
            type: "vertical",
            shadeIntensity: 0.1,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0.9,
            stops: [0, 100],
        },
    },
    tooltip: {
        y: {
            formatter: function (val: Number) {
                return "$ " + val + " thousands";
            },
        },
    },
    responsive: [
        {
            breakpoint: 576,
            options: {
                chart: {
                    height: 200,
                },
            },
        },
    ],
}

export let LiveProductsChart: ChartOptions | any = {
    chart: {
        height: 320,
        type: "area",
        toolbar: {
            show: false,
        },
    },
    stroke: {
        curve: "smooth",
        width: 0,
    },
    series: [
        {
            name: "TEAM A",
            data: [50, 120, 90, 100, 70, 95, 40, 55, 30, 0],
        },
        {
            name: "TEAM B",
            data: [35, 60, 40, 90, 70, 110, 90, 120, 60, 0],
        },
    ],
    fill: {
        colors: [primary_color, secondary_color],
        type: "gradient",
        gradient: {
            shade: "light",
            type: "vertical",
            shadeIntensity: 0.4,
            inverseColors: false,
            opacityFrom: 0.9,
            opacityTo: 0.8,
            stops: [0, 100],
        },
    },
    dataLabels: {
        enabled: false,
    },
    grid: {
        borderColor: "rgba(196,196,196, 0.3)",
        padding: {
            top: 0,
            right: -120,
            bottom: 10,
        },
    },
    colors: [primary_color, secondary_color],
    labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
    ],
    markers: {
        size: 0,
    },
    xaxis: {
        axisTicks: {
            show: false,
        },
        axisBorder: {
            color: "rgba(196,196,196, 0.3)",
        },
    },
    yaxis: [
        {
            title: {
                text: "Dollars in thounand",
            },
        },
    ],
    tooltip: {
        shared: true,
        intersect: false,
        y: {
            formatter: function (y: number) {
                if (typeof y !== "undefined") {
                    return y.toFixed(0) + " points";
                }
                return y;
            },
        },
    },
}

export let TurnOverChart: ChartOptions | any = {
    chart: {
        toolbar: {
            show: false,
        },
        height: 300,
        type: "area",
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        width: 3,
        curve: "smooth",
    },
    xaxis: {
        categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
        ],
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    grid: {
        borderColor: "rgba(196,196,196, 0.3)",
        padding: {
            top: -20,
            right: -55,
            bottom: 0,
        },
    },
    fill: {
        opacity: 0.2,
    },
    colors: [primary_color],
    series: [
        {
            data: [70, 60, 82, 80, 60, 90, 70, 120, 50, 60, 0],
        },
    ],
    tooltip: {
        x: {
            format: "dd/MM/yy HH:mm",
        },
    },
}

export let CryptocurrencyPricesChart: ChartOptions | any = {
    chart: {
        toolbar: {
            show: false,
        },
        height: 400,
        type: "area",
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        width: 3,
        curve: "smooth",
    },
    xaxis: {
        categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
        ],
        tickAmount: 5,
        tickPlacement: "between",
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
        tooltip: {
            enabled: false,
        },
    },
    grid: {
        borderColor: "rgba(196,196,196, 0.3)",
        padding: {
            top: -20,
            right: -16,
            bottom: 0,
        },
    },
    fill: {
        opacity: 0.2,
    },
    colors: [primary_color],
    series: [
        {
            data: [
                20, 120, 15, 100, 120, 60, 150, 70, 100, 80, 105, 20, 70, 60, 10, 12,
                10, 130, 60, 80, 40, 140, 110, 150, 30, 75, 20, 45, 15, 130, 10, 30,
                15, 110, 65, 130, 0,
            ],
        },
    ],
    tooltip: {
        x: {
            format: "dd/MM/yy HH:mm",
        },
    },
    responsive: [
        {
            breakpoint: 576,
            options: {
                chart: {
                    height: 200,
                },
            },
        },
    ],
}

export let CryptoAnnotationsChart: ChartOptions | any = {
    series: [
        {
            data: [8107, 8300, 8260, 8400, 8350, 8500, 8350],
        },
    ],
    chart: {
        height: 400,
        type: "line",
        toolbar: {
            show: false,
        },
    },
    annotations: {
        yaxis: [
            {
                y: 8200,
                y2: 8400,
                borderColor: "#e69800",
                fillColor: "#e69800",
                opacity: 0.1,
                label: {
                    borderColor: "#e69800",
                    offsetX: -30,
                    style: {
                        fontSize: "10px",
                        color: "#fff",
                        background: "#e69800",
                    },
                    text: "Y-axis range",
                },
            },
        ],
        xaxis: [
            {
                x: new Date("15 Nov 2017").getTime(),
                strokeDashArray: 0,
                borderColor: primary_color,
                label: {
                    borderColor: primary_color,
                    offsetY: 20,
                    style: {
                        color: "#fff",
                        background: primary_color,
                    },
                    text: "Anno Test",
                },
            },
            {
                x: new Date("17 Nov 2017").getTime(),
                x2: new Date("18 Nov 2017").getTime(),
                fillColor: "#51bb25",
                opacity: 0.1,
                label: {
                    borderColor: "##479447",
                    style: {
                        fontSize: "10px",
                        color: "#fff",
                        background: "#479447",
                    },
                    offsetY: 20,
                    text: "X-axis range",
                },
            },
        ],
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        width: 3,
        curve: "smooth",
    },
    grid: {
        padding: {
            right: 30,
            left: 20,
        },
    },
    title: {
        text: "Line with Annotations",
        align: "left",
        style: {
            fontSize: "18px",
            fontFamily: "Outfit, sans-serif",
            fontWeight: 500,
        },
    },
    colors: [secondary_color],
    labels: [
        "13 Nov 2017",
        "14 Nov 2017",
        "15 Nov 2017",
        "16 Nov 2017",
        "17 Nov 2017",
        "20 Nov 2017",
        "21 Nov 2017",
    ],
    xaxis: {
        type: "datetime",
    },
    responsive: [
        {
            breakpoint: 576,
            options: {
                title: {
                    style: {
                        fontSize: "16px",
                    },
                },
            },
        },
    ],
}

export let StockMarketChart: ChartOptions | any = {
    series: [
        {
            name: "line",
            type: "line",
            data: [
                {
                    x: new Date(1538778600000),
                    y: 6550,
                },
                {
                    x: new Date(1538782200000),
                    y: 6560,
                },
                {
                    x: new Date(1538814600000),
                    y: 6640,
                },
                {
                    x: new Date(1538884800000),
                    y: 6560,
                },
            ],
        },
        {
            name: "candle",
            type: "candlestick",
            data: [
                {
                    x: new Date(1538778600000),
                    y: [6629.81, 6650.5, 6623.04, 6633.33],
                },
                {
                    x: new Date(1538780400000),
                    y: [6632.01, 6643.59, 6620, 6630.11],
                },
                {
                    x: new Date(1538782200000),
                    y: [6630.71, 6648.95, 6623.34, 6635.65],
                },
                {
                    x: new Date(1538784000000),
                    y: [6635.65, 6651, 6629.67, 6638.24],
                },
                {
                    x: new Date(1538785800000),
                    y: [6638.24, 6640, 6620, 6624.47],
                },
                {
                    x: new Date(1538787600000),
                    y: [6624.53, 6636.03, 6621.68, 6624.31],
                },
                {
                    x: new Date(1538789400000),
                    y: [6624.61, 6632.2, 6617, 6626.02],
                },
                {
                    x: new Date(1538791200000),
                    y: [6627, 6627.62, 6584.22, 6603.02],
                },
                {
                    x: new Date(1538793000000),
                    y: [6605, 6608.03, 6598.95, 6604.01],
                },
                {
                    x: new Date(1538794800000),
                    y: [6604.5, 6614.4, 6602.26, 6608.02],
                },
                {
                    x: new Date(1538796600000),
                    y: [6608.02, 6610.68, 6601.99, 6608.91],
                },
                {
                    x: new Date(1538798400000),
                    y: [6608.91, 6618.99, 6608.01, 6612],
                },
                {
                    x: new Date(1538800200000),
                    y: [6612, 6615.13, 6605.09, 6612],
                },
                {
                    x: new Date(1538802000000),
                    y: [6612, 6624.12, 6608.43, 6622.95],
                },
                {
                    x: new Date(1538803800000),
                    y: [6623.91, 6623.91, 6615, 6615.67],
                },
                {
                    x: new Date(1538805600000),
                    y: [6618.69, 6618.74, 6610, 6610.4],
                },
                {
                    x: new Date(1538807400000),
                    y: [6611, 6622.78, 6610.4, 6614.9],
                },
                {
                    x: new Date(1538809200000),
                    y: [6614.9, 6626.2, 6613.33, 6623.45],
                },
                {
                    x: new Date(1538811000000),
                    y: [6623.48, 6627, 6618.38, 6620.35],
                },
                {
                    x: new Date(1538812800000),
                    y: [6619.43, 6620.35, 6610.05, 6615.53],
                },
                {
                    x: new Date(1538814600000),
                    y: [6615.53, 6617.93, 6610, 6615.19],
                },
                {
                    x: new Date(1538816400000),
                    y: [6615.19, 6621.6, 6608.2, 6620],
                },
                {
                    x: new Date(1538818200000),
                    y: [6619.54, 6625.17, 6614.15, 6620],
                },
                {
                    x: new Date(1538820000000),
                    y: [6620.33, 6634.15, 6617.24, 6624.61],
                },
                {
                    x: new Date(1538821800000),
                    y: [6625.95, 6626, 6611.66, 6617.58],
                },
                {
                    x: new Date(1538823600000),
                    y: [6619, 6625.97, 6595.27, 6598.86],
                },
                {
                    x: new Date(1538825400000),
                    y: [6598.86, 6598.88, 6570, 6587.16],
                },
                {
                    x: new Date(1538827200000),
                    y: [6588.86, 6600, 6580, 6593.4],
                },
                {
                    x: new Date(1538829000000),
                    y: [6593.99, 6598.89, 6585, 6587.81],
                },
                {
                    x: new Date(1538830800000),
                    y: [6587.81, 6592.73, 6567.14, 6578],
                },
                {
                    x: new Date(1538832600000),
                    y: [6578.35, 6581.72, 6567.39, 6579],
                },
                {
                    x: new Date(1538834400000),
                    y: [6579.38, 6580.92, 6566.77, 6575.96],
                },
                {
                    x: new Date(1538836200000),
                    y: [6575.96, 6589, 6571.77, 6588.92],
                },
                {
                    x: new Date(1538838000000),
                    y: [6588.92, 6594, 6577.55, 6589.22],
                },
                {
                    x: new Date(1538839800000),
                    y: [6589.3, 6598.89, 6589.1, 6596.08],
                },
                {
                    x: new Date(1538841600000),
                    y: [6597.5, 6600, 6588.39, 6596.25],
                },
                {
                    x: new Date(1538843400000),
                    y: [6598.03, 6600, 6588.73, 6595.97],
                },
                {
                    x: new Date(1538845200000),
                    y: [6595.97, 6602.01, 6588.17, 6602],
                },
                {
                    x: new Date(1538847000000),
                    y: [6602, 6607, 6596.51, 6599.95],
                },
                {
                    x: new Date(1538848800000),
                    y: [6600.63, 6601.21, 6590.39, 6591.02],
                },
                {
                    x: new Date(1538850600000),
                    y: [6591.02, 6603.08, 6591, 6591],
                },
                {
                    x: new Date(1538852400000),
                    y: [6591, 6601.32, 6585, 6592],
                },
                {
                    x: new Date(1538854200000),
                    y: [6593.13, 6596.01, 6590, 6593.34],
                },
                {
                    x: new Date(1538856000000),
                    y: [6593.34, 6604.76, 6582.63, 6593.86],
                },
                {
                    x: new Date(1538857800000),
                    y: [6593.86, 6604.28, 6586.57, 6600.01],
                },
                {
                    x: new Date(1538859600000),
                    y: [6601.81, 6603.21, 6592.78, 6596.25],
                },
                {
                    x: new Date(1538861400000),
                    y: [6596.25, 6604.2, 6590, 6602.99],
                },
                {
                    x: new Date(1538863200000),
                    y: [6602.99, 6606, 6584.99, 6587.81],
                },
                {
                    x: new Date(1538865000000),
                    y: [6587.81, 6595, 6583.27, 6591.96],
                },
                {
                    x: new Date(1538866800000),
                    y: [6591.97, 6596.07, 6585, 6588.39],
                },
                {
                    x: new Date(1538868600000),
                    y: [6587.6, 6598.21, 6587.6, 6594.27],
                },
                {
                    x: new Date(1538870400000),
                    y: [6596.44, 6601, 6590, 6596.55],
                },
                {
                    x: new Date(1538872200000),
                    y: [6598.91, 6605, 6596.61, 6600.02],
                },
                {
                    x: new Date(1538874000000),
                    y: [6600.55, 6605, 6589.14, 6593.01],
                },
                {
                    x: new Date(1538875800000),
                    y: [6593.15, 6605, 6592, 6603.06],
                },
                {
                    x: new Date(1538877600000),
                    y: [6603.07, 6604.5, 6599.09, 6603.89],
                },
                {
                    x: new Date(1538879400000),
                    y: [6604.44, 6604.44, 6600, 6603.5],
                },
                {
                    x: new Date(1538881200000),
                    y: [6603.5, 6603.99, 6597.5, 6603.86],
                },
                {
                    x: new Date(1538883000000),
                    y: [6603.85, 6605, 6600, 6604.07],
                },
                {
                    x: new Date(1538884800000),
                    y: [6604.98, 6606, 6604.07, 6606],
                },
            ],
        },
    ],
    plotOptions: {
        candlestick: {
            colors: {
                upward: primary_color,
                downward: secondary_color,
            },
        },
    },
    legend: {
        show: false,
    },
    fill: {
        type: "gradient",
        gradient: {
            shade: "dark",
            type: "vertical",
            shadeIntensity: 0.2,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100],
        },
    },
    chart: {
        height: 450,
        type: "line",
        toolbar: {
            show: false,
        },
    },
    stroke: {
        curve: "smooth",
        width: [1, 1],
    },
    tooltip: {
        shared: true,
        custom: [
            function ({ seriesIndex, dataPointIndex, w }: any) {
                return w.globals.series[seriesIndex][dataPointIndex];
            },
            function ({ seriesIndex, dataPointIndex, w }: any) {
                var o = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
                var h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
                var l = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
                var c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];
                return "";
            },
        ],
    },
    xaxis: {
        type: "datetime",
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    grid: {
        strokeDashArray: 3,
        position: "back",
        row: {
            opacity: 0.5,
        },
        column: {
            opacity: 0.5,
        },
    },
    responsive: [
        {
            breakpoint: 576,
            options: {
                chart: {
                    height: 250,
                },
            },
        },
    ],
}

export let FinancesChart: ChartOptions | any = {
    chart: {
        height: 350,
        type: 'line',

        toolbar: {
            show: false,
        },
        zoom: {
            enabled: false,
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        width: 0,
    },
    series: [
        {
            name: "Load Average",
            type: 'column',
            data: generateMinuteWiseTimeSeries(
                new Date("12/12/2016 00:20:00").getTime(),
                12,
                {
                    min: 10,
                    max: 110,
                }
            ),
        },
        {
            name: 'Social Media',
            type: 'line',
            data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]
        }
    ],
    title: {
        text: "Average",
        align: "left",
        style: {
            fontSize: "12px",
        },
    },
    subtitle: {
        text: "17%",
        floating: true,
        align: "right",
        offsetY: 0,
        style: {
            fontSize: "20px",
            fontWeight: 500,
        },
    },
    fill: {
        colors: [primary_color],
        type: "gradient",
        gradient: {
            shade: "light",
            type: "vertical",
            shadeIntensity: 0.4,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0.8,
            stops: [0, 100],
        },
    },
    xaxis: {
        type: "datetime",
        range: 2700000,
    },
    yaxis: {
        decimalsInFloat: 1,
    },
    legend: {
        show: true,
    },
    responsive: [{
        breakpoint: 1366,
        options: {
            subtitle: {
                style: {
                    fontSize: "18px",
                },
            },
        },
    },
    {
        breakpoint: 992,
        options: {
            subtitle: {
                style: {
                    fontSize: "16px",
                },
            },
        },
    }
    ]
}

export let OrderStatusChart: ChartOptions | any = {
    chart: {
        height: 350,
        type: "line",
        stacked: true,
        animations: {
            enabled: true,
            easing: "linear",
            dynamicAnimation: {
                speed: 1000,
            },
        },
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: false,
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: "straight",
        width: 5,
    },
    grid: {
        padding: {
            left: 0,
            right: 0,
        },
    },
    fill: {
        opacity: 0.9,
    },
    colors: [primary_color, secondary_color],
    markers: {
        size: 0,
        hover: {
            size: 0,
        },
    },
    series: [
        {
            name: "Running",
            data: generateMinuteWiseTimeSeries(
                new Date("12/12/2016 00:20:00").getTime(),
                12,
                {
                    min: 30,
                    max: 110,
                }
            ),
        },
        {
            name: "Waiting",
            data: generateMinuteWiseTimeSeries(
                new Date("12/12/2016 00:20:00").getTime(),
                12,
                {
                    min: 30,
                    max: 110,
                }
            ),
        },
    ],
    xaxis: {
        type: "datetime",
        range: 2700000,
    },
    yaxis: {
        decimalsInFloat: 1,
    },
    title: {
        text: "Processes",
        align: "left",
        style: {
            fontSize: "12px",
        },
    },
    legend: {
        show: true,
        floating: true,
        horizontalAlign: "right",
        onItemClick: {
            toggleDataSeries: false,
        },
        position: "top",
        offsetY: -33,
        offsetX: 60,
    },
    responsive: [
        {
            breakpoint: 1366,
            options: {
                title: {
                    style: {
                        fontSize: "18px",
                    },
                },
            },
        },
        {
            breakpoint: 992,
            options: {
                title: {
                    style: {
                        fontSize: "16px",
                    },
                },
            },
        },
    ],

}

export let MonthlySalesChart: ChartOptions | any = {
    fill: {
        type: "gradient",
        gradient: {
            shade: "dark",
            type: "Reflected",
            shadeIntensity: 0.1,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0.8,
            stops: [0, 100],
        },
    },
    colors: [primary_color, secondary_color],
    chart: {
        height: 300,
        type: "radar",
        dropShadow: {
            enabled: true,
            blur: 1,
            left: 1,
            top: 1,
        },
    },
    series: [
        {
            name: "Series 1",
            data: [80, 50, 30, 40, 100, 20],
        },
        {
            name: "Series 2",
            data: [20, 30, 40, 80, 20, 80],
        },
    ],
    title: {
        text: "Radar Chart - Multi Series",
    },
    stroke: {
        width: 0,
    },
    markers: {
        size: 0,
    },
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
}

export let UsesChart: ChartOptions | any = {
    chart: {
        toolbar: {
            show: false,
        },
        height: 320,
        type: "bubble",
    },
    dataLabels: {
        enabled: false,
    },
    series: [
        {
            name: "Bubble1",
            data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
                min: 10,
                max: 60,
            }),
        },
        {
            name: "Bubble2",
            data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
                min: 10,
                max: 60,
            }),
        },
        {
            name: "Bubble3",
            data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
                min: 10,
                max: 60,
            }),
        },
        {
            name: "Bubble4",
            data: generateData(new Date("11 Feb 2017 GMT").getTime(), 20, {
                min: 10,
                max: 60,
            }),
        },
    ],
    fill: {
        type: "gradient",
        gradient: {
            shade: "dark",
            type: "horizontal",
            shadeIntensity: 0.4,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0.7,
            stops: [0, 100],
        },
    },
    colors: [
        primary_color,
        secondary_color,
        "#51bb25",
        "#544fff",
    ],
    title: {
        text: "Simple Bubble Chart",
    },
    xaxis: {
        tickAmount: 12,
        type: "category",
    },
    yaxis: {
        max: 70,
    },
}

export let CreatedProject: ChartOptions | any = {
    series: [{
        name: 'TEAM A',
        type: 'column',
        data: [220, , 250, , 210, , 210, , 270, , 220, , 250, , 260, , 210, , 230]
    }, {
        name: 'TEAM B',
        type: 'area',
        data: [210, 170, 240, 160, 200, 170, 200, 150, 260, 170, 210, 170, 240, 160, 250, 140, 200, 140, 220, 220]
    }],
    chart: {
        height: 335,
        type: 'area',
        stacked: false,
        toolbar: {
            show: false,
        }
    },
    stroke: {
        width: [0, 2, 5],
        curve: 'stepline'
    },
    plotOptions: {
        bar: {
            columnWidth: '100px'
        }
    },
    colors: ['#bebebe', primary_color],
    dropShadow: {
        enabled: true,
        top: 5,
        left: 6,
        bottom: 5,
        blur: 2,
        color: primary_color,
        opacity: 0.5,
    },
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.5,
            opacityTo: 0.1,
            stops: [0, 90, 100]
        }
    },
    grid: {
        show: true,
        xaxis: {
            lines: {
                show: true,
            }
        },
        yaxis: {
            lines: {
                show: true,
            }
        },
    },
    xaxis: {
        categories: ["Jan", "", "feb", "", "Mar", "", "Apr", "", "May", "", "Jun", "", "July", "", "Aug", "", "Sep", "", "Oct", ""],
        labels: {
            style: {
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 500,
                colors: '#8D8D8D',
            },
        },
        axisBorder: {
            show: false
        },
    },
    dataLabels: {
        enabled: false,
    },
    yaxis: {
        labels: {
            style: {
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 500,
                colors: '#8D8D8D',
            },
        },
    },
    legend: {
        show: false,
    },
    tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, }: any) {
            return '<div class="apex-tooltip p-2">' + '<span>' + '<span class="bg-primary">' + '</span>' + 'Project Created' + '<h3>' + '$' + series[seriesIndex][dataPointIndex] + '<h3/>' + '</span>' + '</div>';
        },
    },
}

export let generalSalesStats: ChartOptions | any = {
    series: [70],
    chart: {
        height: 370,
        type: 'radialBar',
        offsetY: 0,
    },
    stroke: {
        dashArray: 25,
        curve: 'smooth',
        lineCap: 'round',
    },
    grid: {
        padding: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        },
    },
    plotOptions: {
        radialBar: {
            startAngle: 0,
            endAngle: 360,
            hollow: {
                size: '75%',
                image: 'assets/images/apexchart/radial-image.png',
                imageWidth: 140,
                imageHeight: 140,
                imageClipped: false,
            },
            track: {
                show: true,
                background: 'rgba(43, 95, 96, 0.1)',
                strokeWidth: '97%',
                opacity: 0.4,
            },
            dataLabels: {
                show: true,
                name: {
                    show: true,
                    fontSize: '16px',
                    fontFamily: undefined,
                    fontWeight: 600,
                    color: undefined,
                    offsetY: -10,
                },
                value: {
                    show: true,
                    // ...fontCommon,
                    colors: '#848789',
                    fontFamily: '"Nunito Sans", sans-serif',
                    fontWeight: 600,
                    fontSize: '20px',
                    color: '#292929',
                    offsetY: 6,
                    formatter: function (val: string) {
                        return val + '%';
                    },
                },
            },
        },
    },
    labels: ['New: 2.4k', 'Returning: 3.2k'],
    colors: ['var(--theme-default)', 'rgba(43, 94, 94, 0.1)'],
    legend: {
        show: true,
        position: 'bottom',
        // ...fontCommon,
        colors: '#848789',
        fontSize: '14px',
        fontFamily: '"Nunito Sans", sans-serif',
        fontWeight: 600,
        markers: {
            width: 18,
            height: 18,
            strokeWidth: 5,
            colors: '#fff',
            strokeColors: 'rgba(43, 95, 96 ,0.03)',
            radius: 20,
        },
        onItemClick: {
            toggleDataSeries: false,
        },
        onItemHover: {
            highlightDataSeries: false,
        },
    },
    responsive: [
        {
            breakpoint: 1600,
            options: {
                plotOptions: {
                    radialBar: {
                        hollow: {
                            size: '68%',
                            imageWidth: 140,
                            imageHeight: 140,
                        },
                        dataLabels: {
                            name: {
                                fontSize: '14px',
                                offsetY: -8,
                            },
                            value: {
                                fontSize: '18px',
                            },
                        },
                    },
                },
            },
        },
        {
            breakpoint: 676,
            options: {
                chart: {
                    height: 350,
                },
                plotOptions: {
                    radialBar: {
                        hollow: {
                            size: '68%',
                        },
                    },
                },
            },
        },
        {
            breakpoint: 576,
            options: {
                chart: {
                    height: 320,
                },
                plotOptions: {
                    radialBar: {
                        hollow: {
                            size: '70%',
                            imageWidth: 120,
                            imageHeight: 120,
                        },
                    },
                },
            },
        },
        {
            breakpoint: 531,
            options: {
                chart: {
                    height: 300,
                },
                plotOptions: {
                    radialBar: {
                        hollow: {
                            size: '70%',
                            imageWidth: 100,
                            imageHeight: 100,
                        },
                    },
                },
            },
        },
        {
            breakpoint: 426,
            options: {
                chart: {
                    height: 280,
                },
                plotOptions: {
                    radialBar: {
                        hollow: {
                            size: '70%',
                            imageWidth: 100,
                            imageHeight: 100,
                        },
                    },
                },
            },
        },
    ],
};

export let categoriesSales: ChartOptions | any = {
    series: [52, 35, 15, 45],
    chart: {
        type: 'donut',
        height: 200,
    },
    dataLabels: {
        enabled: false
    },
    legend: {
        show: false
    },
    responsive: [{
        breakpoint: 1700,
        options: {
            chart: {
                height: 150
            },
        },
    }, {
        breakpoint: 1440,
        options: {
            chart: {
                height: 205
            },
        },
    }, {
        breakpoint: 992,
        options: {
            chart: {
                height: 160
            },
        },
    }
        , {
        breakpoint: 421,
        options: {
            chart: {
                height: 170
            },
        },
    }
    ],
    plotOptions: {
        pie: {
            expandOnClick: false,
            donut: {
                size: "70%",
                labels: {
                    show: true,
                    value: {
                        offsetY: 5,
                    },
                    total: {
                        show: true,
                        fontSize: "14px",
                        color: "#848789",
                        fontFamily: "Outfit', sans-serif",
                        fontWeight: 400,
                        label: "Total",
                        formatter: () => "60%",
                    },
                },
            },
        },
    },
    yaxis: {
        labels: {
            formatter: function (val: number) {
                return val / 100 + "$";
            },
        },
    },
    colors: [primary_color, '#e69800', '#54BA4Acf', secondary_color],
}

export let totalEarned: ChartOptions | any = {
    series: [{
        name: "Desktops",
        data: [50, 50, 50, 25, 25, 25, 2, 2, 2, 25, 25, 25, 62, 62],
    }],
    chart: {
        type: 'area',
        height: 200,
        // offsetY: -20,
        zoom: {
            enabled: false
        },
        toolbar: {
            show: false,
        },
        dropShadow: {
            enabled: true,
            top: 5,
            left: 0,
            bottom: 3,
            blur: 2,
            color: primary_color,
            opacity: 0.2,
        },
    },
    colors: [primary_color],
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.6,
            opacityTo: 0.2,
            stops: [0, 100, 100]
        }
    },
    dataLabels: {
        enabled: false
    },
    grid: {
        show: false,
    },
    xaxis: {
        labels: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        show: false,
    },
    stroke: {
        curve: 'smooth',
        width: 2,
    },
}

export let budgetChart: ChartOptions | any = {
    series: [{
        name: "Desktops",
        data: [15, 14, 11, 20, 10, 15, 11],
    }],
    chart: {
        type: 'area',
        height: 120,
        offsetY: 10,
        zoom: {
            enabled: false
        },
        toolbar: {
            show: false,
        },
        dropShadow: {
            enabled: true,
            top: 5,
            left: 0,
            bottom: 3,
            blur: 2,
            color: primary_color,
            opacity: 0.2,
        },
    },
    colors: [primary_color],
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.6,
            opacityTo: 0.2,
            stops: [0, 100, 100]
        }
    },
    dataLabels: {
        enabled: false
    },
    grid: {
        show: false,
    },
    xaxis: {
        labels: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        show: false,
    },
    stroke: {
        curve: 'smooth',
        width: 2,
    },
    markers: {
        discrete: [{
            seriesIndex: 0,
            dataPointIndex: 3,
            fillColor: primary_color,
            strokeColor: "#fff",
            size: 6,
            shape: "circle"
        },
        ],
    },
}

export let monthlyChart1: ChartOptions | any = {
    series: [{
        name: 'Growth',
        data: [0, 14, 5, 20, 14, 30]
    }],
    chart: {
        height: 120,
        type: 'line',
        stacked: true,
        offsetY: 40,
        toolbar: {
            show: false
        }
    },
    grid: {
        show: false,
        borderColor: '#000000',
        strokeDashArray: 0,
        position: 'back',
        xaxis: {
            lines: {
                show: false,
            }
        },
        yaxis: {
            lines: {
                show: true,
            }
        }
    },
    colors: [primary_color],
    stroke: {
        width: 3,
        curve: 'smooth'
    },
    xaxis: {
        labels: {
            show: false
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        min: -10,
        max: 40,
        labels: {
            show: false
        }
    },
    markers: {
        discrete: [{
            seriesIndex: 0,
            dataPointIndex: 0,
            fillColor: primary_color,
            strokeColor: primary_color,
            size: 4,
            shape: "circle"
        },
        {
            seriesIndex: 0,
            dataPointIndex: 1,
            fillColor: primary_color,
            strokeColor: primary_color,
            size: 4,
            shape: "circle"
        },
        {
            seriesIndex: 0,
            dataPointIndex: 2,
            fillColor: primary_color,
            strokeColor: primary_color,
            size: 4,
            shape: "circle"
        },
        {
            seriesIndex: 0,
            dataPointIndex: 3,
            fillColor: primary_color,
            strokeColor: primary_color,
            size: 4,
            shape: "circle"
        },
        {
            seriesIndex: 0,
            dataPointIndex: 4,
            fillColor: primary_color,
            strokeColor: primary_color,
            size: 4,
            shape: "circle"
        },
        {
            seriesIndex: 0,
            dataPointIndex: 5,
            fillColor: "#fff",
            strokeColor: primary_color,
            size: 5,
            shape: "circle"
        }
        ]
    }
}

export let invoices: ChartOptions | any = {
    series: [
        {
            data: [
                40, 50, 50, 50, 25, 25, 25, 60, 60, 60, 60, 45, 45, 45, 45, 25, 25, 25,
                25, 25, 60,
            ],
        },
    ],
    chart: {
        type: "line",
        height: 70,
        sparkline: {
            enabled: true,
        },
        dropShadow: {
            enabled: true,
            top: 8,
            left: 3,
            blur: 2,
            color: primary_color,
            opacity: 0.4,
        },
    },
    stroke: {
        curve: "stepline",
        width: 2,
    },
    colors: [primary_color],
    fill: {
        opacity: [0.5, 0.25, 1],
    },
    dataLabels: {
        enabled: false,
    },
    tooltip: {
        enabled: false,
    },
    markers: {
        hover: {
            sizeOffset: 4,
        },
        discrete: [
            {
                seriesIndex: 0,
                dataPointIndex: 1,
                fillColor: "#fff",
                strokeColor: primary_color,
                size: 3,
                shape: "circle",
            },
            {
                seriesIndex: 0,
                dataPointIndex: 4,
                fillColor: "#fff",
                strokeColor: primary_color,
                size: 3,
                shape: "circle",
            },
            {
                seriesIndex: 0,
                dataPointIndex: 7,
                fillColor: "#fff",
                strokeColor: primary_color,
                size: 3,
                shape: "circle",
            },
            {
                seriesIndex: 0,
                dataPointIndex: 11,
                fillColor: "#fff",
                strokeColor: primary_color,
                size: 3,
                shape: "circle",
            },
            {
                seriesIndex: 0,
                dataPointIndex: 15,
                fillColor: "#fff",
                strokeColor: primary_color,
                size: 3,
                shape: "circle",
            },
            {
                seriesIndex: 0,
                dataPointIndex: 20,
                fillColor: "#fff",
                strokeColor: primary_color,
                size: 3,
                shape: "circle",
            },
        ],
    },
    responsive: [
        {
            breakpoint: 1320,
            options: {
                chart: {
                    offsetX: 0,
                }
            },
        },
        {
            breakpoint: 1236,
            options: {
                chart: {
                    height: 80,
                }
            },
        },
        {
            breakpoint: 381,
            options: {
                chart: {
                    width: 200,
                    offsetX: 25,
                }
            },
        },
    ]
}

export let totalEarningData: ChartOptions | any = {
    series: [
        {
            name: 'series2',
            data: [15, 25, 20, 35, 60, 30, 20, 30, 20, 35, 25, 20],
        },
    ],
    colors: [primary_color, "#d2601a"],
    chart: {
        height: 95,
        type: 'bar',
        sparkline: {
            enabled: true,
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: 'smooth',
    },
    plotOptions: {
        bar: {
            borderRadius: 3,
            distributed: true,
            columnWidth: "50%",
            barHeight: '38%',
            dataLabels: {
                position: 'top',
            },
        }
    },
    responsive: [
        {
            breakpoint: 1700,
            options: {
                chart: {
                    height: 86,
                },
            },
        },
        {
            breakpoint: 1699,
            options: {
                chart: {
                    height: 95,
                },
            },
        },
        {
            breakpoint: 1460,
            options: {
                grid: {
                    padding: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 5,
                    },
                },
            },
        },
        {
            breakpoint: 376,
            options: {
                chart: {
                    height: 50,
                },
            },
        },
    ],
}

export let totalExpenseData: ChartOptions | any = {
    series: [{
        name: "Desktops",
        data: [50, 50, 50, 25, 25, 25, 2, 2, 2, 25, 25, 25, 62, 62, 62, 35, 35, 35, 66, 66],
    }],
    chart: {
        height: 100,
        type: 'area',
        zoom: {
            enabled: false
        },
        toolbar: {
            show: false,
        },
        dropShadow: {
            enabled: true,
            top: 5,
            left: 0,
            bottom: 3,
            blur: 2,
            color: primary_color,
            opacity: 0.2,
        },
    },
    colors: [primary_color],
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.5,
            opacityTo: 0.1,
            stops: [0, 90, 100]
        }
    },
    tooltip: {
        enabled: false
    },
    dataLabels: {
        enabled: false
    },
    grid: {
        show: false,
    },
    xaxis: {
        labels: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        show: false,
    },
    stroke: {
        curve: 'straight',
        width: 2,
    },
    markers: {
        discrete: [{
            seriesIndex: 0,
            dataPointIndex: 12,
            fillColor: primary_color,
            strokeColor: '#fff',
            size: 5,
            shape: "circle"
        }],
    }
}

export let onlineData: ChartOptions | any = {
    series: [
        {
            name: "Activity",
            data: [42, 44, 55, 66, 55, 86, 52, 44, 44, 66, 55, 86, 52, 44, 44],
        },
    ],
    chart: {
        height: 130,
        type: "bar",
        toolbar: {
            show: false,
        },
        sparkline: {
            enabled: true,
        },
    },
    plotOptions: {
        bar: {
            distributed: true,
            borderRadius: 3,
            columnWidth: "40%",
        },
    },
    dataLabels: {
        enabled: false,
    },
    grid: {
        show: false,
    },
    xaxis: {
        labels: {
            show: false
        },
    },
    legend: {
        show: false,
    },
    yaxis: {
        labels: {
            show: false
        },
    },
    colors: ['#678f4433', '#678f4433', '#678f4433', '#678f4433', '#678f4433', primary_color, '#678f4433', '#678f4433', '#678f4433', '#678f4433', '#678f4433', '#678f4433', '#678f4433', '#678f4433', '#678f4433'],
}

export let offlineData: ChartOptions | any = {
    series: [{
        name: "Desktops",
        data: [50, 50, 50, 25, 25, 25, 2, 2, 2, 25, 25, 25, 62, 62, 62, 35, 35, 35, 66, 66],
    }],
    chart: {
        type: 'area',
        offsetY: 30,
        height: 172,
        zoom: {
            enabled: false
        },
        toolbar: {
            show: false,
        },
        dropShadow: {
            enabled: true,
            top: 5,
            left: 0,
            bottom: 3,
            blur: 2,
            color: secondary_color,
            opacity: 0.2,
        },
    },
    colors: [secondary_color],
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.5,
            opacityTo: 0.1,
            stops: [0, 90, 100]
        }
    },
    dataLabels: {
        enabled: false
    },
    grid: {
        show: false,
    },
    xaxis: {
        labels: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        show: false,
    },
    stroke: {
        curve: 'straight',
        width: 2,
    },
    markers: {
        discrete: [{
            seriesIndex: 0,
            dataPointIndex: 12,
            fillColor: secondary_color,
            strokeColor: '#fff',
            size: 5,
            shape: "circle"
        }],
    },
    responsive: [{
        breakpoint: 1661,
        options: {
            chart: {
                height: 140
            },
        },
    }
    ],
}


function generateMinuteWiseTimeSeries(baseval: number, count: number, yrange: { min: number; max: number }) {
    var i = 0;
    var series = [];
    while (i < count) {
        var x = baseval;
        var y =
            (Math.sin(i / trigoStrength) * (i / trigoStrength) +
                i / trigoStrength +
                1) *
            (trigoStrength * 2);

        series.push([x, y]);
        baseval += 300000;
        i++;
    }
    return series;
}

function generateData(baseval: number, count: number, yrange: { min: any; max: any; }) {
    var i = 0;
    var series = [];
    while (i < count) {
        var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
        var y =
            Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
        var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

        series.push([x, y, z]);
        baseval += 86400000;
        i++;
    }
    return series;
}


