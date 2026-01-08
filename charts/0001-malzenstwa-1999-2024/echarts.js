var firstChart = echarts.init(document.getElementById('main'));

var dataTable = [
    [1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    [150690, 151757, 143179, 140932, 142575, 140190, 147267, 157231, 172641, 178454, 172034, 155509, 134053, 130397, 114592, 118225, 117459, 121884, 119972, 119074, 109213, 77780, 90312, 79412, 68431, 59740],
    [68708, 59393, 51943, 51003, 52871, 51634, 59649, 68950, 76061, 79290, 78760, 72828, 72418, 73453, 65804, 70263, 71373, 71571, 72604, 73369, 74158, 67265, 78012, 76405, 77467, 75662],
    [219398, 211150, 195122, 191935, 195446, 191824, 206916, 226181, 248702, 257744, 250794, 228337, 206471, 203850, 180396, 188488, 188832, 193455, 192576, 192443, 183371, 145045, 168324, 155817, 145898, 135402]
];

option = {
    title: {
        text: 'Małżeństwa w Polsce w latach 1999-2024'
    },
    backgroundColor: '#FFF',
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            // Use axis to trigger tooltip
            type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
        }
    },
      toolbox: {
                show: true,
                feature: {
                  saveAsImage: {
                    show: true, // Enable export to image functionality
                    title: 'Save as Image', // Customize the tooltip title
                    name: 'chart',
                    backgroundColor: 'white',
                    pixelRatio: 4
                  }
                },
                right: '30px',
                top: '10px'
              },
              // Add export component
              export: {
                show: true,
                title: 'Export', // Customize the tooltip title
                name: 'chart',
                pixelRatio: 2
              },
    legend: {},
    xAxis: {
        type: 'value',
        max: 275000,
        interval: 25000,
    },
    yAxis: {
        type: 'category',
        data:  dataTable[0],
        inverse: true,
    },
    legend: {
        data: ['Konkordatowe','Cywilne'],
    },
    series: [
        {
            name: 'Konkordatowe',
            type: 'bar',
            stack: 'total',
            color: 'red',
            label: {
                show: true
            },
            emphasis: {
                focus: 'series'
            },
            data:  dataTable[1]
        },
        {
            name: 'Cywilne',
            type: 'bar',
            stack: 'total',
            label: {
                show: true
            },
            emphasis: {
                focus: 'series'
            },
            data: dataTable[2]
        },
        {
            name: 'Łącznie',
            type: 'bar',
            color: 'white',
            itemStyle: {
                opacity: 0
            },
            stack: 'total',
            emphasis: {
                disabled: 'true',
                focus: 'none'
            },
            data: dataTable[3]
        }
    ]
};

firstChart.setOption(option);