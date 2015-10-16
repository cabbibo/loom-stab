function Catenary( type , subdivisions , vs , fs , startPoint, endPoint , startDir , endDir ){
  
  this.startPoint = startPoint || new THREE.Vector3(0,0,0);
  this.endPoint   = endPoint   || new THREE.Vector3(1,0,0);

  this.startDir = startDir || new THREE.Vector3(.3,0,0);
  this.endDir   = endDir   || new THREE.Vector3(-.3,0,0);


  this.type = type;

  console.log( this.startPoint );

  this.color = new THREE.Color("#fff");

  var line = false;

  if( line ){

    var geo = this.createGeo(subdivisions);

    var mat = new THREE.ShaderMaterial({
      uniforms: {
        startPoint:       { type:"v3" , value: this.startPoint },
        endPoint:         { type:"v3" , value: this.endPoint },
        startDir:         { type:"v3" , value: this.startDir },
        endDir:           { type:"v3" , value: this.endDir },
        color:            { type:"c"  , value: this.color    },
        connectionType:   { type:"f"  , value: type == "in" ? 1 : 1 }
      },
      vertexShader: vs,
      fragmentShader: fs
    });

    this.body = new THREE.Line( geo , mat );


  }else{


    var geo = this.createTubeGeo(32);

    var mat = new THREE.ShaderMaterial({
      uniforms: {
        t_normal:         { type:"t"  , value: G.t_normal       },
        t_matcap:         { type:"t"  , value: G.t_matcap       },
        startPoint:       { type:"v3" , value: this.startPoint },
        endPoint:         { type:"v3" , value: this.endPoint },
        startDir:         { type:"v3" , value: this.startDir },
        endDir:           { type:"v3" , value: this.endDir },
        color:            { type:"c"  , value: this.color    },
        connectionType:   { type:"f"  , value: type == "in" ? 1 : 1 }
      },
      vertexShader: vs,
      fragmentShader: fs,
      //side: THREE.DoubleSide

    });

    //var mat = new THREE.MeshNormalMaterial({});

    this.body = new THREE.Mesh( geo , mat );




  }




  this.active = 0;



}


Catenary.prototype.setColor = function( color ){

  this.color.copy( new THREE.Color( color ));

}


Catenary.prototype.createGeo = function( subdivisions ){

  var geo = new THREE.BufferGeometry();

  var positions = new Float32Array( (subdivisions) * 3 );

  var pos  = new THREE.BufferAttribute( positions , 3 );

  geo.addAttribute( 'position' , pos );

  for( var i = 0; i < subdivisions; i++ ){

    positions[ i * 3 + 0 ] = i / subdivisions;
    positions[ i * 3 + 1 ] = i;
    positions[ i * 3 + 2 ] = 0;

  }
  

  return geo;

  
}


Catenary.prototype.createTubeGeo = function( subdivisions ){

  var geo = new THREE.BufferGeometry();

  var sides = 10;

  var positions = new Float32Array( subdivisions  * sides * 3 * 2 * 3);

  var pos  = new THREE.BufferAttribute( positions , 3 );

  var p1 = new THREE.Vector3();
  var p2 = new THREE.Vector3();
  var p3 = new THREE.Vector3();
  var p4 = new THREE.Vector3();

  geo.addAttribute( 'position' , pos );

  for( var i = 0; i < subdivisions; i++ ){
    
    for( var j = 0; j < sides; j++){

      var index = ( i * sides * 3 * 2 + j * 3 * 2);
      console.log( index );

      p1.set( i / subdivisions , j / sides , 0 );
      p2.set( i / subdivisions , ( j + 1 ) / sides , 0 );
      p3.set( ( i + 1 ) / subdivisions , j / sides , 0 );
      p4.set( (i+1) / subdivisions , (j+1)  / sides , 0 );

      console.log( p1 )

      positions[ index * 3 + 0 ]  = p1.x;
      positions[ index * 3 + 1 ]  = p1.y;
      positions[ index * 3 + 2 ]  = p1.z;

      positions[ index * 3 + 3 ]  = p4.x;
      positions[ index * 3 + 4 ]  = p4.y;
      positions[ index * 3 + 5 ]  = p4.z;

      positions[ index * 3 + 6 ]  = p3.x;
      positions[ index * 3 + 7 ]  = p3.y;
      positions[ index * 3 + 8 ]  = p3.z;

      positions[ index * 3 + 9 ]  = p4.x;
      positions[ index * 3 + 10 ] = p4.y;
      positions[ index * 3 + 11 ] = p4.z;

      positions[ index * 3 + 12 ] = p1.x;
      positions[ index * 3 + 13 ] = p1.y;
      positions[ index * 3 + 14 ] = p1.z;

      positions[ index * 3 + 15 ] = p2.x;
      positions[ index * 3 + 16 ] = p2.y;
      positions[ index * 3 + 17 ] = p2.z;


    }

  }
  

  return geo;

  
}



Catenary.prototype.update = function(){

  if( this.active == 1 ){

    if( this.type == "out" ){
      this.endPoint.copy( mouse.position );
    }else{
      this.startPoint.copy( mouse.position );
    }


  }

}