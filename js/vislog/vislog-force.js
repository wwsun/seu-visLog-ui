/**
 * Created by Weiwei on 11/10/2014.
 */

var loadForce = function(sourceFile){

    //parameters of force graph and init
    var vl_force = {
        width: 1000,
        height: 700,
        colors: d3.scale.category20()
    };

    d3.json(sourceFile, function(dataset) {

        var force = d3.layout.force().size([this.width,this.height]).linkDistance([100]).charge([-100])

        force.nodes(dataset.nodes).links(dataset.links).start();

        var svg = d3.select("#svg-wrapper").append("svg").attr("width", vl_force.width).attr("height",vl_force.height)
            .attr("id","force-svg");

        var edges = svg.selectAll("line").data(dataset.links).enter().append("line").style("stroke","#ccc")
            .style("stroke-width", function (d) {
                return 3;
            });

        var nodes = svg.selectAll("circle")
            .data(dataset.nodes)
            .enter()
            .append("circle")
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

    });
};