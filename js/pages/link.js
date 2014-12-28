/**
 * Created by Weiwei on 12/15/2014.
 */

var linkPage = {
    //overviewForceChart : echarts.init(document.getElementById('svg-wrapper')),
    //subForceChart : echarts.init(document.getElementById('path-detail')),
    degreePieChart : echarts.init(document.getElementById('degree-pie')),
    //visitLineChart : echarts.init(document.getElementById('visit-flow')),
    sourceCategoryBarChart : echarts.init(document.getElementById('landing-source')),

    overviewForceOption : {
        tooltip: {
            trigger: 'item',
            formatter: '{b}'
        },
        toolbox: {
            show: true,
            feature: {
                restore: {show: true},
                magicType: {
                    show: true,
                    type: ['force', 'chord'],
                    option: {
                    chord: {
                        minRadius : 2,
                        maxRadius : 10,
                        ribbonType: false,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    rotate: true
                                },
                                chordStyle: {
                                    opacity: 0.2
                                }
                            }
                        }
                    },
                    force: {
                        minRadius : 5,
                        maxRadius : 8,
                        itemStyle : {
                            normal : {
                                label: {
                                    show: false
                                },
                                linkStyle : {
                                    opacity : 0.5
                                }
                            }
                        }
                    }
                }},
                saveAsImage: {show: true}
            }
        },
        legend: {
            x: 'left',
            data: ['in-site', 'out-site'],
            orient: 'vertical'
        },
        series: [
            {
                type: 'force',
                //name: "Link relations",
                ribbonType: false,
                categories: [
                    {
                        name: 'in-site'
                    },
                    {
                        name: 'out-site'
                    }
                ],
                itemStyle: {
                    normal: {
                        nodeStyle: {
                            brushType : 'both',
                            borderColor : 'rgba(255,215,0,0.4)',
                            borderWidth : 1
                        },
                        linkStyle: {
                            type: 'curve'
                        }
                    }
                },
                minRadius : 2,
                maxRadius : 10,
                coolDown: 0.995,
                steps: 10,
                nodes : [],
                links : [],
                //gravity: 1.1,
                //scaling: 1.1,
                //roam: 'move',
                //steps: 1,
                large: true,
                useWorker: true
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
                type : 'category'
                //data : ['首页','产品目录A','产品目录B','搜索引擎','活动宣传','站内搜索']
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
                //data:[100, 20, 10, 4, 60, 20, 30],
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

    degreePieChartOption: {
        toolbox: {
            show : true,
            feature : {
                magicType : {
                    show: true,
                    type: ['pie', 'funnel'],
                    option: {
                        funnel: {
                            x: '25%',
                            width: '50%',
                            funnelAlign: 'center',
                            max: 1548
                        }
                    }
                },
                restore : {show: true}
            }
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 'left',
            data:['in','out']
        },
        calculable : true,
        series : [
            {
                name:'访问来源',
                type:'pie',
                radius : ['45%', '70%'],
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
                }
            }
        ]
    }
};

//$.getJSON('./data/overview-graph-1.json', function (json) {

    //linkPage.overviewForceOption.series[0].nodes = json.nodes;
    //linkPage.overviewForceOption.series[0].links = json.links;

    //linkPage.overviewForceChart.setOption(linkPage.overviewForceOption);
    //linkPage.subForceChart.setOption(linkPage.subForceChartOption);
    //linkPage.visitLineChart.setOption(linkPage.visitLineOption);
    //linkPage.sourceCategoryBarChart.setOption(linkPage.sourceCategoryChartOption);

    //linkPage.subForceChart.on(echarts.config.EVENT.CLICK, focus);
//});

function focus(param) {
    var data = param.data;
    console.log("选中了" + data.name + '(' + data.value + ')');

    /**
     * update relevant tables and charts:
     *  1.query(data.name) //query the node name from database
     *  2.acquire the response data as JSON file
     *  3.update all relevant tables and charts based on the parameter
     */
    queryDB(data.name);

}

var loadForce = function(sourceFile){

    //parameters of force graph and init
    var vl_force = {
        width: 800,
        height: 500,
        colors: d3.scale.category20()
    };

    d3.json(sourceFile, function(dataset) {

        $('#node-count').html(dataset.nodes.length);
        $('#link-count').html(dataset.links.length);

        var force = d3.layout.force().size([vl_force.width, vl_force.height]).linkDistance([70]).charge([-100]);

        force.nodes(dataset.nodes).links(dataset.links).start();

        var svg = d3.select("#main").append("svg").attr("width", vl_force.width).attr("height",vl_force.height)
            .attr("id","force-svg");

        var edges = svg.selectAll("line").
            data(dataset.links).
            enter().
            append("line")
            .attr("class", "link")
            .style("stroke","#ccc")
            .style("stroke-width", function (d) {
                return 3;
            });

        var nodes = svg.selectAll("circle")
            .data(dataset.nodes)
            .enter()
            .append("circle")
            .attr("class", "node")
            .attr("r", function(d){
                return 7;
            })
            .style("fill", function(d){
                return vl_force.colors(d.category);
            })
            .call(force.drag);

        nodes.append("title").text(function (d) {
            return d.name;
        });

        edges.append("title").text(function (d) {
            return d.source + "-->" + d.target;
        });


        force.on("tick", function(){
            edges.attr("x1", function (d) {
                return d.source.x;
                })
                .attr("y1", function (d) {
                    return d.source.y;
                })
                .attr("x2", function (d) {
                    return d.target.x;
                })
                .attr("y2", function (d) {
                    return d.target.y;
                });

            nodes.attr("cx", function (d) {
                return d.x;
                })
                .attr("cy", function (d) {
                    return d.y;
                });
        });

        nodes.on("click", function (node) {
            console.log("Node " + node.name +" is clicked!");
            queryDB(node.name);
        })

    });
};

loadForce('data/overview-graph-d3.json');

/**
 *
 * @param name - the name of your selected node
 */
function queryDB(name) {

    //operation logic to query the database
    $('#selected-node-name').html(name);
    //processing the response result
    $.getJSON('./data/node-detail-2.json', function (json) {
        if(json[name]) {
            updateCharts(json[name]);
        } else {
            alert("Nothing returned of node: "+name);
        }
    });
}

function updateCharts (json) {
    //1.update degrees
    //setDegreePie(json.degree);

    //2.update main referrals
    var refs = json.topReferrals;
    $('#node-referrals tr').remove(); //remove the old data
    for(var i=0; i< refs.length; i++) {
        $("#node-referrals").append('<tr><td>'+i+'</td><td>'+refs[i].referer+'</td><td>'+refs[i].sum+'</td></tr>');
    }

    $('#ref-table').dataTable();

    //3.update main targets
    var targets = json.topTargets;
    $('#node-targets tr').remove(); //remove the old data
    for(var j=0; j<targets.length; j++) {
        $('#node-targets').append('<tr><td>'+j+'</td><td>'+targets[j].request+'</td><td>'+targets[j].sum+'</td></tr>');
    }

    $('#req-table').dataTable();

    //4.update visited trends
    //linkPage.visitLineOption.series[0].data = json.visitTrend;
    //linkPage.visitLineChart.setOption(linkPage.visitLineOption);

    //5.update main sources
    linkPage.sourceCategoryChartOption.xAxis[0].data = json.sourceCategories.category;
    linkPage.sourceCategoryChartOption.series[0].data = json.sourceCategories.values;

    linkPage.degreePieChartOption.series[0].data = [{value:json.degree.in, name:'in'},{value:json.degree.out, name:'out'}];
    linkPage.degreePieChart.setOption(linkPage.degreePieChartOption);
    linkPage.sourceCategoryBarChart.setOption(linkPage.sourceCategoryChartOption);

}