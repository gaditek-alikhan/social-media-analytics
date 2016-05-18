 App.controller("indexController", function($scope,$http,Helper) {
	
	//var url = "https://nuvi-challenge.herokuapp.com/activities";
	var url = "data.json";
	$http.get(url)
    .then(function(response) {
        		
		$scope.data = response.data;
		
		// process data table
		if($scope.data !== 0){
			html = Helper.PrepareMultiDataTableFromDataSource($scope.data);
		}
		$('div.content').html(html);
		Helper.AttachDataTable('.tbl-SimpleTable');
		
		// process pie chart
		var chart_data = _.chain($scope.data).countBy("provider").pairs().value();
		Helper.generatePieChart('div.containerpie',chart_data);
				   
		// process column bar chart   
		$scope.activities_array = ['likes','comments','shares'];
		var group_data = _.chain($scope.data).groupBy("provider").value();				
		var col_data = _.map(group_data, function(group){
			var tmp = {};
			tmp.name = group[0].provider;
			tmp.data = [_.sum(_.map(group, 'activity_likes')),_.sum(_.map(group, 'activity_comments')),_.sum(_.map(group, 'activity_shares'))];
			return tmp;		
		});
		Helper.generateColumnChart('div.containercolumn',col_data);		   
		   
		// ui design 2   
	    $scope.data_filtered = $scope.data.slice(0, 10);
		   
    });
	
	$scope.updateLikes = function(obj){		 
		  obj.activity_likes++;		  
	}
	
 });