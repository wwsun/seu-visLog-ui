/**
 * Created by Weiwei on 12/17/2014.
 */

var mainPage = {
    myChart: echarts.init(document.getElementById('session-timeline')),

    option: {
        tooltip: {
            trigger: 'axis'
        },
        toolbox: {
            show: true,
            feature: {
                restore: {show: true}
            }
        },
        calculable: true,
        xAxis: [
            {
                type: 'hour',
                boundaryGap: false,
                data:[]
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    formatter: '{value}'
                }
            }
        ],
        series: [
            {
                name: 'sessions',
                type: 'line',
                data: [],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            }
        ]
    }
};

$.getJSON('./data/site-overview.json', function (json) {

    $('#session-total h1').html(json.totalSessions);

    setOverviewTable('#top-referrals', json.topReferral);
    setOverviewTable('#top-engines', json.topSearchEngine);
    setOverviewTable('#top-pages', json.topActivePages);
    setKeywordCloud(json.topKeywords);

    mainPage.option.xAxis[0].data = json.sessionTrends.hour;
    mainPage.option.series[0].data = json.sessionTrends.dup;
    mainPage.myChart.setOption(mainPage.option);

});


function setOverviewTable(tableBodyId, arr) {
    var table = $(tableBodyId);
    for (var i = 0; i < arr.length; i++) {
        table.append('<tr><td>' + i + '</td><td>' + arr[i].name + '</td><td>' + arr[i].dup + '</td></tr>');
    }
}

function setKeywordCloud(arr) {
    WordCloud(document.getElementById("word_cloud"), {
        list: arr,
        minSize: "1"
    });
}