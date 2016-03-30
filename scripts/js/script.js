var newData = []
var max10 = []
var max_value = 0;
d3.json("data/data.json", function(data){
    for(var i=0;i<data.length;i++){
	if(data[i] != null) {
	    newData.push(data[i]);
	}
    }

    newData.sort(function(a, b) {
	return b.month-a.month
    });
    
    max_value = newData[0].month;
    console.log(newData.length);
    
    var margin = { top: 30, right: 30, bottom: 40, left: 50}

    var height = 400 - margin.top - margin.bottom,
	width = 20000 - margin.left - margin.right,
	barWidth = 100,
	barOffset = 5;

    var tempColor;

    var colors = d3.scale.category10();

    var yScale = d3.scale.linear()
        .domain([0, max_value])
        .range([0, height])

    var xScale = d3.scale.ordinal()
	.domain(d3.range(0, newData.length))
        .rangeBands([0, width])

    var tooltip = d3.select('body').append('div')
        .style('position', 'absolute')
        .style('padding', '0 10px')
        .style('background', 'white')
        .style('opacity', 0)
    
    var myChart = d3.select('#chart').append('svg')
        .style('background', '#eee8d5')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left +', '+ margin.top +')')
        .selectAll('rect').data(newData)
        .enter().append('rect')
        .style('fill', function(d,i) {
	    return colors(i);
	})
        .attr('width', xScale.rangeBand())
        .attr('height', function(d) {
	    return yScale(d.month);
	})
        .attr('x', function(d,i) {
	    return xScale(i);
	})
        .attr('y', function(d) {
	    return height - yScale(d.month);
	})
        .on('mouseover', function(d) {

            tooltip.transition()
		.style('opacity', .9)

            tooltip.html(d.login+ "-- This month: " + d.month+ " pages." + " This week: " + d.week+ " pages.")
		.style('left', (d3.event.pageX - 65) + 'px')
		.style('top',  (d3.event.pageY - 60) + 'px')


            tempColor = this.style.fill;
            d3.select(this)
		.style('opacity', .5)
		.style('fill', 'yellow')
	})

	.on('mouseout', function(d) {
            d3.select(this)
		.style('opacity', 1)
		.style('fill', tempColor)
	})

    var vGuideScale = d3.scale.linear()
        .domain([0, max_value])
        .range([height, 0])

    var vAxis = d3.svg.axis()
        .scale(vGuideScale)
        .orient('left')
        .ticks(10)

    var vGuide = d3.select('svg').append('g')
    vAxis(vGuide)
    vGuide.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
    vGuide.selectAll('path')
        .style({ fill: 'none', stroke: "#000"})
    vGuide.selectAll('line')
        .style({ stroke: "#000"})

    var hAxis = d3.svg.axis()
        .scale(xScale)
        .orient('bottom')
        .tickFormat('')

    var hGuide = d3.select('svg').append('g')
    hAxis(hGuide)
    hGuide.attr('transform', 'translate(' + margin.left + ', ' + (height + margin.top) + ')')
    hGuide.selectAll('path')
        .style({ fill: 'none', stroke: "#000"})
    hGuide.selectAll('line')
        .style({ stroke: "#000"})
    


    /*var myChart = d3.select('#chart2').append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('background', '#C9D7D6')
      .selectAll('rect').data(max10)
      .enter().append('rect')
      .style('fill', '#C61C6F')
      .attr('width', xScale.rangeBand())
      .attr('height', function(d) {
      return yScale(d);
      })
      .attr('x', function(d,i) {
      return xScale(i);
      })
      .attr('y', function(d) {
      return height - yScale(d);
      })
      .on('mouseover', function(d) {
      d3.select(this)
      .style('opacity', .5)
      })*/
    
});

function login_search() {
    var search = $('#search_box').val();
    
    $.each(newData, function(index) {
	//console.log(newData[index].login);
	if (newData[index].login == search) {
	    var bar =  document.getElementById("chart").childNodes[0].childNodes[0].childNodes[index]; // the selected 

	    //console.log(newData[index].month);
	    $('#search_output').html("<h2>Username: " + newData[index].login + "<br> Month: " + newData[index].month + "<br> Week: " + newData[index].week + "</h2>");

	    $('#chartContainer').animate({
		scrollLeft:bar.getBoundingClientRect().left-350
	    }, 1000);

	    $("#arrow").css("left", (bar.getBoundingClientRect().width*index+40));

	    
	}

    });
}
