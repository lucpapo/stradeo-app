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

export let weeklyRevenueGrowth: ChartOptions | any = {
  series: [
    {
      name: 'Good',
      data: [170, 250, 350, 150, 230, 120, 330, 350, 280, 300, 250, 110],
    },
    {
      name: 'Very Good',
      data: [290, 180, 120, 290, 370, 250, 230, 200, 140, 220, 220, 330],
    },
  ],
  colors: [primary_color, secondary_color],
  chart: {
    type: 'bar',
    height: 280,
    // width: '100%',
    offsetY: 10,
    offsetX: 0,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      dataLabels: {
        position: 'top',
      },
      horizontal: false,
      borderRadius: 8,
      columnWidth: '45%',
      barHeight: '100%',
      s̶t̶a̶r̶t̶i̶n̶g̶S̶h̶a̶p̶e̶: 'rounded',
      e̶n̶d̶i̶n̶g̶S̶h̶a̶p̶e̶: 'rounded',
    },
  },
  grid: {
    show: false,
    padding: {
      left: -8,
      right: 0,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 1,
    colors: ['#fff'],
  },
  tooltip: {
    shared: true,
    intersect: false,
    x: {
      show: true,
      format: 'dd MMM',
      // formatter: undefined,
    },
    y: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
  xaxis: {
    show: false,
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
  legend: {
    show: false,
  },
}

export let sellingConnection: ChartOptions | any = {
  series: [
    {
      name: "Successfully Sold",
      type: "area",
      data: [45, 30, 28, 35, 25, 30, 40],
    },
    {
      name: "Product Viewer",
      type: "area",
      data: [30, 42, 37, 25, 34, 38, 27],
    },
  ],
  chart: {
    height: 340,
    type: "line",
    stacked: false,
    toolbar: {
      show: false,
    },
    dropShadow: {
      enabled: true,
      top: 2,
      left: 0,
      blur: 4,
      color: "#000",
      opacity: 0.08,
    },
  },
  stroke: {
    width: [2, 2, 2],
    curve: "straight",
  },
  grid: {
    show: true,
    borderColor: "var(--chart-border)",
    strokeDashArray: 0,
    position: "back",
    xaxis: {
      lines: {
        show: false,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  colors: [primary_color, secondary_color],
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "vertical",
      opacityFrom: 0.4,
      opacityTo: 0,
      stops: [0, 100],
    },
  },
  labels: [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ],
  markers: {
    size: 5
  },
  xaxis: {
    type: "category",
    tickAmount: 4,
    tickPlacement: "between",
    tooltip: {
      enabled: false,
    },
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    labels: {
      style: {
        fontFamily: 'Outfit, sans-serif',
        fontWeight: 500,
        colors: '#8D8D8D',
      },
    },
  },
  legend: {
    show: true,
  },
  yaxis: {
    tickAmount: 4,
    min: 10,
    max: 60,
    show: true,
    labels: {
      formatter: function (val: string) {
        return "$" + val + "k" + "";
      },
      style: {
        fontFamily: 'Outfit, sans-serif',
        fontWeight: 500,
        colors: '#3D434A',
      },
    },
  },
  tooltip: {
    shared: false,
    intersect: false,
  },
  responsive: [
    {
      breakpoint: 1451,
      options: {
        chart: {
          height: 360,
        }
      }
    },
  ]
}

export let salesTred: ChartOptions | any = {
  series: [{
    name: 'TEAM A',
    type: 'area',
    data: [20, 50, 60, 180, 90, 340, 120, 250, 190, 100, 180, 380, 190, 220, 100, 90, 140, 70, 130, 90, 100, 50, 0]
  }, {
    name: 'TEAM B',
    type: 'line',
    data: [20, 70, 30, 100, 120, 220, 250, 100, 200, 300, 330, 270, 300, 200, 180, 220, 130, 300, 220, 180, 40, 70, 0]
  }],
  chart: {
    height: 292,
    type: 'line',
    toolbar: {
      show: false,
    },
    dropShadow: {
      enabled: true,
      top: 4,
      left: 1,
      blur: 8,
      opacity: 0.1,
      color: primary_color
    },

  },
  stroke: {
    curve: 'smooth',
    width: [3, 3],
    dashArray: [0, 4]

  },
  grid: {
    show: true,
    borderColor: 'rgba(106, 113, 133, 0.30)',
    strokeDashArray: 3,
  },
  fill: {
    type: 'solid',
    opacity: [0, 1],
  },
  labels: ['Jan', '', 'Feb', '', 'Mar', '', 'Apr', '', 'May', '', 'Jun', '', 'Jul', '', 'Aug', '', 'Sep', '', 'Oct', '', 'Nov', '', 'Dec'],
  markers: {
    size: [3, 0],
    colors: ['#3D434A'],
    strokeWidth: [0, 0],
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: function (y: number) {
        if (typeof y !== "undefined") {
          return y.toFixed(0) + " points";
        }
        return y;
      }
    }
  },
  annotations: {
    xaxis: [{
      x: 550,
      strokeDashArray: 5,
      borderWidth: 3,
      borderColor: '#7a4bc369',
    },
    ],
    points: [{
      x: 550,
      y: 330,
      marker: {
        size: 8,
        fillColor: 'var(--theme-default)',
        strokeColor: "#ffffff",
        strokeWidth: 4,
        radius: 5,
      },
      label: {
        borderWidth: 1,
        offsetY: 0,
        text: '32.10k',
        style: {
          fontSize: '14px',
          fontWeight: '600',
          fontFamily: 'Outfit, sans-serif',
        }
      }
    }],
  },
  legend: {
    show: false,
  },
  colors: ['#678f44', '#8D8D8D'],
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
      formatter: function (value: string) {
        return value + "k";
      },
      style: {
        fontFamily: 'Outfit, sans-serif',
        fontWeight: 500,
        colors: '#3D434A',
      },
    },
  },
  responsive: [
    {
      breakpoint: 1727,
      options: {
        chart: {
          height: 350,
        }
      }
    },
    {
      breakpoint: 1650,
      options: {
        chart: {
          height: 380,
        }
      }
    },
    {
      breakpoint: 1200,
      options: {
        chart: {
          height: 300,
        }
      }
    },
    {
      breakpoint: 1131,
      options: {
        chart: {
          height: 340,
        }
      }
    },
    {
      breakpoint: 576,
      options: {
        series: [{
          name: 'TEAM A',
          type: 'area',
          data: [0, 50, 60, 180, 90, 340, 120, 250, 190, 100, 180, 380, 190, 220, 100, 90, 140]
        }, {
          name: 'TEAM B',
          type: 'line',
          data: [0, 70, 30, 100, 120, 220, 250, 100, 200, 300, 330, 270, 300, 200, 180, 220, 130]
        }],
      }
    },
  ]
}

export let TotalSells: ChartOptions | any = {
  series: [
    {
      name: "",
      data: [
        30, 29.31, 29.7, 29.7, 31.32, 31.65, 31.13, 29.8, 31.79, 31.67, 32.39,
        30.63, 32.89, 31.99, 31.23, 31.57, 30.84, 31.07, 31.41, 31.17, 34, 34.5,
        34.5, 32.53, 31.37, 32.43, 32.44, 30.2, 30.14, 30.65, 30.4, 30.65,
        31.43, 31.89, 31.38, 30.64, 31.02, 30.33, 32.95, 31.89, 30.01, 30.88,
        30.69, 30.58, 32.02, 32.14, 30.37, 30.51, 32.65, 32.64, 32.27, 32.1,
        32.91, 30.65, 30.8, 31.92,
      ],
    },
  ],
  chart: {
    type: "area",
    height: 90,
    offsetY: -10,
    offsetX: 0,
    toolbar: {
      show: false,
    },
  },
  stroke: {
    width: 2,
    curve: "smooth",
  },
  grid: {
    show: false,
    borderColor: "var(--light)",
    padding: {
      top: 5,
      right: 0,
      bottom: -30,
      left: 0,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.5,
      opacityTo: 0.1,
      stops: [0, 90, 100],
    },
  },
  dataLabels: {
    enabled: false,
  },
  colors: [primary_color],
  xaxis: {
    labels: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    opposite: false,
    min: 29,
    max: 35,
    logBase: 100,
    tickAmount: 4,
    forceNiceScale: false,
    floating: false,
    decimalsInFloat: undefined,
    labels: {
      show: false,
      offsetX: -12,
      offsetY: -15,
      rotate: 0,
    },
  },
  legend: {
    horizontalAlign: "left",
  },
};

export let dailyOrders: ChartOptions | any = {
  series: [
    {
      name: "",
      data: [
        30, 32.31, 31.47, 30.69, 29.32, 31.65, 31.13, 31.77, 31.79, 31.67,
        32.39, 32.63, 32.89, 31.99, 31.23, 31.57, 30.84, 31.07, 31.41, 31.17,
        32.37, 32.19, 32.51, 32.53, 31.37, 30.43, 30.44, 30.2, 30.14, 30.65,
        30.4, 30.65, 31.43, 31.89, 31.38, 30.64, 30.02, 30.33, 30.95, 31.89,
        31.01, 30.88, 30.69, 30.58, 32.02, 32.14, 32.37, 32.51, 32.65, 32.64,
        32.27, 32.1, 32.91, 33.65, 33.8, 33.92,
      ],
    },
  ],
  chart: {
    type: "area",
    height: 90,
    offsetY: -10,
    offsetX: 0,
    toolbar: {
      show: false,
    },
  },
  stroke: {
    width: 2,
    curve: "smooth",
  },
  grid: {
    show: false,
    borderColor: "var(--light)",
    padding: {
      top: 5,
      right: 0,
      bottom: -30,
      left: 0,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.5,
      opacityTo: 0.1,
      stops: [0, 80, 100],
    },
  },
  dataLabels: {
    enabled: false,
  },
  colors: [secondary_color],
  xaxis: {
    labels: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },

    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    opposite: false,
    min: 29,
    max: 35,
    logBase: 100,
    tickAmount: 4,
    forceNiceScale: false,
    floating: false,
    decimalsInFloat: undefined,
    labels: {
      show: false,
      offsetX: -12,
      offsetY: -15,
      rotate: 0,
    },
  },
  legend: {
    horizontalAlign: "left",
  },
};

export let ordersValue: ChartOptions | any = {
  series: [
    {
      name: "",
      data: [
        30, 29.31, 29.7, 29.7, 31.32, 31.65, 31.13, 29.8, 31.79, 31.67, 32.39,
        30.63, 32.89, 31.99, 31.23, 31.57, 30.84, 31.07, 31.41, 31.17, 34, 34.5,
        34.5, 32.53, 31.37, 32.43, 32.44, 30.2, 30.14, 30.65, 30.4, 30.65,
        31.43, 31.89, 31.38, 30.64, 31.02, 30.33, 32.95, 31.89, 30.01, 30.88,
        30.69, 30.58, 32.02, 32.14, 30.37, 30.51, 32.65, 32.64, 32.27, 32.1,
        32.91, 30.65, 30.8, 31.92,
      ],
    },
  ],
  chart: {
    type: "area",
    height: 90,
    offsetY: -10,
    offsetX: 0,
    toolbar: {
      show: false,
    },
  },
  stroke: {
    width: 2,
    curve: "smooth",
  },
  grid: {
    show: false,
    borderColor: "var(--light)",
    padding: {
      top: 5,
      right: 0,
      bottom: -30,
      left: 0,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.5,
      opacityTo: 0.1,
      stops: [0, 90, 100],
    },
  },
  dataLabels: {
    enabled: false,
  },
  colors: ['#FFAA05'],
  xaxis: {
    labels: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },

    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    opposite: false,
    min: 29,
    max: 35,
    logBase: 100,
    tickAmount: 4,
    forceNiceScale: false,
    floating: false,
    decimalsInFloat: undefined,
    labels: {
      show: false,
      offsetX: -12,
      offsetY: -15,
      rotate: 0,
    },
  },
  legend: {
    horizontalAlign: "left",
  },
  responsive: [],
};

export let dailyRevenue: ChartOptions | any = {
  series: [
    {
      name: "",
      data: [
        29, 30.31, 30.7, 31.69, 31.32, 31.65, 31.13, 31.77, 31.79, 31.67, 32.39,
        32.63, 32.89, 31.99, 31.23, 31.57, 30.84, 31.07, 31.41, 31.17, 32.37,
        32.19, 32.51, 32.53, 31.37, 30.43, 30.44, 30.2, 30.14, 30.65, 30.4,
        30.65, 31.43, 31.89, 31.38, 30.64, 30.02, 30.33, 30.95, 31.89, 31.01,
        30.88, 30.69, 30.58, 32.02, 32.14, 32.37, 32.51, 32.65, 32.64, 32.27,
        32.1, 32.91, 33.65, 33.8, 33.92,
      ],
    },
  ],
  chart: {
    type: "area",
    height: 90,
    offsetY: -10,
    offsetX: 0,
    toolbar: {
      show: false,
    },
  },
  stroke: {
    width: 2,
    curve: "smooth",
  },
  grid: {
    show: false,
    borderColor: "var(--light)",
    padding: {
      top: 5,
      right: 0,
      bottom: -30,
      left: 0,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.5,
      opacityTo: 0.1,
      stops: [0, 90, 100],
    },
  },
  dataLabels: {
    enabled: false,
  },
  colors: ['#FC4438'],
  xaxis: {
    labels: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    opposite: false,
    min: 29,
    max: 35,
    logBase: 100,
    tickAmount: 4,
    forceNiceScale: false,
    floating: false,
    decimalsInFloat: undefined,
    labels: {
      show: false,
      offsetX: -12,
      offsetY: -15,
      rotate: 0,
    },
  },
  legend: {
    horizontalAlign: "left",
  },
  responsive: [],
};

export let revenueChar: ChartOptions | any = {
  series: [
    {
      name: "Earning",
      data: [78, 45, 60, 78, 78, 45, 25, 50, 60, 60, 78, 40],
    },
    {
      name: "Expense",
      data: [-70, -70, -40, -30, -70, -30, -25, -45, -40, -50, -70, -50],
    },
  ],
  chart: {
    type: "bar",
    height: 323,
    stacked: true,
    toolbar: {
      show: false,
    },
  },
  colors: [primary_color, secondary_color],
  plotOptions: {
    bar: {
      columnWidth: "70%",
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  stroke: {
    width: 10,
    colors: ["var(--white)"],
  },
  grid: {
    show: false,
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: false,
      },
    },
  },
  yaxis: {
    labels: {
      formatter: function (val: string | number) {
        return + val;
      },
      style: {
        fontSize: "14px",
        colors: "$black",
        fontWeight: 500,
        fontFamily: "Lexend, sans-serif",
      },
    },
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    labels: {
      style: {
        fontSize: "13px",
        colors: "#959595",
        fontFamily: "Lexend, sans-serif",
      },
    },
    axisBorder: {
      show: true,
    },
    axisTicks: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1501,
      options: {
        chart: {
          height: 298,
        },
      },
    },
    {
      breakpoint: 480,
      options: {
        plotOptions: {
          bar: {
            columnWidth: "150%",
          },
        },
      },
    },
  ],
}

export let projectDeliveries: ChartOptions | any = {
  series: [
    {
      name: "This Month ",
      type: "area",
      data: [215, 260, 360, 420, 320, 280, 360]
    },
    {
      name: "This Month",
      type: "area",
      data: [90, 130, 280, 350, 400, 350, 400],
    },
  ],
  chart: {
    height: 307,
    type: "area",
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: [3, 3],
    curve: "straight",
    dashArray: [0, 6],
  },
  colors: [secondary_color, primary_color],
  markers: {
    discrete: [{
      seriesIndex: 0,
      dataPointIndex: 0,
      fillColor: "#fff",
      strokeColor: secondary_color,
      size: 5,
      shape: "circle"
    },
    {
      seriesIndex: 0,
      dataPointIndex: 1,
      fillColor: "#fff",
      strokeColor: secondary_color,
      size: 5,
      shape: "circle"
    },
    {
      seriesIndex: 0,
      dataPointIndex: 2,
      fillColor: "#fff",
      strokeColor: secondary_color,
      size: 5,
      shape: "circle"
    },
    {
      seriesIndex: 0,
      dataPointIndex: 3,
      fillColor: "#fff",
      strokeColor: secondary_color,
      size: 5,
      shape: "circle"
    },
    {
      seriesIndex: 0,
      dataPointIndex: 4,
      fillColor: "#fff",
      strokeColor: secondary_color,
      size: 5,
      shape: "circle"
    },
    {
      seriesIndex: 0,
      dataPointIndex: 5,
      fillColor: "#fff",
      strokeColor: secondary_color,
      size: 5,
      shape: "circle"
    },
    {
      seriesIndex: 0,
      dataPointIndex: 6,
      fillColor: "#fff",
      strokeColor: secondary_color,
      size: 5,
      shape: "circle"
    },
    ],
  },
  xaxis: {
    categories: [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun",
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      style: {
        fontSize: "13px",
        colors: "#959595",
        fontFamily: "Lexend, sans-serif",
      },
    },
  },
  yaxis: {
    labels: {
      formatter: function (val: string) {
        return val + "" + "k";
      },
      style: {
        fontSize: "14px",
        colors: "$black",
        fontWeight: 500,
        fontFamily: "Lexend, sans-serif",
      },
    },
  },
  fill: {
    colors: [secondary_color, primary_color],
    type: ["gradient", "gradient"],
    gradient: {
      shade: "light",
      type: "vertical",
      opacityFrom: 0.5,
      opacityTo: 0.1,
      stops: [0, 100, 0, 0],
    },
  },
  grid: {
    borderColor: "#f1f1f1",
  },
  legend: {
    show: false,
  }
}

export let monthlayChart: ChartOptions | any = {
  series: [
    {
      name: "Total",
      data: [10, 5, 10, 7, 40, 20, 30, 27, 40]
    },
  ],
  chart: {
    type: "area",
    toolbar: {
      show: false,
    },
  },
  colors: [primary_color],
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.4,
      opacityTo: 0.2,
      stops: [0, 100, 100]
    }
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 2,
    curve: "smooth",
  },
  grid: {
    show: false,
  },
  tooltip: {
    x: {
      show: false,
    },
    y: {
      show: false,
    },
    z: {
      show: false,
    },
    marker: {
      show: false,
    },
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
    tooltip: {
      enabled: false,
    },
  },
  yaxis: {
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
}