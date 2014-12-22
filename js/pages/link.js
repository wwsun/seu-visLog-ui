/**
 * Created by Weiwei on 12/15/2014.
 */

var linkPage = {
    overviewForceChart : echarts.init(document.getElementById('svg-wrapper')),
    subForceChart : echarts.init(document.getElementById('path-detail')),
    degreePieChart : echarts.init(document.getElementById('degree-pie')),
    visitLineChart : echarts.init(document.getElementById('visit-flow')),
    sourceCategoryBarChart : echarts.init(document.getElementById('landing-source')),

    overviewForceOption : {
        title: {
            text: '页面链接关系',
            subtext: '测试数据，仅供演示',
            x: 'right',
            y: 'bottom'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} : {b}'
        },
        toolbox: {
            show: true,
            feature: {
                restore: {show: true},
                magicType: {show: true, type: ['force', 'chord']},
                saveAsImage: {show: true}
            }
        },
        legend: {
            x: 'left',
            data: ['站内', '站外']
        },
        series: [
            {
                type: 'force',
                name: "链接关系",
                ribbonType: false,
                categories: [
                    {
                        name: '站点'
                    },
                    {
                        name: '站内'
                    },
                    {
                        name: '站外'
                    }
                ],
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            textStyle: {
                                color: '#333'
                            }
                        },
                        nodeStyle: {
                            brushType: 'both',
                            borderColor: 'rgba(255,215,0,0.6)',
                            borderWidth: 1
                        }
                    },
                    emphasis: {
                        label: {
                            show: false
                            // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                        },
                        nodeStyle: {
                            //r: 30
                        },
                        linkStyle: {}
                    }
                },
                useWorker: false,
                minRadius: 15,
                maxRadius: 25,
                gravity: 1.1,
                scaling: 1.1,
                nodes: [],
                links: []
            }
        ]
    },

    subForceChartOption : { },

    visitLineOption : {
        tooltip : {
            trigger: 'axis'
        },
        toolbox: {
            show : true,
            feature : {
                restore : {
                    show : true
                }
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
                name:'访问量',
                type:'line',
                data:[11, 11, 15, 22, 12, 13, 10, 2, 4, 5, 5],
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
    },

    sourceCategoryChartOption :  {
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['页面来源']
        },
        toolbox: {
            show : false
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                data : ['首页','产品目录A','产品目录B','搜索引擎','活动宣传','站内搜索']
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'页面来源',
                type:'bar',
                data:[100, 20, 10, 4, 60, 20, 30],
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
    }


};

$.getJSON('./data/demo.json', function (json) {

    linkPage.overviewForceOption.series[0].nodes = json.nodes;
    linkPage.overviewForceOption.series[0].links = json.links;

    linkPage.overviewForceChart.setOption(linkPage.overviewForceOption);
    linkPage.subForceChart.setOption(linkPage.overviewForceOption);
    linkPage.visitLineChart.setOption(linkPage.visitLineOption);
    linkPage.sourceCategoryBarChart.setOption(linkPage.sourceCategoryChartOption);

    setDegreePie();

    linkPage.subForceChart.on(echarts.config.EVENT.CLICK, focus);
});

function setDegreePie() {
    $('#degree-pie').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false,
            spacing: [0, 10, 0, 10]
        },
        credits : {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        title: {
            text: 'Degree',
            align: 'center',
            verticalAlign: 'middle',
            y: 50
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white',
                        textShadow: '0px 1px 2px black'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%']
            }
        },
        series: [{
            type: 'pie',
            name: 'Degree',
            innerSize: '50%',
            data: [
                ['In',   45.0],
                ['Out',  26.8]

            ]
        }]
    });
}

function focus(param) {
    var data = param.data;
    //var links = linkPage.subForceChartOption.series[0].links;
    var nodes = linkPage.overviewForceOption.series[0].nodes;
    if (
        data.source !== undefined
        && data.target !== undefined
    ) {
        var sourceNode = nodes[data.source];
        var targetNode = nodes[data.target];
        console.log("选中了边 " + sourceNode.name + ' -> ' + targetNode.name + ' (' + data.weight + ')');
    } else {
        console.log("选中了" + data.name + '(' + data.value + ')');
    }
}

//myChart.on(echarts.config.EVENT.CLICK, focus);
//myChart.on(echarts.config.EVENT.FORCE_LAYOUT_END, function () {
//    console.log(myChart.chart.force.getPosition());
//});