var margin = {top: 50, right: 20, bottom: 30, left: 60}
var width = 660 - margin.left - margin.right
var height = 400 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickSize(0)
    .tickPadding(5);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(4)
    .tickSize(3);


var notes = d3.select(".barchart").append("div")
	.attr("class", "notes")
	.html("Hover over a country to see the percent of its population with"
      		+ "<span style='color:white'> favorable views of Shangri La</span>")
    .style("margin-bottom", "-50px")
	.style("margin-top", "20px")
	.style("margin-left", "10%")
	.style("font-size", "16px")
	.style("color", "#fc4e2a")
	.style("width", "400px")
	.style("line-height", "1em")
	.style("text-align", "left");
	
var svg = d3.select(".barchart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	
function type(d) {
  d.favorability = +d.favorability;
  return d;
}

d3.csv("data.csv", type, function(error, data) {
  console.log(data);
  
  x.domain(data.map(function(d) { return d.country; }));
  y.domain([0, 100]);
 

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -45)
      .attr("dy", ".21em")
      .style("text-anchor", "end")
      .text("Percent with favorable view");


	


  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.country); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.favorability); })
      .attr("height", function(d) { return height - y(d.favorability); })
	  .on("mouseover", function(d){ 
	  		tooltip.html(d.favorability )
	  		.style("visibility", "visible")
	  		.attr("x", function() { return x(d.country) + x.rangeBand()/2 - 10; })
      		.attr("y", function() { return y(d.favorability) + 25; })
      		
      		d3.select(".notes")
      		.html(d.country + ": <span style='color:white'>" + 
      		d.favorability + "% favorability. </span><br>" + d.description )
	  		;})
		
	  .on("mouseout", function(d){ 
	  		tooltip.style("visibility", "hidden")
	  		;});
	

   var tooltip = 
	svg.append("text")
	.style("position", "absolute")
	.style("z-index", "1000")
	.style("visibility", "hidden")
	.style("fill", "#ffffff");
	
});




