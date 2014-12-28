/**
 * Created by Weiwei on 10/8/2014.
 */

var width = 600;
var height = 700;

var colors = d3.scale.category20();

//1.init
var force = d3.layout.force()
    .size([width, height])
    .linkDistance([100])
    .charge([-100]);

//3. load data
function updateSvg(sourceFile) {

    d3.json(sourceFile, function (dataset) {

        force.nodes(dataset.nodes)
            .links(dataset.links)
            .start();

        //2.create svg
        var svg = d3.select("#main")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("id", "forcesvg");

        //4.create links
        var edges = svg.selectAll("line")
            .data(dataset.links)
            .enter()
            .append("line")
            .style("stroke", "#ccc")
            .style("stroke-width", function (d) {
                return 2;
            });

        //5.create nodes
        var nodes = svg.selectAll("circle")
            .data(dataset.nodes)
            .enter()
            .append("circle")
            .attr("r", function (d) {
                return 7;
            })
            .style("fill", function (d) {
                return colors(d.category * 5);
            })
            .call(force.drag);


        nodes.append("title").text(function (d) {
            return d.name;
        });

        edges.append("title").text(function (d) {
            return d.source + "-->" + d.target;
        });


        //6.tick
        force.on("tick", function () {
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

    });
}

var overviewData = "data/overview-graph-d3.json";

updateSvg(overviewData);


//require.config({
//    paths: {
//        echarts: './js'
//    }
//});
//
//require(
//    [
//        'echarts',
//        'echarts/chart/force'
//    ],
//    function(ec) {
//        var myChart = ec.init(document.getElementById('main'));
//        var option = {
//            tooltip: {
//                trigger: 'item',
//                    formatter: '{b}'
//            },
//            toolbox: {
//                show: true,
//                    feature: {
//                    restore: {show: true},
//                    magicType: {
//                        show: true,
//                            type: ['force', 'chord'],
//                            option: {
//                            chord: {
//                                minRadius : 2,
//                                    maxRadius : 10,
//                                    ribbonType: false,
//                                    itemStyle: {
//                                    normal: {
//                                        label: {
//                                            show: true,
//                                                rotate: true
//                                        },
//                                        chordStyle: {
//                                            opacity: 0.2
//                                        }
//                                    }
//                                }
//                            },
//                            force: {
//                                minRadius : 5,
//                                    maxRadius : 8,
//                                    itemStyle : {
//                                    normal : {
//                                        label: {
//                                            show: false
//                                        },
//                                        linkStyle : {
//                                            opacity : 0.5
//                                        }
//                                    }
//                                }
//                            }
//                        }},
//                    saveAsImage: {show: true}
//                }
//            },
//            legend: {
//                x: 'left',
//                    data: ['in-site', 'out-site'],
//                    orient: 'vertical'
//            },
//            series: [
//                {
//                    type: 'force',
//                    //name: "Link relations",
//                    ribbonType: false,
//                    categories: [
//                        {
//                            name: 'in-site',
//                            base: "in-site",
//                            itemStyle: {
//                                normal: {
//                                    brushType: "both",
//                                    color: "#61AE24",
//                                    strokeColor: "#5182ab",
//                                    lineWidth: 1
//                                }
//                            }
//                        },
//                        {
//                            name: 'out-site',
//                            base: "out-site",
//                            itemStyle: {
//                                normal: {
//                                    brushType: "both",
//                                    color: "#dda0dd",
//                                    strokeColor: "#5182ab",
//                                    lineWidth: 1
//                                }
//                            }
//                        }
//                    ],
//                    minRadius : 10,
//                    maxRadius : 20,
//                    coolDown: 0.995,
//                    //steps: 10,
//                    nodes : [],
//                    links : [],
//                    steps: 15,
//                    gravity: 0.8,
//                    scaling: 1.1,
//                    roam: false,
//                    large: true,
//                    useWorker: true
//                }
//            ]
//        };
//
//        $.getJSON('./data/overview-graph-1.json', function (json) {
//            option.series[0].nodes = json.nodes;
//            option.series[0].links = json.links;
//            myChart.setOption(option);
//        });
//
//    }
//);