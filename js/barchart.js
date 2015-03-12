

var margin = {top: 50, right: 20, bottom: 30, left: 60},
    width = 660 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

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

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<span style='line-height:14px'><span style='font-size:14px; color:#fc4e2a'><strong>" + d.country + 
    "\t"  + "</strong></span><br/><strong>" + d.favorability + "%</strong></br>" 
    + d.description + "</span>";
  })


var svg = d3.select(".barchart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


svg.call(tip);

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
      .text("Percent with favorabilityable view");

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.country); })
       .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.favorability); })
      .attr("height", function(d) { return height - y(d.favorability); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)


});



function type(d) {
  d.favorability = +d.favorability;
  return d;
}
