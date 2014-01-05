// Mat4_qunit.js

// "Constants"
var TOLERANCE = 0.001;

var testString = "foo";
var testNumericArray = new Array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16);
var testStringArray = new Array("a", "b", "c");
var testVector = new Vec3(1,2,3);
var testObject = function(){this.type = "TestObject";};
var testMatrix = new Mat4(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16);

// Place null types at end of array
var NULLTYPES = 2;
var nonMat4Types = new Array(
	testString,
	testNumericArray,
	testVector,
	testObject,
	null,
	undefined
);

module( "Mat4 Testing" );
test("Constructor", function(){
	result = new Mat4();
	ok(true, "Begin Testing default constructor");
	equal(result.m[0][0], 1, "[0][0] Placed Correctly");
	equal(result.m[0][1], 0, "[0][1] Placed Correctly");
	equal(result.m[0][2], 0, "[0][2] Placed Correctly");
	equal(result.m[0][3], 0, "[0][3] Placed Correctly");
	
	equal(result.m[1][0], 0, "[1][0] Placed Correctly");
	equal(result.m[1][1], 1, "[1][1] Placed Correctly");
	equal(result.m[1][2], 0, "[1][2] Placed Correctly");
	equal(result.m[1][3], 0, "[1][3] Placed Correctly");
	
	equal(result.m[2][0], 0, "[2][0] Placed Correctly");
	equal(result.m[2][1], 0, "[2][1] Placed Correctly");
	equal(result.m[2][2], 1, "[2][2] Placed Correctly");
	equal(result.m[2][3], 0, "[2][3] Placed Correctly");
	
	equal(result.m[3][0], 0, "[3][0] Placed Correctly");
	equal(result.m[3][1], 0, "[3][1] Placed Correctly");
	equal(result.m[3][2], 0, "[3][2] Placed Correctly");
	equal(result.m[3][3], 1, "[3][3] Placed Correctly");
	
	result = undefined;
	ok(true, "Default constructors tests complete");
	
	ok(true, "Begin constructor with args test");
	
	// do not use test matrix here in case of failure
	result = new Mat4(1,2,3,4,5,6,7,8,999,10,11,12,13,14,15,16);
	equal(result.m[0][0], 1, "[0][0] Placed Correctly");
	equal(result.m[0][1], 2, "[0][1] Placed Correctly");
	equal(result.m[0][2], 3, "[0][2] Placed Correctly");
	equal(result.m[0][3], 4, "[0][3] Placed Correctly");
	
	equal(result.m[1][0], 5, "[1][0] Placed Correctly");
	equal(result.m[1][1], 6, "[1][1] Placed Correctly");
	equal(result.m[1][2], 7, "[1][2] Placed Correctly");
	equal(result.m[1][3], 8, "[1][3] Placed Correctly");
	
	equal(result.m[2][0], 999, "[2][0] Placed Correctly");
	equal(result.m[2][1], 10, "[2][1] Placed Correctly");
	equal(result.m[2][2], 11, "[2][2] Placed Correctly");
	equal(result.m[2][3], 12, "[2][3] Placed Correctly");
	
	equal(result.m[3][0], 13, "[3][0] Placed Correctly");
	equal(result.m[3][1], 14, "[3][1] Placed Correctly");
	equal(result.m[3][2], 15, "[3][2] Placed Correctly");
	equal(result.m[3][3], 16, "[3][3] Placed Correctly");
	ok(true, "Constructor with arguments tests complete");	
	
	equal(result.type, "Mat4", "Object type shows \"Mat4\"");
	
	ok(true, "Begin Invalid Argument Tests");
	
	// Accepts an argument to test as the constructor argument set and a message
	// returns a passing test if arg causes constructor to throw an error
	function testConstructorInvalidArgs(arg, message) {
		matrix = undefined;
		throws(
			function(){
				var matrix = new Mat4(arg, message);
				console.log(arg + typeof arg + "(" + message + ")");
			},
			"Constructor fails when passed " + typeof arg + "(" + message + ")"
		);
	};
	
	// test various invalid arguments for constructor.
	testConstructorInvalidArgs(test, "string");
	testConstructorInvalidArgs(testNumericArray, "16 element numeric array");
	testConstructorInvalidArgs(testStringArray, "16 element string array");
	testConstructorInvalidArgs(testVector, "Vec3 object");
	testConstructorInvalidArgs(testObject, "Custom Object");
	testConstructorInvalidArgs(testMatrix, "Mat4 object");

	ok(true, "End invalid argument tests");
	
	ok(true, "Constructor tests complete");
});

test("Identity", function(){
	result = new Mat4(9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9);
	expected = new Mat4();
	
	result.setIdentity();
	deepEqual(result, expected, "setIdentity() sets matrix to identity matrix");
	
	ok(true, "No arguments to test");
	ok(true, "Identity tests complete");
});

test("Type Matching", function(){
	matrix = new Mat4();
	
	equal(testMatrix.typematch(matrix), true, "typematch returns true for two Matrices");
	
	ok(true, "Begin testing invalid args");
	//for( i = 0; i < nonMat4Types.length; i++)
	for( i in nonMat4Types )
		equal(testMatrix.typematch(nonMat4Types[i]), false, "typematch returns false for " + typeof nonMat4Types[i] );
	ok(true, "End testing invalid args");
	ok(true, "Type Matching tests complete");
});

test("Set Equal", function(){
	var matrix1 = new Mat4();
	var matrix2 = new Mat4(9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9);
	
	matrix1.setEqual(matrix2);
	
	deepEqual(matrix1, matrix2, true, "set equal works properly");
	
	ok(true, "Set Equal tests complete");
});

// Mat4.multiply() arguments should be either Mat4 or Vec3
test("Multiplication", function(){
	// Test valid arguments; Mat4 or Vec3
	var matrix1 = new Mat4(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16);
	var matrix2 = new Mat4(1,-2,3,-4,-5,6,-7,8,9,-10,11,-12,-13,14,-15,16);
	var expected = new Mat4(-34,36,-38,40,-66,68,-70,72,-98,100,-102,104,-130,132,-134,136);	

	deepEqual(matrix1.multiply(matrix2), expected, "Mat4 x Mat4 multiplication successful");
	
	expected = undefined;
	expected = new Vec3(2,-6,-1084);
	
	deepEqual(matrix2.multiply(testVector), expected, "Mat4 x Vec3 multiplication successful");
	
	// test invalid argument types
	function testConstructorInvalidArgs(argsObj) {
		matrix = undefined;
		throws(
			function(){
				var matrix = new Mat4(arg);
			},
			"Constructor fails when passed " + typeof arg + "(" + message + ")"
		);
	};
	
	// test various invalid arguments for constructor.
	testConstuctorInvalidArgs(testString, "string");
	testConstuctorInvalidArgs(testNumericArray, "16 element numeric array");
	testConstuctorInvalidArgs(testStringArray, "16 element string array");
	testConstuctorInvalidArgs(testObject, "string");
	testConstuctorInvalidArgs(testMatrix, "Mat4 object");
	
	ok(true, "Multiplication tests complete");
});

test("Rotate X Axis", function(){
	ok(true, "Rotate X Axis tests complete");
});

test("Rotate Y Axis", function(){
	ok(true, "Rotate Y Axis tests complete");
});

test("Rotate Z Axis", function(){
	ok(true, "Rotate Z Axis tests complete");
});

test("Set Scale", function(){
	ok(true, "Set Scale tests complete");
});

test("Set Translation", function(){
	ok(true, "Set Translation tests complete");
});

test("Set Transpose", function(){

	ok(true, "No arguments to test");
	ok(true, "Set Transpose tests complete");
});
