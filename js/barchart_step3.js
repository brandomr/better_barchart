var margin_step3 = {top: 50, right: 20, bottom: 30, left: 60},
    width_step3 = 660 - margin_step3.left - margin_step3.right,
    height_step3 = 400 - margin_step3.top - margin_step3.bottom;

var x_step3 = d3.scale.ordinal()
    .rangeRoundBands([0, width_step3], .1);

var y_step3 = d3.scale.linear()
    .range([height_step3, 0]);

var xAxis_step3 = d3.svg.axis()
    .scale(x_step3)
    .orient("bottom");

var yAxis_step3 = d3.svg.axis()
    .scale(y_step3)
    .orient("left");
	
var svg_step3 = d3.select(".barchart_step3").append("svg")
    .attr("width", width_step3 + margin_step3.left + margin_step3.right)
    .attr("height", height_step3 + margin_step3.top + margin_step3.bottom)
    .append("g")
    .attr("transform", "translate(" + margin_step3.left + "," + margin_step3.top + ")");

function type(d) {
  d.favorability = +d.favorability;
  return d;
}

d3.csv("data.csv", type, function(error, data) {
  console.log(data);
  x_step3.domain(data.map(function(d) { return d.country; }));
  y_step3.domain([0, 100]);
 

  svg_step3.append("g")
      .attr("class", "x axis_step3")
      .attr("transform", "translate(0," + height_step3 + ")")
      .call(xAxis_step3);

  svg_step3.append("g")
      .attr("class", "y axis_step3")
      .call(yAxis_step3);


  svg_step3.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar_step3")
      .attr("x", function(d) { return x_step3(d.country); })
      .attr("width", x_step3.rangeBand())
      .attr("y", function(d) { return y_step3(d.favorability); })
      .attr("height", function(d) { return height_step3 - y_step3(d.favorability); })
});



