var margin_step1 = {top: 50, right: 20, bottom: 30, left: 60},
    width_step1 = 660 - margin_step1.left - margin_step1.right,
    height_step1 = 400 - margin_step1.top - margin_step1.bottom;

var x_step1 = d3.scale.ordinal()
    .rangeRoundBands([0, width_step1], .1);

var y_step1 = d3.scale.linear()
    .range([height_step1, 0]);

	
var svg_step1 = d3.select(".barchart_step1").append("svg")
    .attr("width", width_step1 + margin_step1.left + margin_step1.right)
    .attr("height", height_step1 + margin_step1.top + margin_step1.bottom)
    .append("g")
    .attr("transform", "translate(" + margin_step1.left + "," + margin_step1.top + ")");

function type(d) {
  d.favorability = +d.favorability;
  return d;
}

d3.csv("data.csv", type, function(error, data) {
  console.log(data);
  x_step1.domain(data.map(function(d) { return d.country; }));
  y_step1.domain([0, 100]);
 


  svg_step1.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar_step1")
      .attr("x", function(d) { return x_step1(d.country); })
      .attr("width", x_step1.rangeBand())
      .attr("y", function(d) { return y_step1(d.favorability); })
      .attr("height", function(d) { return height_step1 - y_step1(d.favorability); })
});



