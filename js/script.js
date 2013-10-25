var chart;
var data = [
            {x: 10.0, y: 9.14},
            {x:  8.0, y: 8.14},
            {x: 13.0, y: 8.74},
            {x:  9.0, y: 8.77},
            {x: 11.0, y: 9.26},
            {x: 14.0, y: 8.10},
            {x:  6.0, y: 6.13},
            {x:  4.0, y: 3.10},
            {x: 12.0, y: 9.13},
            {x:  7.0, y: 7.26},
            {x:  5.0, y: 4.74},
          ];
window.onload = function() {
	chart = DdD3.init(data, {
		container	: 'my-chart',
		type		: 'bar',
		width		: 700,
		height		: 400,
		fillColor	: '#F9D364',
		YAxisTitle: 'Frequency'
	}).draw();
};