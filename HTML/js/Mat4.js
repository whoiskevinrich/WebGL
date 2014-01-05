/*
 * Written 12/15/2013 by Kevin Rich
 * Project:	Personal exploration of WebGL
 * File: 	Mat4.js
 * 
 * code is heavily influences by a CS Skills for Simulation and Game Programming project
 * originally written in C++
 * The Course was instructed by Mike Bailey, Oregon State University
 */
 // FLAGS
 var DEBUG = 1;
 
 // 'CONSTANTS'
 var D2R = Math.PI / 180;
 
 // Class Prototype
 var Mat4 = function( a,b,c,d,e,f,g,h,i,j,k,l,n,o,p,q ){
	// initialize 4x4 matrix

	this.m = new Array();
	
	// we use 'row' here to avoid changing argument values
	for( row = 0; row < 4; row++ )
		this.m[row] = new Array();
	
	if( a === undefined ){
		this.setIdentity();
	} else {
		if(DEBUG){
			if( isNaN(a) ||	isNaN(b) || isNaN(c) || isNaN(d) ||
				isNaN(e) || isNaN(f) || isNaN(g) || isNaN(h) ||
				isNaN(i) || isNaN(j) || isNaN(k) || isNaN(l) ||
				isNaN(n) || isNaN(o) || isNaN(p) || isNaN(q) )
			{ 
				throw new Error("arguments can be undefined or numeric when creating Mat4"); 
			}
		}
		
		this.m[0][0] = a;
		this.m[0][1] = b;
		this.m[0][2] = c;
		this.m[0][3] = d;
		
		this.m[1][0] = e;
		this.m[1][1] = f;
		this.m[1][2] = g;
		this.m[1][3] = h;
	
		this.m[2][0] = i;
		this.m[2][1] = j;
		this.m[2][2] = k;
		this.m[2][3] = l;
		
		this.m[3][0] = n;
		this.m[3][1] = o;
		this.m[3][2] = p;
		this.m[3][3] = q;
	}
	
	this.type = "Mat4";
 }
 
 Mat4.prototype.setIdentity = function(){
	for( i = 0; i < 4; i++ )
		for( j = 0; j < 4; j++ )
			i == j ? this.m[i][j]=1 : this.m[i][j] = 0;
 };
 
 Mat4.prototype.typematch = function( that ){
	if( that === undefined || that === null) { return false;}
	return !!( this.type === that.type);
 };
 
 Mat4.prototype.setEqual = function( that ){
	if (!( this.typematch( that ))) {throw new Error("Invalid type; must be Mat4");}
	for( i in this.m )
		for( j in this.m[i] )
			this.m[i][j] = that.m[i][j];
			
	return;
 };
 
 Mat4.prototype.multiply = function ( that ){
	if( that.type == "Vec3" ){
		result = new Vec3();
		
		console.log ("this----------------:");
		console.log (this);
		
		console.log ("that----------------:");
		console.log (that);
		
		result.v0 = ( this.m[0][0] * that.v0 ) + ( this.m[0][1] * that.v1 ) + ( this.m[0][2] * that.v2 ) + ( this.m[0][3] );
		result.v1 = ( this.m[1][0] * that.v0 ) + ( this.m[1][1] * that.v1 ) + ( this.m[1][2] * that.v2 ) + ( this.m[1][3] );
		
		console.log ("this.m[2][0]: "this.m[2][0]);
		result.v2 = ( this.m[2][0] * that.v0 ) + ( this.m[2][1] * that.v1 ) + ( this.m[2][2] * that.v2 ) + ( this.m[2][3] );
				
		console.log ("result----------------:");
		console.log (result);

		return result;
	}
	
	if (that.type == "Mat4" ){
		result = new Mat4();
		
		for( i = 0; i < 4; i++ ){
			for( j = 0; j < 4; j++ ){
				result.m[i][j] = 0;
				for( k = 0; k < 4; k++){
					result.m[i][j] += this.m[i][k] * that.m[k][j];
				}
			}
		}
		
		return result;
	}
	
	throw new Error("multiply() arg must be Mat4 or Vec3");
	
	return;
 };