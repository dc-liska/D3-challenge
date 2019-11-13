


var svgWidth = 800;
var svgHeight = 600;

var margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60
};

var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter") //Refences div tag with scatter ID
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .attr("class", "chart");

  var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);



// Load data.csv
d3.csv("assets/data.csv").then(function(data) {
  console.log(healthData);

  
    // Format the date and cast the miles value to a number
    healthData.forEach(function(data) {
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;
    });
  
    // Configure a time scale with a range between 0 and the chartWidth
    // Set the range and domain for the xLinearScale function
    var xLinearScale = d3.scaleLinear()
      .range([0, chartWidth])
      .domain(d3.max(healthData, data => data.poverty));
  
    // Configure a linear scale with a range between the chartHeight and 0
    // Set the range and domain for the yLinearScale function
    var yLinearScale = d3.scaleLinear()
      .range([chartHeight, 0])
      .domain([0, d3.max(healthData, data => data.healthcare)]);
  
    // Create two new functions passing the scales in as arguments
    // These will be used to create the chart's axes
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
  
  
    // Add markers
    svg.append('g')
    var circlesGroup = chartGroup.selectAll("circle")
    .data(healthData) 
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(data.poverty); } )
      .attr("cy", function (d) { return y(data.healthcare); } )
      .attr("r", 7)
      .style("fill", "#69b3a2")
      .style("opacity", 0.3)
      .style("stroke", "green")
    .on("mouseover", mouseover )
    .on("mousemove", mousemove )
    .on("mouseleave", mouseleave )

    var labelGroup = chartHeight.selectAll("text")
    .data(healthData)
    .enter()
    .append("text")
    .text(function(data){
      return data.abbr
    });

    // Append a group element to the SVG area, create the left axis inside of it
    chartGroup.append('g')
      .call(leftAxis);
  
    // Append a group element to the SVG area, create the bottom axis inside of it
    // Translate the bottom axis to the bottom of the page
    chartGroup.append('g')
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 20)
      .attr("x", 0 - (height / 1.25))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Population Lacking Healthcare (%)");


    chartGroup.append("g")
      .attr("transform", `translate(${width / 2}, ${height + margin.top})`)
      .attr("class", "axisText")
      .text("Population in Poverty (%)");
  });