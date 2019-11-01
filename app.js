

// Load data.csv
d3.csv("data.csv", function(error, healthData) {

    // Throw an error if one occurs
    if (error) throw error;
  
    // Print the healthData
    console.log(healthData);
  
    // Format the date and cast the miles value to a number
    healthData.forEach(function(data) {
      data.poverty = parseTime(data.poverty);
      data.healthcare = +data.healthcare;
    });
  
    // Configure a time scale with a range between 0 and the chartWidth
    // Set the domain for the xTimeScale function
    // d3.extent returns the an array containing the min and max values for the property specified
    var xTimeScale = d3.scaleTime()
      .range([0, chartWidth])
      .domain(d3.extent(healthData, data => data.poverty));
  
    // Configure a linear scale with a range between the chartHeight and 0
    // Set the domain for the xLinearScale function
    var yLinearScale = d3.scaleLinear()
      .range([chartHeight, 0])
      .domain([0, d3.max(healthData, data => data.healthcare)]);
  
    // Create two new functions passing the scales in as arguments
    // These will be used to create the chart's axes
    var bottomAxis = d3.axisBottom(xTimeScale);
    var leftAxis = d3.axisLeft(yLinearScale);
  
    // Configure a drawLine function which will use our scales to plot the line's points
    var drawLine = d3
      .line()
      .x(data => xTimeScale(data.poverty))
      .y(data => yLinearScale(data.healthcare));
  
    // Append an SVG path and plot its points using the line function
    chartGroup.append("path")
      // The drawLine function returns the instructions for creating the line for healthData
      .attr("d", drawLine(healthData))
      .classed("line", true);
  
    // Append an SVG group element to the SVG area, create the left axis inside of it
    chartGroup.append("g")
      .classed("axis", true)
      .call(leftAxis);
  
    // Append an SVG group element to the SVG area, create the bottom axis inside of it
    // Translate the bottom axis to the bottom of the page
    chartGroup.append("g")
      .classed("axis", true)
      .attr("transform", "translate(0, " + chartHeight + ")")
      .call(bottomAxis);
  });