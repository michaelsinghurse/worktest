## Challenge #1

### Pre-Challenge Summary

It seems the primary difficulty with this problem is the math or trigonometry.
Implementing the function seems to be pretty trivial once I have the formula for
relating `x` to `θ`.

My approach will be to work out the formula by hand and then code the function.
I've been working in JavaScript in recent months and so that's the language I'll
use for this problem.

The function will take as input `x` in inches and output `θ` in radians.

### Post-Challenge Summary

My solution is in the file `challenge1.js`. You can run it as is and execute the
tests it contains by passing it as the first and only argument to Node.js. 
If you'd like to add your own inputs, simply open the file and
call the function with a value for `x`. Save and execute with Node. It does not
log the output by default so you would need to wrap the function call in a
console.log() method call. 

Note that the function takes an optional second parameter `hardLeft` which is 
set to false by default. 

The reason for this second parameter `hardLeft` is because certain input values
of `x` will produce an indeterminate angle value. When the wheel is facing
directly ahead (i.e. `θ` is 0), the value of `x` is around 2.6 inches. If the
wheel begins to turn to the left, (i.e. `θ` increases from 0) `x` will 
decrease until it reaches a minimum value of around 0.63 inches and then will 
begin increasing again until it reaches its maximum left-turn value of around 
3.25 inches when the wheel is facing directly left (`θ` is 90 degrees).

The `x` values from around 0.63 inches to around 3.25 inches are indeterminate, 
therefore. Each value of `x` in that range could have 2 angle values - one for 
what I call a hard left turn, and one for a soft left or soft right turn. That 
is why I had to add the second parameter to the function.

This of course is not an ideal solution as it pushes the problem upstream. 
How will the caller of the function know whether it is a hard-left turn or not?

One potential solution would be to turn the function into a class so that it can
have state. The state could track the recent `x` values. When the method is 
called it could then examine the recent `x` values and see whether the wheel has
been turning to the right, turning soft to the left or turning hard to the left. 
I'm thinking the state could be an array and then there would be an algorithm to 
determine the angle considering the current `x` value and the recent `x` values.
One challenge with this solution is how to set the state at initialization when
you don't have recent `x` values, say when the machine is first started. What do 
you do when the first `x` value passed to the object is indeterminate and you
don't have a recent history? You may have to save the the wheel's angle to disk
when the machine shuts down.

I'd say a better solution is to move the piston if possible. If it is feasible 
to move the pin of the piston, i.e. the spot where the piston is attached to 
the frame of the vehicle, perhaps it could be moved to a location where there 
are no duplicate `x` values. This may work if you moved the piston up a few
inches so that the pin is almost in the same horizontal line with the pin 
of the wheel.

Time spent on problem: 5 hours

## Challenge #2

### Pre-Challenge Summary

Like the last problem, I believe the programming of this solution will be fairly
trivial once I work out the math. To start, I'd like to get a sense for what 
the data looks like. I'm going to import the json into Excel and put it on 
a chart. (I may have to write a script to convert the json to csv first.)
I should be able to identify any outliers from looking at the chart. After 
applying the smoothing method, too, I can chart the points and see what the 
function did.

My method for solving this as follows:
1) Chart the points in Excel. I may or may need to convert the json to csv.
2) Research statistical methods to smooth the data and remove outliers. I 
don't know at this point whether I can simply use a statistics library to do
this or whether I need to find the math equations and write my own function.
3) Apply the method to the points.
4) Chart the points again and see what the function did.
 
Regarding the language used, I'll use JavaScript again unless I find a
third-party library for the statistical method. I'd say Python or R would be the
most likely languages used if there is one.

### Post-Challenge Summary

I spent about 2 hours on step 1 above. I wrote a function `jsonToCsv.js` that
converts the `region.json` file into a csv file. I then charted the points using
Excel and saw that 3 of them were obvious outliers.

I then emailed Drew to ask for clarification about the amount of time I'm
spending on the problems. Drew suggested that I stick closer to the suggested
times even if my solutions have to be very simple.

So, rather than trying to find a statistical method to smooth the data, I
created a very simple function that takes the array of points and a maximum
distance between consecutive points as inputs, and returns a new array that has 
all the points that are too far away from the previous point removed.

The function is in `challenge2.js`. You can invoke it with `node challenge2.js`
from the command line. Currently it is set to read from the file `region.json`,
which is in the same directory, and write to a file `regionSmoothed.json`. These
variables are set at the top of the file and can be modified. And so too can the
maximum distance between points by changing the `TOLERANCE` value.

Time spent on creating this file: 30 minutes.

## Challenge #3




