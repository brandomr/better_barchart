var margin_step2 = {top: 50, right: 20, bottom: 30, left: 60},
    width_step2 = 660 - margin_step2.left - margin_step2.right,
    height_step2 = 400 - margin_step2.top - margin_step2.bottom;

var x_step2 = d3.scale.ordinal()
    .rangeRoundBands([0, width_step2], .1);

var y_step2 = d3.scale.linear()
    .range([height_step2, 0]);

	
var svg_step2 = d3.select(".barchart_step2").append("svg")
    .attr("width", width_step2 + margin_step2.left + margin_step2.right)
    .attr("height", height_step2 + margin_step2.top + margin_step2.bottom)
    .append("g")
    .attr("transform", "translate(" + margin_step2.left + "," + margin_step2.top + ")");

function type(d) {
  d.favorability = +d.favorability;
  return d;
}

d3.csv("data.csv", type, function(error, data) {
  console.log(data);
  x_step2.domain(data.map(function(d) { return d.country; }));
  y_step2.domain([0, 100]);
 


  svg_step2.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar_step2")
      .attr("x", function(d) { return x_step2(d.country); })
      .attr("width", x_step2.rangeBand())
      .attr("y", function(d) { return y_step2(d.favorability); })
      .attr("height", function(d) { return height_step2 - y_step2(d.favorability); })
});



