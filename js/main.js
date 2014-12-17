/**
 * Created by Weiwei on 12/15/2014.
 */

var myChart = echarts.init(document.getElementById('svg-wrapper'));
var pathDetailChart = echarts.init(document.getElementById('path-detail'));
var clickFlowChart = echarts.init(document.getElementById('click-flow'));
var jumpingChart = echarts.init(document.getElementById('jumping'));
var landingSourceChart = echarts.init(document.getElementById('landing-source'));

var options = {
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
};

$.getJSON('./data/demo.json', function (json) {

    options.series[0].nodes = json.nodes;
    options.series[0].links = json.links;

    myChart.setOption(options);
    pathDetailChart.setOption(options);
    clickFlowChart.setOption(lineOptions);
    jumpingChart.setOption(pieOptions);
    landingSourceChart.setOption(barOptions);
});


function focus(param) {
    var data = param.data;
    var links = options.series[0].links;
    var nodes = options.series[0].nodes;
    if (
        data.source !== undefined
        && data.target !== undefined
    ) { //点击的是边
        var sourceNode = nodes[data.source];
        var targetNode = nodes[data.target];
        console.log("选中了边 " + sourceNode.name + ' -> ' + targetNode.name + ' (' + data.weight + ')');
    } else { // 点击的是点
        console.log("选中了" + data.name + '(' + data.value + ')');
    }
}

myChart.on(echarts.config.EVENT.CLICK, focus);
myChart.on(echarts.config.EVENT.FORCE_LAYOUT_END, function () {
    console.log(myChart.chart.force.getPosition());
});

var lineOptions = {
    tooltip : {
        trigger: 'axis'
    },
    toolbox: {
        show : false
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['-7','-6','-5','-3','-2','-1','0']
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
            data:[11, 11, 15, 22, 12, 13, 10],
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

var pieOptions = {
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient : 'vertical',
        x : 'left',
        data:['跳入','跳出']
    },
    toolbox: {
        show : false
    },
    calculable : true,
    series : [
        {
            name:'页面跳入跳出',
            type:'pie',
            radius : ['50%', '70%'],
            itemStyle : {
                normal : {
                    label : {
                        show : false
                    },
                    labelLine : {
                        show : false
                    }
                },
                emphasis : {
                    label : {
                        show : true,
                        position : 'center',
                        textStyle : {
                            fontSize : '30',
                            fontWeight : 'bold'
                        }
                    }
                }
            },
            data:[
                {value:200, name:'跳入'},
                {value:50, name:'跳出'}
            ]
        }
    ]
};

var barOptions = {
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
};

//myChart.setOption({
//    tooltip : {
//        trigger: 'axis'
//    },
//    legend: {
//        data:['蒸发量','降水量']
//    },
//    toolbox: {
//        show : true,
//        feature : {
//            mark : {show: true},
//            dataView : {show: true, readOnly: false},
//            magicType : {show: true, type: ['line', 'bar']},
//            restore : {show: true},
//            saveAsImage : {show: true}
//        }
//    },
//    calculable : true,
//    xAxis : [
//        {
//            type : 'category',
//            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
//        }
//    ],
//    yAxis : [
//        {
//            type : 'value',
//            splitArea : {show : true}
//        }
//    ],
//    series : [
//        {
//            name:'蒸发量',
//            type:'bar',
//            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
//        },
//        {
//            name:'降水量',
//            type:'bar',
//            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
//        }
//    ]
//});

// --- 地图 ---
//var myChart2 = echarts.init(document.getElementById('mainMap'));
//myChart2.setOption({
//    tooltip : {
//        trigger: 'item',
//        formatter: '{b}'
//    },
//    series : [
//        {
//            name: '中国',
//            type: 'map',
//            mapType: 'china',
//            selectedMode : 'multiple',
//            itemStyle:{
//                normal:{label:{show:true}},
//                emphasis:{label:{show:true}}
//            },
//            data:[
//                {name:'广东',selected:true}
//            ]
//        }
//    ]
//});