var margin_step4 = {top: 50, right: 20, bottom: 30, left: 60},
    width_step4 = 660 - margin_step4.left - margin_step4.right,
    height_step4 = 400 - margin_step4.top - margin_step4.bottom;

var x_step4 = d3.scale.ordinal()
    .rangeRoundBands([0, width_step4], .1);

var y_step4 = d3.scale.linear()
    .range([height_step4, 0]);

var xAxis_step4 = d3.svg.axis()
    .scale(x_step4)
    .orient("bottom")
    .tickSize(0)
    .tickPadding(5);

var yAxis_step4 = d3.svg.axis()
    .scale(y_step4)
    .orient("left")
    .ticks(4)
    .tickSize(3);
	
var svg_step4 = d3.select(".barchart_step4").append("svg")
    .attr("width", width_step4 + margin_step4.left + margin_step4.right)
    .attr("height", height_step4 + margin_step4.top + margin_step4.bottom)
    .append("g")
    .attr("transform", "translate(" + margin_step4.left + "," + margin_step4.top + ")");

function type(d) {
  d.favorability = +d.favorability;
  return d;
}

d3.csv("data.csv", type, function(error, data) {
  console.log(data);
  x_step4.domain(data.map(function(d) { return d.country; }));
  y_step4.domain([0, 100]);
 

  svg_step4.append("g")
      .attr("class", "x axis_step4")
      .attr("transform", "translate(0," + height_step4 + ")")
      .call(xAxis_step4);

  svg_step4.append("g")
      .attr("class", "y axis_step4")
      .call(yAxis_step4);


  svg_step4.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar_step4")
      .attr("x", function(d) { return x_step4(d.country); })
      .attr("width", x_step4.rangeBand())
      .attr("y", function(d) { return y_step4(d.favorability); })
      .attr("height", function(d) { return height_step4 - y_step4(d.favorability); })
});



