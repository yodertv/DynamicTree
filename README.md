Dynamic Tree
============

##New in release 1.2

- Tried repeat variable - somewhat interesting and removed it
- Used setInterval and animated the drawing of trees
- Fixed bug that factors were not recalculated when the varibles changed
- Fixed bug where left and righ length factors were the same. Discovered Goofy tree. To recreate the bug must be put back.
- Display factors for debugging.
- Changed to markdown for readme.


##Here are some examples of interesting inputs:

tree		| initilAngle	| length| width	| leftAlpha	| rightAlpha	| leftAngle	| rightAngle| level
----		| -----------	| ------| -----	| ---------	| ----------	| ---------	| ----------| -----
Square		| -90			| 250 	| 35 	| 1.2 		| 1.2   		| 90		| 90 		| 12
Symetrical 	| -90 			| 180 	| 21 	| 1.2 		| 1.2   		| 25		| 25 		| 12
Foilage		| -82			| 135 	| 13 	| 1.8 		| 2.2   		| 19 		| 31 		| 16
Bronchial	| -90 			| 90  	| 10 	| 3.0 		| 3.0   		| 33 		| 33 		| 10
One-Sided	| -95			| 150 	| 12 	| 1.8 		| 0.002 		| 30 		| 0			| 16
Goofy*		| -90			| 236 	| 45 	| 1.2 		| 2.4   		| 48		| 85		| 12

*and set rightLengthFactor equal to the leftAlpha

##New in release 1.1

- Draw trees based on Fractal book algorithms
- Added input
- Comments contain named catalog of interesting tree settings.

##Backlog:

- Add seperate Alpha variable for left, right, width, and length
- Use ng-slider for variable control
- Save as button to export tree
