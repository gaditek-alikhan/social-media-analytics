App.factory('Helper', function () {
  //return { message: "I'm data from a service" };
  
    var Helper = Helper || {};

	Helper.showLoadingImage = function() {
		$('.page-header').append('<div id="loading-image" style="text-align:left;"><img src="images/loader.gif" width="80" height="80" alt="Loading..." /></div>');
	}
	
	Helper.hideLoadingImage = function() {
        $('#loading-image').remove();
	}
	
	Helper.notification = function(message,type) {
	
		var n = noty({
			text: message,
			type: type,
			timeout: 3000,
			force: false,
			maxVisible: 1,
			killer: true,
			animation: {
				open: 'animated bounceInLeft', 
				close: 'animated bounceOutLeft',
				easing: 'swing',
				speed: 1000 
			}
		});
	
	};
	
	Helper.PrepareMultiDataTableFromDataSource = function(dataSet) {
		var header_columns = '';
		var rows = '';
		$.each(dataSet[0], function(k,v) {	 
			if(k == "Action"){
			var style = "style='white-space:nowrap;'";
			}
			header_columns += '<th '+style+'>' + k +  '</th>';
		});

		$.each(dataSet, function(k,v) {

			if(v.hasOwnProperty('id')){
				rows += '<tr id="' + v['id'] + '">';
			} else {
				rows += '<tr>';
			}
			$.each(v, function(k1,v1) {

				
					rows += '<td>' + v1 +  '</td>';
				

			});
			rows + '</tr>';
		});
		rows = rows.replace(/null/g, 'n/a');
		var html = $('.tmp_SimpleTable').html();
		//html = html.replace('{{title}}', options.title);
		html = html.replace('{{header_columns}}', header_columns);
		html = html.replace('{{rows}}', rows);
		return html;
	};
	
	Helper.AttachDataTable = function (selector) {

		/*
		 * Initialize DataTables, with no sorting on the 'details' column
		 */

		if ( $.fn.DataTable.fnIsDataTable( selector ) ) {
			var oTable = $(selector).dataTable();
			oTable.fnDestroy();
			oTable = undefined;
		}
		var oTable = $(selector).dataTable( {
			/*"aoColumnDefs": [
			 {"bSortable": false, "aTargets": [ 0 ] }
			 ],*/
			"aaSorting": [[0, 'desc']],
			"aLengthMenu": [
				[10, 15, 20, -1],
				[10, 15, 20, "All"] // change per page values here
			],
			"aoColumnDefs": [
			{
			  "bSortable": false,
			  "aTargets": [ -1 ] // <-- gets last column and turns off sorting
			 }
			 ],

			// set the initial value
			"iDisplayLength": 10

		});
    
	};
	
	
	Helper.checkIfNotEmpty = function(fields) {
        var is_valid = true;
		var abort = false;

		$.each(fields, function(k,v) {
			if((typeof v.value === 'undefined' || v.value == "") && !abort){	
				//console.log(v.name);
				Helper.notification('please enter '+v.name, 'error');
				is_valid = false;
				abort = true;
				return false;				
			}		
		});
        return is_valid;
					
	};
	
	Helper.isInt = function(value) {
		if (isNaN(value)) {
			return false;
		}
	};
	
	Helper.sort = function(arr) {		
		return arr.sort(function(a, b) {
		var aa = new Date(a),
			bb = new Date(b);
		if (aa !== bb) {
			if (aa > bb) { return 1; }
			if (aa < bb) { return -1; }
		}
		return aa - bb;
		});		
	};
	
	Helper.unique = function(arr) {
		var a = [];
		for (var i=0, l=arr.length; i<l; i++)
        if (a.indexOf(arr[i]) === -1 && arr[i] !== '')
            a.push(arr[i]);
		return a;	
	};
	
	Helper.generatePieChart = function(elm,cdata) {
		
		$(elm).highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
			credits: {
			enabled: false
			},
            title: {
                text: 'Most Activities By Social Network'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Total Activities',
                colorByPoint: true,
                data: cdata
            }]
        });
		
	};
		
	Helper.generateSeriesChart = function(elm,fseries) {
		

        $(elm).highcharts({
        chart: {
            type: 'spline'
        },
		credits: {
			enabled: false
		},
        title: {
            text: 'Time Series Analysis on Accounts Types'
        },
        subtitle: {
            text: 'Irregular time data'
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { // don't display the dummy year
                month: '%e. %b',
                year: '%b'
            },
            title: {
                text: 'By Date'
            }
        },
        yAxis: {
            title: {
                text: 'By Amount'
            },
            min: 0
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
        },

        plotOptions: {
            spline: {
                marker: {
                    enabled: true
                }
            }
        },

        series:fseries		
		}); 		
	};
	
	Helper.generateColumnChart = function(elm,col_data) {
	
		$(elm).highcharts({
        chart: {
            type: 'column'
        },
		credits: {
			enabled: false
		},
        title: {
            text: 'Activity Breakdown'
        },
        xAxis: {
            //categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
			categories: ['likes','comments','shares']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Distribution %'
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
            shared: true
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            }
        },
		
		series:col_data
		/*
        series: [{
            name: 'John',
            data: [5, 3, 4, 7, 2]
        }, {
            name: 'Jane',
            data: [2, 2, 3, 2, 1]
        }, {
            name: 'Joe',
            data: [3, 4, 4, 2, 5]
        }]
		*/
		
    });
	
	}
	
	return Helper;
  
});