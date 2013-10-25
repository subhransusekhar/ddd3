
var DdD3 = {
	data: {},
	defaults: {
		container: 'chart',
		type: 'bar',
		width: 700,
		height: 400,
		margin: {top: 40, right: 40, bottom: 40, left: 40},
		fillColor: '#9ECAE5',
		YAxisTitle: 'Title'
	},
	options: {},
	chart: [],
	init: function(data, options) {
		if(typeof data != 'undefined') {
			this.data = data;
		}
		
		if(typeof options != 'undefined') {
			this.options = this.extend(this.defaults, options);
		} else {
			this.options = this.defaults;
		}
		
		
		return this;
	},
	extend: function(destination,source) {
	    for (var property in source)
	        destination[property] = source[property];
	    return destination;
	},
	draw: function() {
		if(typeof document.getElementById(this.options.container) != 'undeinfed') {
			var container = document.getElementById(this.options.container);
			container.setAttribute("style","display:block; width: 700px; height: 400px;");
			container.style.width = this.options.width;
			container.style.height = this.options.height;
			
			if(typeof this.options.type != 'undefined') {
				if(typeof this.chart[this.options.type] != 'undefined') {
					this.chart[this.options.type](this.data, this.options);
				}
			}
		}
	}
};

DdD3.chart['bar'] = function(data, options) {
	var container = "#" + options.container;
	var margin = options.margin,
	    width = options.width - margin.left - margin.right,
	    height = options.height - margin.top;
	var x = d3.scale.ordinal()
			.domain(data.map(function(d) { return d.x; }))
			.rangeRoundBands([ 0, width ], .1);
	var y = d3.scale.linear()
			.domain([ 0, d3.max(data, function(d) {	return d.y; }) ])
			.range([ height, 0 ]);
	var xAxis = d3.svg.axis().scale(x).orient("bottom");
	var yAxis = d3.svg.axis().scale(y).orient("left");
	var tooltip = d3.select(container)
					.append("div")
					.attr("id","tooltip")
					.attr("class","hidden");
	var svg = d3.select(container)
			.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height",	height + margin.top + margin.bottom)
			.append("g")
			.attr("transform","translate(" + margin.left + "," + margin.top + ")");

		svg.append("g")
		.attr("class", "x axis")
		.attr("transform","translate(0," + height + ")")
		.call(xAxis);

		svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy",".71em")
		.style("text-anchor", "end")
		.text(options.YAxisTitle);
		
		svg.append("g")
        .attr("class", "grid")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis.tickSize(-height, 0, 0).tickFormat(""));

	    svg.append("g")
	    .attr("class", "grid")
	    .call(yAxis.tickSize(-width, 0, 0).tickFormat(""));
		svg.selectAll(".bar")
		.data(data)
		.enter()
		.append("rect")
		.attr("class","bar")
		.attr("x", function(d) {
			return x(d.x);
		})
		.attr("width", x.rangeBand()).attr("y", function(d) {
			return y(d.y);
		})
		.attr("height", function(d) {
			return height - y(d.y);
		})
		.style("fill", options.fillColor)
		.on("mouseover", function(d) {
			var xPosition = x(d.x) + x.rangeBand();
			var yPosition =  y(d.y);
			tooltip
			.html("<strong>" + d.x + ":</strong> <span style='color:red'>" + d.y + "</span>")
			.style("left", xPosition + "px")
			.style("top", yPosition + "px")
			.classed("hidden", false);
		})
		.on("mouseout", function() {
			//Remove the tooltip
			tooltip.classed("hidden", true);
		});
};