/**
 * Created by Weiwei on 12/17/2014.
 */

var mainPage = {
    myChart: echarts.init(document.getElementById('session-timeline'))
};

mainPage.option = {
    tooltip : {
        trigger: 'axis'
    },
    toolbox: {
        show : true,
        feature : {
            restore: {show: true}
        }
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['-11','-10','-9','-8','-7','-6','-5','-3','-2','-1','0']
        }
    ],
    yAxis : [
        {
            type : 'value',
            axisLabel : {
                formatter: '{value}'
            }
        }
    ],
    series : [
        {
            name:'访问趋势',
            type:'line',
            data:[22, 30, 5, 2, 11, 11, 15, 22, 12, 13, 10, 5],
            markPoint : {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name: '平均值'}
                ]
            }
        }
    ]
};

mainPage.myChart.setOption(mainPage.option);