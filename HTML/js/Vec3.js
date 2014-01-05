/*
 * Written 12/15/2013 by Kevin Rich
 * Project: Personal exploration of WebGL
 * File:	Vec3.js
 *
 * code is heavily influences by a CS Skills for Simulation and Game Programming project
 * originally written in C++
 * The Course was instructed by Mike Bailey, Oregon State University
 */

// Class Prototype
var Vec3 = function( x, y, z ){
	// allow for default constructor
	if ( x == undefined && y == undefined && z == undefined){ 
		x = 0;
		y = 0;
		z = 0;
	} else if( isNaN(x) || isNaN(y) || isNaN(z)) { 
		throw new Error("Vec3 constructor arguments must be numeric");
	}
	
	this.v0 = x;
	this.v1 = y;
	this.v2 = z;

	this.type = 'Vec3';
};

// Set x, y, z components to 1
Vec3.prototype.setIdentity = function()
{
	this.v0 = 1;
	this.v1 = 1;
	this.v2 = 1;
};

// Set 'this' vector equal the 'rhs' vector
Vec3.prototype.setEqualTo = function( rhs ){
	if (!(this.typematch( rhs ))) {throw new Error("failure to subtract; argument is not Vec3");}
	
	this.v0 = rhs.v0;
	this.v1 = rhs.v1;
	this.v2 = rhs.v2;
};

// add the 'rhs' vector to 'this' vector
Vec3.prototype.plus = function( rhs ) {
	if (!(this.typematch( rhs ))) {throw new Error("failure to subtract; argument is not Vec3");}
	
	var result = new Vec3();
	
	result.v0 = this.v0 + rhs.v0;
	result.v1 = this.v1 + rhs.v1;
	result.v2 = this.v2 + rhs.v2;
	
	return result;
};

// subtract the 'rhs' vector from 'this' vector
Vec3.prototype.minus = function( rhs ) {
	if (!(this.typematch( rhs ))) {throw new Error("failure to subtract; argument is not Vec3");}

	var result = new Vec3();
	
	result.v0 = this.v0 - rhs.v0;
	result.v1 = this.v1 - rhs.v1;
	result.v2 = this.v2 - rhs.v2;
	
	return result;
};

// negate 'this' vector
Vec3.prototype.negate = function() {
	this.v0 *= -1;
	this.v1 *= -1;
	this.v2 *= -1;
};

// returns the cross product of 'this' vector with 'that' vector as Vec3
Vec3.prototype.cross = function( that ) {
	result = new Vec3();
	result.v0 = ( this.v1 * that.v2 ) - ( this.v2 * that.v1 );
	result.v1 = ( this.v2 * that.v0 ) - ( this.v0 * that.v2 );
	result.v2 = ( this.v0 * that.v1 ) - ( this.v1 * that.v0 );
	return result;
};

// returns the dot product of 'this' vector with 'that' vector as numeric
Vec3.prototype.dot = function( that ) {
	return (( this.v0 * that.v0 ) + ( this.v1 * that.v1 ) + ( this.v2 * that.v2 ));
};

// returns the length (length, magnitude, or norm) of 'this' vector as numeric
Vec3.prototype.length = function() {
/* 	console.log("vx = " + this.v0);
	console.log("vy = " + this.v1);
	console.log("vz = " + this.v2);
	
	console.log("sqr(vx) = " + sqr(this.v0));
	console.log("sqr(vy) = " + sqr(this.v1));
	console.log("sqr(vz) = " + sqr(this.v2)); */
	return Math.sqrt( sqr( this.v0 ) + sqr( this.v1 ) + sqr( this.v2 ));
};

// returns the unit vector as a Vec3
Vec3.prototype.unit = function(){
	result = new Vec3();
	len = this.length();
	result.v0 = this.v0 / len;
	result.v1 = this.v1 / len;
	result.v2 = this.v2 / len;
	return result;
};

// returns true if types match, false if not.
 Vec3.prototype.typematch = function( that ){
	if( that === undefined || that === null) { return false;}
	return !!( this.type === that.type);
 };

Vec3.prototype.toString = function() {
	return ("{ " + this.v0 + ", " + this.v1 + ", " + this.v2 + " }")
};

function sqr( numeric ){
	return ( numeric * numeric );
};



function sum(a, b) {return a+b;}