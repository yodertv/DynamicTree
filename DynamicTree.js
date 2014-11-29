function TreeCtrl($scope){

	var elem = document.getElementById('canvas');
	var context = elem.getContext('2d');
	 
	context.fillStyle   = '#000';
	context.lineWidth   = 1;

	// Set these variables and open the file to see your tree
	$scope.treeVars = {
		initialAngle : -82, // Initial angle of the trunk
		length : 135, // Length of the first stem
		width : 17, // Width of the first stem
		leftAlpha : 1.8, 
		rightAlpha : 2.2,
		leftAngle : 19, // Left delta
		rightAngle : 31, // Right delta
		level : 16,  // Level of recursion
	}
	
	/*  Here are some examples of interesting inputs

	tree           		initilAngle 	length 	width 	leftAlpha 	rightAlpha 	leftAngle 	rightAngle 	level
	Square				-90				250		35		1.2 		1.2 		90 			90			12
	Symetrical 			-90 			180 	21 		1.2 		1.2 		25 			25 			12
	Tree with foilage	-82				135		13 		1.8 		2.2 		19 			31			16
	Bronchial			-90 			90 		10 		3.0 		3.0 		33 			33 			10
	One-Sided			-95				150 	12 		1.8 		0.002 		30 			0 			16

	*/

	var deg_to_rad = Math.PI / 180.0;
	var leftWidthFactor = Math.pow(2, -1/$scope.treeVars.leftAlpha);
	var rightWidthFactor = Math.pow(2, -1/$scope.treeVars.rightAlpha);
	var leftLenghtFactor = Math.pow(2, -2/(3*$scope.treeVars.leftAlpha));
	var rightLengthFactor = Math.pow(2, -2/(3*$scope.treeVars.rightAlpha));

	// var angleDelta = 20;
	 
	function drawLine(x1, y1, x2, y2, width){
		context.beginPath();
		context.lineWidth = width;
		context.moveTo(x1, y1);
		context.lineTo(x2, y2);
		
		context.closePath();
		context.stroke();
		// context.rect(x2, y2, width, width);
		//context.arc(x2, y2, width/1.5, 0, 2*Math.PI);
		// context.fill();
	}

	function drawTree(x1, y1, width, length, angle, level){
		if (level != 0){
			var x2 = x1 + (Math.cos(angle * deg_to_rad) * length);
			var y2 = y1 + (Math.sin(angle * deg_to_rad) * length);
			drawLine(x1, y1, x2, y2, width);
			drawTree(x2, y2, width*leftWidthFactor, length*leftLenghtFactor, angle - $scope.treeVars.leftAngle, level - 1);
			drawTree(x2, y2, width*rightWidthFactor, length*rightLengthFactor, angle + $scope.treeVars.rightAngle, level - 1);
		}
	}

	$scope.makeTree = function() {
		drawTree(600, 800, $scope.treeVars.width, $scope.treeVars.length, $scope.treeVars.initialAngle, $scope.treeVars.level);
	}
	$scope.clearTree = function() {
		context.clearRect(0, 0, 1200, 900);
	}
}