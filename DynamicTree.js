// DynamicTree v1.3

angular.module('dyTree', ['ngSlider']);

function TreeCtrl($scope){

	var elem = document.getElementById('canvas');
	var context = elem.getContext('2d');
	 
	context.fillStyle   = '#000';
	context.lineWidth   = 1;

	// These variables initialized to Tree w/ foilage tree
	// Array of tree varibles
	var defaultTreeVars = [
		{name: "Lean", value: "-82", options : { from: -180, to: 0, step: 5, dimension: " Lean" }}, // Initial angle of the trunk
		{name: "Length", value: "135", options : { from: 0, to: 250, step: 5, dimension: " Length" }}, // Length of the first stem
		{name: "Width", value: "17", options : { from: 0, to: 99, step: 2, dimension: " Width"  }}, // Width of the first stem
		{name: "LeftAlpha", value: "180", options : { from: 5, to: 595, step: 5, dimension: " LeftAlpha"  }}, // change ratio for leftside of tree
		{name: "RightAlpha", value: "220", options : { from: 5, to: 595, step: 5, dimension: " RightAlpha"  }}, // change ratio for leftside of tree
		{name: "LeftAngle", value: "19", options : { from: 5, to: 90, step: 2, dimension: " LeftAngle"  }}, // Left branch angle delta
		{name: "RightAngle", value: "31", options : { from: 0, to: 90, step: 2, dimension: " RightAngle"  }}, // Right branch angle delta
		{name: "Level", value: "14", options : { from: 1, to: 18, step: 1, dimension: " Level"  }} // Level of recursion
	];

	$scope.treeVars = angular.copy(defaultTreeVars);

	$scope.autoDraw = true;

	console.log($scope.treeVars);

	//  Here are some examples of interesting inputs
	$scope.treeCatalog = [
		// tree          lean 	length 	width 	leftAlpha 	rightAlpha 	leftAngle 	rightAngle 	level
		{name:"Square", lean:"-90", tLength:"250", tWidth:"35", leftAlpha:"120", rightAlpha:"120", leftAngle:"90", rightAngle:"90", level:"16"},
		{name:"Bronchial", lean:"-90", tLength:"90", tWidth:"10", leftAlpha:"300", rightAlpha:"300", leftAngle:"33", rightAngle:"33", level:"10"},
		{name:"Shoot", lean:"-82", tLength:"180", tWidth:"12", leftAlpha:"180", rightAlpha:"10", leftAngle:"30", rightAngle:"0", level:"12"},
		{name:"Tree with foilage", lean:"-85", tLength:"135", tWidth:"17", leftAlpha:"180", rightAlpha:"220", leftAngle:"19", rightAngle:"31", level:"14"},// Initial default
		{name:"Symetrical", lean:"-90", tLength:"180", tWidth:"26", leftAlpha:"180", rightAlpha:"180", leftAngle:"22", rightAngle:"22", level:"9"},
		{name:"Lucky bamboo", lean:"-75", tLength:"150", tWidth:"30", leftAlpha:"180", rightAlpha:"25", leftAngle:"15", rightAngle:"80", level:"16"},
		{name:"Goofy", lean:"-90", tLength:"236", tWidth:"36", leftAlpha:"120", rightAlpha:"240", leftAngle:"48", rightAngle:"85", level:"12"}, // and set rightLengthFactor to equal the left
		{name:"Leaf", lean:"-82", tLength:"155", tWidth:"10", leftAlpha:"180", rightAlpha:"220", leftAngle:"15", rightAngle:"65", level:"16"}, // and set rightLengthFactor to equal the left
		{name:"Middle of the Road", lean:"-90", tLength:"125", tWidth:"50", leftAlpha:"300", rightAlpha:"300", leftAngle:"46", rightAngle:"46", level:"9"}, // and set rightLengthFactor to equal the left
		{name:"One-sided", lean:"-90", tLength:"135", tWidth:"17", leftAlpha:"180", rightAlpha:"220", leftAngle:"0", rightAngle:"31", level:"12"}
		];

	/*
	Tumbleweed			-90			135		17		1.8 		2.2 		19			31		16 // Concate angels as strings to delt instead of math.
	Middle of the Road	-90			125 	50 		3.0 		3.0 		46 			46 		9  // Middle setting for all treeVars
	*/

	var deg_to_rad = Math.PI / 180.0;
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
		length = parseInt($scope.treeVars[1].value);
		width = parseInt($scope.treeVars[2].value);
		leftAlpha = parseInt($scope.treeVars[3].value)/100.00;
		rightAlpha = parseInt($scope.treeVars[4].value)/100.00;
		leftAngle = parseInt($scope.treeVars[5].value);
		rightAngle = parseInt($scope.treeVars[6].value); // Somehow for some of these the parseInt was required.
		level = parseInt($scope.treeVars[7].value);
		
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
		// Attemp at closing the joint between lines
		// context.rect(x2, y2, width, width);
		// context.arc(x2, y2, width/1.5, 0, 2*Math.PI);
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
// 			Orignal draw functions from Fractals book.
//			drawLine(x1, y1, x2, y2, width);
//			drawTree(x2, y2, width*leftWidthFactor, length*leftLengthFactor, angle - $scope.treeVars.leftAngle, level - 1);
//			drawTree(x2, y2, width*rightWidthFactor, length*rightLengthFactor, angle + $scope.treeVars.rightAngle, level - 1);
		}
		else {
			drawing = false;
		}
	}

	$scope.makeTree = function() {

		if (drawing) return;
		drawing = true;	
		calcFactors();
		console.log("make", lean, angle, length, width, leftAlpha, rightAlpha, leftAngle, rightAngle, level);
		drawTree(400, 800, width, length, lean, level);
		timerId3 = setTimeout($scope.makeTree, 800);
	}

	$scope.clearTree = function() {
		clearTimeout(timerId1);
		clearTimeout(timerId2);
		clearTimeout(timerId3);
		context.clearRect(0, 0, 1200, 1800);
		repeatCounter = 0;
		drawing = false;
	}

	$scope.toggleAutoDraw = function() {
		$scope.autoDraw = !$scope.autoDraw;
	}

	$scope.setCurrentTreeVars = function(index) {
		//console.log("setCurrentTreeVars", index);
		//console.log($scope.treeVars);
		defaultTreeVars[0].value = $scope.treeCatalog[index].lean;
		defaultTreeVars[1].value = $scope.treeCatalog[index].tLength;
		defaultTreeVars[2].value = $scope.treeCatalog[index].tWidth;
		defaultTreeVars[3].value = $scope.treeCatalog[index].leftAlpha;
		defaultTreeVars[4].value = $scope.treeCatalog[index].rightAlpha;
		defaultTreeVars[5].value = $scope.treeCatalog[index].leftAngle;
		defaultTreeVars[6].value = $scope.treeCatalog[index].rightAngle;
		defaultTreeVars[7].value = $scope.treeCatalog[index].level;
		//console.log($scope.treeVars);
	
		$scope.treeVars = angular.copy(defaultTreeVars);

	}

	calcFactors();

	// This works to detect a change in values and make a new tree. 
	// Notice I'm building the ng expresion by string concatination.
	angular.forEach($scope.treeVars, function(value,key) {
	  	$scope.$watch('treeVars['+key+'].value' , function(newVal, oldVal) {
    	 	// console.log(key + ' has changed from ' + oldVal + ' to ' + newVal);
  			// console.log($scope.autoDraw, drawing);
  			if ((newVal !== oldVal) && $scope.autoDraw && !drawing) {
  				$scope.clearTree();
  				$scope.makeTree();
			}
	 	});
	});

	$scope.makeTree(); // Draw the default tree on start-up

}
