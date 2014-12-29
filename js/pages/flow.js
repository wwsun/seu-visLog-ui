/**
 * Created by Weiwei on 12/28/2014.
 */

var flowPage = {
    mapChart : echarts.init(document.getElementById('main')),

    mapOption : {
        title : {
            text: 'Flow Distribution(www.made-in-china.com)',
            subtext: 'Caculated based on the session distribution.',
            x:'center',
            y:'top'
        },
        tooltip : {
            trigger: 'item',
            formatter : function (params) {
                var value = (params.value + '').split('.');
                value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
                return params.name + ' : ' + value;
            }
        },
        toolbox: {
            show : true,
            orient : 'vertical',
            x: 'right',
            y: 'center',
            feature : {
                mark : {show: true},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        dataRange: {
            min: 0,
            max: 73000,
            text:['High','Low'],
            realtime: false,
            calculable : true,
            color: ['orangered','yellow','lightskyblue']
            //color: ['#EE0000','#EE5C42','#EEE685']

        },
        series : [
            {
                name: 'Flow Distribution',
                type: 'map',
                mapType: 'world',
                roam: true,
                mapLocation: {
                    y : 60
                },
                itemStyle:{
                    emphasis:{label:{show:true}}
                }
            }
        ]
    }
};

$.getJSON('./data/geo-full.json', function (json) {
    flowPage.mapOption.series[0].data = json;
    flowPage.mapChart.setOption(flowPage.mapOption);
});
