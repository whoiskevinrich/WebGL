// Vec3_qunit.js

var TOLERANCE = 0.001;

var testString = "foo";
var testNumericArray = new Array(1, 2, 3);
var testStringArray = new Array("a", "b", "c");
var testUndefined = undefined;
var testNull = null;
var testVec3 = new Vec3();
var TestObject = function(){this.type = typeof TestObject;};

module( "Vec3 Testing" );
	
test("Constructor", function(){
	// Test Constructor with passed arguments
	var resultV0 = randFloat();
	var resultV1 = randFloat();
	var resultV2 = randFloat();
	var vector = new Vec3(resultV0,resultV1,resultV2);
	
	equal(vector.v0, resultV0, "X component sets properly");
	equal(vector.v1, resultV1, "Y component sets properly");
	equal(vector.v2, resultV2, "Z component sets properly");
	ok(true, "Vector initializes with passed arguments");
	
	vector = undefined;
	
	//Test Default Constructor
	var vector = new Vec3();
	equal(vector.v0, 0, "Default Constructor X component sets to identity");
	equal(vector.v1, 0, "Default Constructor Y component sets to identity");
	equal(vector.v2, 0, "Default Constructor Z component sets to identity");
	ok(true, "Vector initializes as identity Vector with no arguments passed");
	ok(vector instanceof Vec3, "Vector has correct type");
	
	vector = undefined;
	
	function testConstructorFailure(arg, message) {
		vector = undefined;
		throws(
			function(){
				var vector = new Vec3(arg);
			},
			"Constructor fails when passed a " + typeof arg + "(" + message + ")"
		);
	};
	
	//Test failure on non-numerics
	throws(
		function(){
			var vector = new Vec3('a', 'b', 'c');
		},
		"Constructor fails when passed strings"
	);
	vector = undefined;
	
	throws(
		function(){
			var vector = new Vec3('a', 1, 2);
		},
		"Constructor fails when passed {string,numeric,numeric}"
	);
	vector = undefined;
	
	throws(
		function(){
			var vector = new Vec3(0, 'a', 2);
		},
		"Constructor fails when passed {numeric, string, numeric}"
	);
	vector = undefined;

	testConstructorFailure(testString, "string")
	testConstructorFailure(testNumericArray, "numeric array");
	testConstructorFailure(testStringArray, "string array");
	testConstructorFailure(testVec3, "Vec3 Object");

	vector = undefined;
	arg = undefined;
	
	ok(true, "Constructor testing complete");
});

test("Identity", function(){
	var x = randFloat();
	var y = randFloat();
	var z = randFloat();
	var vector = new Vec3(x,y,z);
	vector.setIdentity();
	equal(vector.v0, 1, "X component sets properly");
	equal(vector.v1, 1, "Y component sets properly");
	equal(vector.v2, 1, "Z component sets properly");
	
	ok(true, "Set Identitiy testing complete");
});

test("Type Matching", function(){
	var rhs = "string";
	var vector = new Vec3();
	ok(!(vector.typematch(rhs)), "Type comparison with string fails");
	rhs = null;
	rhs = new Vec3();
	ok(vector.typematch(rhs), "Type comparison with Vec3 passes");
	
	ok(true, "Type Match testing complete");
});

test("Set Equal", function(){
	var x = 6;
	var y = 7;
	var z = -10;
	var vector1 = randVec();
	var vector2 = new Vec3(x, y, z);
	vector1.setEqualTo(vector2);
	equal(vector1.v0, x, "X component sets properly");
	equal(vector1.v1, y, "Y component sets properly");
	equal(vector1.v2, z, "Z component sets properly");
	
	ok(true, 'Function behaves as expected when passed numerics');
	
	function testEqualsFailures(arg, msg){
		throws(
			function(){
				vector1.setEqualTo(arg);
			},
			"Function fails when passed " + typeof arg + " " + msg
		);
	};
	
	testEqualsFailures(testString, "string");
	testEqualsFailures(testNumericArray, "numeric array");
	testEqualsFailures(testStringArray, "string array");
	testEqualsFailures(testUndefined, "undefined");
	testEqualsFailures(testNull, "null");
	testEqualsFailures(TestObject, "object");
	
	ok(true, "Set Equal testing complete");
});

test("Addition", function() {
	var x1 = randFloat();
	var y1 = randFloat();
	var z1 = randFloat();
	var x2 = randFloat();
	var y2 = randFloat();
	var z2 = randFloat();
	
	var vector1 = new Vec3( x1, y1, z1 );
	var vector2 = new Vec3( x2, y2, z2 );
	
	var vector = vector1.plus(vector2);
	
	equal(vector.v0, x1 + x2, "X Component should add correctly");
	equal(vector.v1, y1 + y2, "Y Component should add correctly");
	equal(vector.v2, z1 + z2, "Z Component should add correctly");
	
	function testAdditionFailures(arg, msg){
		throws(
			function(){
				vector1.setEqualTo(arg);
			},
			"Function fails when passed " + msg + " typeof " + typeof arg
		);
	};
	
	testAdditionFailures(testString, "string");
	testAdditionFailures(testNumericArray, "numeric string");
	testAdditionFailures(testStringArray, "string array");
	testAdditionFailures(testUndefined, "undefined");
	testAdditionFailures(testNull, "null");
	testAdditionFailures(TestObject, "object");
	
	ok(true, "Addition testing complete");
});

test("Subtraction", function() {
	var x1 = randFloat();
	var y1 = randFloat();
	var z1 = randFloat();
	var x2 = randFloat();
	var y2 = randFloat();
	var z2 = randFloat();
	
	var vector1 = new Vec3( x1, y1, z1 );
	var vector2 = new Vec3( x2, y2, z2 );
	
	var vector = vector1.minus(vector2);
	
	equal(vector.v0, x1 - x2, "X Component add correctly");
	equal(vector.v1, y1 - y2, "Y Component add correctly");
	equal(vector.v2, z1 - z2, "Z Component add correctly");
	
	vector = undefined;
	vector1 = undefined;
	vector2 = undefined;
	
	function testSubtractionArgs(arg, msg){
		throws(
			function(){
				vector1.setEqualTo(arg);
			},
			"Function fails when passed " + msg + " typeof " + typeof arg
		);
	};
	
	testSubtractionArgs(testString, "string");
	testSubtractionArgs(testNumericArray, "numeric string");
	testSubtractionArgs(testStringArray, "string array");
	testSubtractionArgs(testUndefined, "undefined");
	testSubtractionArgs(testNull, "null");
	testSubtractionArgs(TestObject, "object");
	
	ok(true, "Subtraction testing complete");
});

test("Negation", function() {
	vector = new Vec3(1,2,3);
	result = new Vec3(-1,-2,-3);
	vector.negate();
	
	deepEqual(vector, result, "Negation works with expected values");

	ok(true, "Negation testing complete");
});

test("Cross Product", function() {
	vec1 = new Vec3(3,-3,1);
	vec2 = new Vec3(4,9,2);
	expected = new Vec3(-15,-2,39);
	
	result = vec1.cross(vec2);
	deepEqual(result, expected, "Cross product works with expected values");
	
	// TODO: non-expected values
	
	ok(true, "Cross Product testing complete");
});

test("Dot Product", function() {
	vec1 = new Vec3(1,2,3);
	vec2 = new Vec3(4,-5,6);
	
	dotProduct = vec1.dot(vec2);
	equal(dotProduct, 12, "Dot Product calculates with expected values");
	
	function testDotProductArgs(arg, msg){
		throws(
			function(){
				vector.setEqualTo(arg);
			},
			"negation fails when passed " + msg + " typeof " + typeof arg
		);
	};
	
	testDotProductArgs(testString, "string");
	testDotProductArgs(testNumericArray, "numeric string");
	testDotProductArgs(testStringArray, "string array");
	testDotProductArgs(testUndefined, "undefined");
	testDotProductArgs(testNull, "null");
	testDotProductArgs(TestObject, "object");	

	ok(true, "Dot Product testing complete");
});

test("Length", function(assert) {
	vector = new Vec3(1, 2, 3);
	assert.close(vector.length(), 3.742, TOLERANCE, "1st length test passed");
	
	vector = new Vec3(2, -4, 4);
	assert.close(vector.length(), 6, TOLERANCE, "2nd length test passed");
	
	vector = new Vec3(-1, -2, 3);
	assert.close(vector.length(), 3.742, TOLERANCE, "3rd length test passed");
	
	ok(true, "Length testing complete");
});

test("Unit", function(assert) {
	vector = new Vec3(3, 1, 2);
	assert.close(vector.unit().v0, 0.802, TOLERANCE,"X component calculates correctly")
	assert.close(vector.unit().v1, 0.267, TOLERANCE,"Y component calculates correctly")
	assert.close(vector.unit().v2, 0.534, TOLERANCE,"Z component calculates correctly")
});

// generates a number between -99 and 99
function randFloat(){
	return (Math.random() * 199) - 99;
};

// generate Vec3 with random properties
function randVec(){
	return new Vec3(randFloat(), randFloat(), randFloat());
};