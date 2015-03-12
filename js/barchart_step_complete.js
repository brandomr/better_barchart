var margin_step_complete = {top: 50, right: 20, bottom: 30, left: 60},
    width_step_complete = 660 - margin.left - margin.right,
    height_step_complete = 400 - margin.top - margin.bottom;

var x_step_complete = d3.scale.ordinal()
    .rangeRoundBands([0, width_step_complete], .1);

var y_step_complete = d3.scale.linear()
    .range([height_step_complete, 0]);

var xAxis_step_complete = d3.svg.axis()
    .scale(x_step_complete)
    .orient("bottom")
    .tickSize(0)
    .tickPadding(5);

var yAxis_step_complete = d3.svg.axis()
    .scale(y_step_complete)
    .orient("left")
    .ticks(4)
    .tickSize(3);

var notes_step_complete = d3.select(".barchart_step_complete").append("div")
	.attr("class", "notes_step_complete")
	.html("Hover over a country to see the percent of its population with"
      		+ "<span style='color:white'> favorable views of Shangri La</span>")
    .style("margin-bottom", "-50px")
	.style("margin-top", "20px")
	.style("margin-left", "250px")
	.style("font-size", "20px")
	.style("color", "#fc4e2a")
	.style("width", "400px")
	.style("line-height", "1em")
	.style("text-align", "left");
	
var svg_step_complete = d3.select(".barchart_step_complete").append("svg")
    .attr("width", width_step_complete + margin_step_complete.left + margin_step_complete.right)
    .attr("height", height_step_complete + margin_step_complete.top + margin_step_complete.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function type(d) {
  d.favorability = +d.favorability;
  return d;
}


d3.csv("data.csv", type, function(error, data) {
  console.log(data);
  x_step_complete.domain(data.map(function(d) { return d.country; }));
  y_step_complete.domain([0, 100]);
 

  svg_step_complete.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis_step_complete);

  svg_step_complete.append("g")
      .attr("class", "y axis")
      .call(yAxis_step_complete)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -45)
      .attr("dy", ".21em")
      .style("text-anchor", "end")
      .text("Percent with favorable view");


  svg_step_complete.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x_step_complete(d.country); })
      .attr("width", x_step_complete.rangeBand())
      .attr("y", function(d) { return y_step_complete(d.favorability); })
      .attr("height", function(d) { return height_step_complete - y_step_complete(d.favorability); })
	  .on("mouseover", function(d){ 
	  		tooltip_step_complete.html(d.favorability )
	  		.style("visibility", "visible")
	  		.attr("x", function() { return x_step_complete(d.country) + x_step_complete.rangeBand()/2 - 10; })
      		.attr("y", function() { return y_step_complete(d.favorability) + 25; })
      		
      		d3.select(".notes_step_complete")
      		.html(d.country + ": <span style='color:white'>" + 
      		d.favorability + "% favorability. </span><br>" + d.description )
	  		;})
		
	  .on("mouseout", function(d){ 
	  		tooltip_step_complete.html(d.favorability )
	  		.style("visibility", "hidden")

      		d3.select(".notes_step_complete")
      		.html()
	  		;});
	
   var tooltip_step_complete = 
	svg_step_complete.append("text")
	.style("position", "absolute")
	.style("z-index", "1000")
	.style("visibility", "hidden")
	.style("fill", "#ffffff");
	
});



