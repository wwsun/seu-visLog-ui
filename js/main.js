/**
 * Created by Weiwei on 12/17/2014.
 */

var mainPage = {

    sessionLineChart : echarts.init(document.getElementById('session-timeline')),

    sessionLineOption : {
        tooltip : {
            trigger: 'axis'
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : []
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
                name:'sessions',
                type:'line',
                data:[],
                markPoint : {
                    data : [
                        {type : 'max', name: 'Max'},
                        {type : 'min', name: 'Min'}
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

$.getJSON('./data/site-overview.json', function (json) {

    $('#session-sum').html(json.totalSessions);

    setOverviewTable('#top-referrals', json.topReferral);
    setOverviewTable('#top-engines', json.topSearchEngine);
    setOverviewTable('#top-pages', json.topActivePages);
    setKeywordCloud(json.topKeywords);

    mainPage.sessionLineOption.xAxis[0].data = json.sessionTrends.hour;
    mainPage.sessionLineOption.series[0].data = json.sessionTrends.dup;
    mainPage.sessionLineChart.setOption(mainPage.sessionLineOption);

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