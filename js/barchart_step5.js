var margin_step5 = {top: 50, right: 20, bottom: 30, left: 60},
    width_step5 = 660 - margin_step5.left - margin_step5.right,
    height_step5 = 400 - margin_step5.top - margin_step5.bottom;

var x_step5 = d3.scale.ordinal()
    .rangeRoundBands([0, width_step5], .1);

var y_step5 = d3.scale.linear()
    .range([height_step5, 0]);

var xAxis_step5 = d3.svg.axis()
    .scale(x_step5)
    .orient("bottom")
    .tickSize(0)
    .tickPadding(5);

var yAxis_step5 = d3.svg.axis()
    .scale(y_step5)
    .orient("left")
    .ticks(4)
    .tickSize(3);
	
var svg_step5 = d3.select(".barchart_step5").append("svg")
    .attr("width", width_step5 + margin_step5.left + margin_step5.right)
    .attr("height", height_step5 + margin_step5.top + margin_step5.bottom)
    .append("g")
    .attr("transform", "translate(" + margin_step5.left + "," + margin_step5.top + ")");

function type(d) {
  d.favorability = +d.favorability;
  return d;
}

d3.csv("data.csv", type, function(error, data) {
  console.log(data);
  x_step5.domain(data.map(function(d) { return d.country; }));
  y_step5.domain([0, 100]);
 

  svg_step5.append("g")
      .attr("class", "x axis_step5")
      .attr("transform", "translate(0," + height_step5 + ")")
      .call(xAxis_step5);

  svg_step5.append("g")
      .attr("class", "y axis_step5")
      .call(yAxis_step5);


  svg_step5.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar_step5")
      .attr("x", function(d) { return x_step5(d.country); })
      .attr("width", x_step5.rangeBand())
      .attr("y", function(d) { return y_step5(d.favorability); })
      .attr("height", function(d) { return height_step5 - y_step5(d.favorability); })
	  .on("mouseover", function(d){ 
	  		tooltip_step5.html(d.favorability )
	  		.style("visibility", "visible")
	  		.attr("x", function() { return x_step5(d.country) + x.rangeBand()/2 - 10; })
      		.attr("y", function() { return y_step5(d.favorability) + 25; })
	  		;}) 
		
	  .on("mouseout", function(d){ 
	  		tooltip_step5.style("visibility", "hidden")
	  		;});
	

   var tooltip_step5 = 
	svg_step5.append("text")
	.style("position", "absolute")
	.style("z-index", "1000")
	.style("visibility", "hidden")
	.style("fill", "#ffffff");
	
});


