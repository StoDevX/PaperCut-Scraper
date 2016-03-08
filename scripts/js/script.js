var margin = {top:20, right:30, bottom:30, left:-20},
    width = 11960-margin.left - margin.right,
    height = 1500-margin.top-margin.bottom;

// scale to ordinal because x axis is not numerical
var x = d3.scale.ordinal().rangeRoundBands([0, 150000], .3);

//scale to numerical value by height
var y = d3.scale.linear().range([height, 1200]);

var chart = d3.select("#chart")
              .append("svg")  //append svg element inside #chart
              .attr("width", width+(2*margin.left)+margin.right)    //set width
              .attr("height", height+margin.top+margin.bottom);  //set height

var xAxis = d3.svg.axis()
              .scale(x)
              .orient("bottom");  //orient bottom because x-axis will appear below the bars

var yAxis = d3.svg.axis()
              .scale(y)
              .orient("left");



d3.json("data/data.json", function(error, data){
  //Remove null data (in case some incorrect usernames were entered)
  var newData = []
  for(var i=0;i<data.length;i++){
    if(data[i] != null) newData.push(data[i]);
  }
  data = newData;
  // Sort the data
  data = data.sort( function(a,b) {return b.month-a.month;});

    x.domain(data.map(function(d){return d.login}));
    y.domain([0, d3.max(data, function(d){return d.month})]);

    var bar = chart.selectAll("g")
                      .data(data)
                    .enter()
                      .append("g")
                      .attr("transform", function(d, i){
                        return "translate("+x(d.login)+", 0)";
                      });

    bar.append("rect")
        .attr("y", function(d) {
          return y(d.month);
        })
        .attr("x", function(d,i){
          return x.rangeBand()+(margin.left/1);
        })
        .attr("height", function(d) {
          return height - y(d.month);
        })
        .attr("width", x.rangeBand());  //set width base on range on ordinal data

    bar.append("text")
        .attr("x", x.rangeBand()+ 0 )
        .attr("y", function(d) { return y(d.month) -10; })
        .attr("dy", ".75em")
        .text(function(d) { return d.month; });

    chart.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate("+margin.left+","+ height+")")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
          .selectAll("text")
              .style("text-anchor", "end")
              .attr("dx", "-.8em")
              .attr("dy", ".15em")
              .attr("transform", function(d) {
                  return "rotate(-65)"
                  });

    chart.append("g")
          .attr("class", "y axis")
          .attr("transform", "translate("+margin.left+",0)")
          .call(yAxis)
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Month");

  });

function type(d) {
    d.login = +d.login; // coerce to number
    return d;
  }
