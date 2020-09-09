// challenge1.js

"use strict";

function getSteeringAngle(pistonX, isHardLeft = false) {
  const PISTON_BASE_LENGTH = 5;
  const PISTON_PIN_OFFSET_X = 7;
  const PISTON_PIN_OFFSET_Y = 8;
  const WHEEL_STEM_LENGTH = 5;
  
  const distanceWheelPinToPistonPin =
    Math.sqrt(PISTON_PIN_OFFSET_X ** 2 + PISTON_PIN_OFFSET_Y ** 2);
  
  const pistonLength = pistonX + PISTON_BASE_LENGTH;

  // using the law of cosines: c^2 = a^2 + b^2 - 2*a*c*cosine(C)
  // and setting a = the wheel stem length
  //             b = the distance from the wheel pin to piston pin
  //             c = the piston length
  //             C = the angle opposite the piston
  // and solving for C
  const pistonAngle = 
    Math.acos(
      (WHEEL_STEM_LENGTH ** 2 + distanceWheelPinToPistonPin ** 2 - pistonLength ** 2) 
      / (2 * WHEEL_STEM_LENGTH * distanceWheelPinToPistonPin)
    );
  
  if (isHardLeft) {
    return pistonAngle + Math.atan(PISTON_PIN_OFFSET_X / PISTON_PIN_OFFSET_Y);
  }
  return Math.atan(PISTON_PIN_OFFSET_X / PISTON_PIN_OFFSET_Y) - pistonAngle;
}


// TESTS:
let desc, pistonX, expected;

desc = "wheel aimed straight forward";
pistonX = 2.6157731058639087;
expected = 0;
assertAreEqualNumbers(desc, getSteeringAngle(pistonX), expected);

desc = "piston pointed directly at wheel pivot";
pistonX = 0.63014581273465;
expected = Math.atan(7 / 8);
assertAreEqualNumbers(desc, getSteeringAngle(pistonX), expected);

desc = "wheel aimed at 90 degrees left";
pistonX = 3.2462112512353194;
expected = Math.PI / 2;
assertAreEqualNumbers(desc, getSteeringAngle(pistonX, true), expected);

desc = "wheel aimed at 90 degrees right";
pistonX = 9.422205101855956;
expected = -1 * Math.PI / 2;
assertAreEqualNumbers(desc, getSteeringAngle(pistonX), expected);

desc = "x is 3 and wheel aimed to the right";
pistonX = 3;
expected = -0.0819688;
assertAreEqualNumbers(desc, getSteeringAngle(pistonX), expected);

desc = "x is 3 and wheel aimed to the left";
pistonX = 3;
expected = 1.5196288;
assertAreEqualNumbers(desc, getSteeringAngle(pistonX, true), expected);

function assertAreEqualNumbers(desc, actual, expected) {
  const TOLERANCE = 0.0001;
   
  console.log("*********************************************************");
  console.log(desc);
  if (Math.abs(actual - expected) < TOLERANCE) {
    console.log("PASS");
  } else {
    console.log("FAIL");
    console.log("actual:", actual);
    console.log("expected:", expected);
  }
}
