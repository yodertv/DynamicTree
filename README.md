Dynamic Tree
============


##New in release 1.3
- Added title
- Added version number
- Use ng-slider for variable control. Relearned ng and js challenges when things don't work. Why a number gets treated as text later in the code was struggle. Discovered a Tanglewood tree by concating 31 to 90 instead of addeding.
- Got sliders in a div on the left
- Debug lines in both html and js.

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

- Dynamically clear and draw trees. E.g., add clear and redraw to slider value set event
- Add seperate Alpha variable for left, right, width, and length
- Use ng-slider for variable input
- Add seperate left and right Alpha variable for each of angle, width, and length. This allows goofy tree by input.
- Save as button to export tree
- Work on mobile browser
- Package and deliver by email
