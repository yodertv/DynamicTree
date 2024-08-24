Dynamic Tree
============

Credit to Roger T. Stevens "Fractal Programming in C", 1989 M&T Books, Redwood City, CA.

[DynamicTree](https://dynamic-tree.vercel.app/) draws and clears a fractal based tree on a canvas as configured by 8 variables that can be input using sliders.

Uses angularjs and ng-slider.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="DynamicTreeWhite.png">
  <img alt="Shows a vector based tree." src="DynamicTree.png">
</picture>

##Here are some examples of interesting inputs:

tree		| initAngle	| length| width	| leftAlpha	| rightAlpha| leftAngle	| rightAngle| level
----		| ---------	| ------| -----	| ---------	| ----------| ---------	| ----------| -----
Square		| -90		| 250 	| 35 	| 1.2 		| 1.2   	| 90		| 90 		| 12
Symetrical 	| -90 		| 180 	| 26	| 1.2 		| 1.2   	| 25		| 25 		| 12
Foilage		| -82		| 135 	| 13 	| 1.8 		| 2.2   	| 19 		| 31 		| 16
Bronchial	| -90 		| 90  	| 10 	| 3.0 		| 3.0   	| 33 		| 33 		| 10
Mid Values	| -90		| 125	| 50	| 3.0		| 3.0 		| 46		| 46		| 9
Goofy*		| -90		| 236 	| 45 	| 1.2 		| 2.4   	| 48		| 85		| 12
One-sided	| -90		| 135	| 17 	| 1.8 		| 2.2 		| 0			| 31		| 12
Leaf		| -82		| 155	| 10 	| 1.8 		| 2.2 		| 15 		| 65		| 16
Shoot		| -95		| 150 	| 12 	| 1.8 		| 0.1 		| 30 		| 0 		| 16
Lucky Bamboo| -95		| 150 	| 12 	| 1.8 		| 0.25 		| 30 		| 0 		| 16

*and set rightLengthFactor equal to the leftAlpha

##Demo
Try it out [here](https://dynamic-tree.vercel.app/).

##Notes for Release 1.4
- Noted tumbleweed tree in docs.
- Can it be recreated? Treat angles delta as string concat rather than addition.
- Updated length input for more granularity.
- Worked hard at using a loop to create watches on my treeVars collection. Switched from array to collection and discovered that the order of a collection is not defined. Never noticed this before. Do I care about the order of the sliders? In the end I switched back to an array.
- Switch back to an array to enforce the variables order
- Created the slider list watches with and angular.forEach. Now I can extend the variables at will.
- Add clear and redraw to slider value set event. Still considering if this is a good feature. So I ...
- added a toggle switch to control dynamic re-draw on slider change vs. manual clear + draw. Clear and draw are not toggled so that the same tree can be redrawn.
- Added default list, but sliders are not updating. The tree is drawn as expected.
- Dynamically clear and draw trees. E.g., add clear and redraw to slider value set event
- toggle switch to control dynamic re-draw vs. clear + draw
- Add seperate left and right Alpha variable for each of angle, width, and length. This allows goofy tree by input.
- Deploy to web
- A way to set variables to catalog trees

##Backlog:
- Save button to export tree
- Works on mobile browser
- Make canvas size dynamic to window size

##Notes for Release 1.5
- Prevented a new drawing from starting while drawing
- Draw the default tree on start-up

##Notes for Release 1.4
- Add seperate left and right Alpha variable for each of angle, width, and length. This allows goofy tree by input.
- Note tumbleweed tree in docs
- Can it be recreated? Treat angles delta as string concat rather than addition.
- Updated length input for more granularity.
- Worked hard at using a loop to create watches on my treeVars collection. Switched from array to collection and discovered that the order of a collection is not defined. Never noticed this before. Do I care about the order of the sliders? If I do I'll need to go back to an array.
- Created the slider list watches with and angular.forEach. Now I can extend the variables at will.
- Add clear and redraw to slider value set event. Still considering if this is a good feature.

##Notes for release 1.3
- Added title
- Added version number
- Use ng-slider for variable control. Relearned ng and js challenges when things don't work. Why a number gets treated as text later in the code was struggle. Discovered a Tanglewood tree by concating 31 to 90 instead of addeding.
- Got sliders in a div on the left
- Debug lines in both html and js.

##Notes for release 1.2

- Tried repeat variable - somewhat interesting and removed it
- Used setInterval and animated the drawing of trees
- Fixed bug that factors were not recalculated when the varibles changed
- Fixed bug where left and righ length factors were the same. Discovered Goofy tree. To recreate the bug must be put back.
- Display factors for debugging.
- Changed to markdown for readme.

##Notes for release 1.1

- Draw trees based on Fractal book algorithms
- Added input
- Comments contain named catalog of interesting tree settings.
