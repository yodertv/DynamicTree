// DynamicTree v1.3

/*  Here are some examples of interesting inputs
tree           		initilAngle 	length 	width 	leftAlpha 	rightAlpha 	leftAngle 	rightAngle 	level
Square				-90				250		35		1.2 		1.2 		90 			90			12
Symetrical 			-90 			180 	21 		1.2 		1.2 		25 			25 			12
Tree with foilage	-82				135		17 		1.8 		2.2 		19 			31			16 // Initial default
Bronchial			-90 			90 		10 		3.0 		3.0 		33 			33 			10
Shoot				-95				150 	12 		1.8 		0.1 		30 			0 			16
Lucky bamboo		-95				150 	12 		1.8 		0.25 		30 			0 			16
Goofy				-90				236		236 	1.2 		2.4 		48			85			12 // and set rightLengthFactor to equal the left
One-sided			-82				135		17 		1.8 		2.2 		0			31			12
Leaf				-82				155		10 		1.8 		2.2 		15 			65			16
*/

angular.module('dyTree', ['ngSlider']);

function TreeCtrl($scope){

	var elem = document.getElementById('canvas');
	var context = elem.getContext('2d');
	 
	context.fillStyle   = '#000';
	context.lineWidth   = 1;

	// These variables initialized to Tree w/ foilage tree

	$scope.treeVars = [
		{text: "Lean", value: "-90", options : { from: -180, to: 0, step: 5, dimension: " lean" }}, // Initial angle of the trunk
		{text: "Length", value: "135", options : { from: 10, to: 250, step: 10, dimension: " length" }}, // Length of the first stem
		{text: "Width", value: "17", options : { from: 0, to: 60, step: 1, dimension: " width"  }}, // Width of the first stem
		{text: "LeftAlpha", value: "180", options : { from: 5, to: 595, step: 5, dimension: " leftAlpha"  }}, // change ratio for leftside of tree
		{text: "RightAlpha", value: "220", options : { from: 5, to: 595, step: 5, dimension: " rightAlpha"  }}, // change ratio for leftside of tree
		{text: "LeftAngle", value: "19", options : { from: 5, to: 90, step: 2, dimension: " leftAngle"  }}, // Left branch angle delta
		{text: "RightAngle", value: "31", options : { from: 0, to: 90, step: 2, dimension: " rightAngle"  }}, // Right branch angle delta
		{text: "Level", value: "16", options : { from: 1, to: 18, step: 1, dimension: " level"  }} // Level of recursion
	];

	var deg_to_rad = Math.PI / 180.0;
	
	var repeatCounter = 0;
	var lineDrawn = false;
	var timerId1 = undefined;
	var timerId2 = undefined;
	var timerId3 = undefined;
	var drawing = false;

	// treeVars
	var lean = -90;
	var angle = lean;
	var length = 135;
	var width = 17;
	var leftAlpha = 1.8;
	var rightAlpha = 2.2;
	var leftAngle = 19;
	var rightAngle = 31;
	var level = 16;

	function calcFactors(){
		lean  = parseInt($scope.treeVars[0].value);
		length = $scope.treeVars[1].value;
		width = $scope.treeVars[2].value;
		leftAlpha = parseInt($scope.treeVars[3].value)/100.00;
		rightAlpha = parseInt($scope.treeVars[4].value)/100.00;
		leftAngle = parseInt($scope.treeVars[5].value);
		rightAngle = parseInt($scope.treeVars[6].value); // Somehow for some of these the parseInt was required.
		level = $scope.treeVars[7].value;
		
		$scope.leftWidthFactor = Math.pow(2, -1/leftAlpha);       
		$scope.rightWidthFactor = Math.pow(2, -1/rightAlpha);
		$scope.leftLengthFactor = Math.pow(2, -2/(3*leftAlpha));
		$scope.rightLengthFactor = Math.pow(2, -2/(3*rightAlpha));

		// console.log("calc", lean, length, width, leftAlpha, rightAlpha, leftAngle, rightAngle, level);
	}

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
		if ((level != 0) && (drawing == true)) {
			// console.log("draw", x1, y1, width, length, angle, level);
			var x2 = x1 + (Math.cos(angle * deg_to_rad) * length);
			var y2 = y1 + (Math.sin(angle * deg_to_rad) * length);
			drawLine(x1, y1, x2, y2, width);
			timerId1 = setTimeout(function () {
				drawTree(x2, y2, width*$scope.leftWidthFactor, length*$scope.leftLengthFactor, angle-leftAngle, level - 1)
			}, 140);
			timerId2 = setTimeout(function () {
				drawTree(x2, y2, width*$scope.rightWidthFactor, length*$scope.rightLengthFactor, angle+rightAngle, level - 1)
			}, 140);
//			drawLine(x1, y1, x2, y2, width);
//			drawTree(x2, y2, width*leftWidthFactor, length*leftLengthFactor, angle - $scope.treeVars.leftAngle, level - 1);
//			drawTree(x2, y2, width*rightWidthFactor, length*rightLengthFactor, angle + $scope.treeVars.rightAngle, level - 1);
		}
	}

	$scope.makeTree = function() {
		//for (var i=0; i < 6; i+=2) {
		drawing = true;	
		calcFactors();
		// console.log("make", width, length, lean, level);
		drawTree(500, 600+(10*repeatCounter), width, length, lean, level);
		timerId3 = setTimeout($scope.makeTree, 800);
		repeatCounter++;
		if (repeatCounter>0) { 
			// drawing = false;
			clearTimeout(timerId3)
			repeatCounter = 0;
		};
	}

	$scope.clearTree = function() {
		//clearTimeout(timerId);
		//clearTimeout(timerId2);
		clearTimeout(timerId3);
		context.clearRect(0, 0, 1200, 1800);
		repeatCounter = 0;
		drawing = false;
	}

	calcFactors();
}