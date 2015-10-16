function Stabable( objectControls , vs , fs ){
  
  this.id = Math.random();

  this.inPins   = [];
  this.outPins  = [];

  this.controls = objectControls;

  this.pins = [];
  this.currentPin = 0;

  for( var i = 0; i< 20; i++){
    this.pins.push( new THREE.Vector4(0,0,0,0) );
  }

  this.iModelMat = new THREE.Matrix4();

  this.uniforms = {

    hoverPoint:{type:"v4", value: new THREE.Vector4(100000000, 0 , 0 , 0) }, 

    pins: { type:"v4v" , value : this.pins },

    t_normal : {type:"t" , value: G.t_normal },
    t_matcap : {type:"t" , value: G.t_matcap },

  }

  var mat = new THREE.ShaderMaterial({
    uniforms: this.uniforms,
    vertexShader: vs,
    fragmentShader: fs,
  });

  this.body = new THREE.Mesh( G.theme.stabGeo , mat );



  this.wireframe = new THREE.Mesh( G.theme.stabGeoWF , new THREE.MeshBasicMaterial({wireframe:true,transparent:true,opacity:.3}) );
  this.body.add( this.wireframe );

  this.body.hoverOver = this.hoverOver.bind( this );
  this.body.hoverOut = this.hoverOut.bind( this );
  this.body.update = this.move.bind( this );
  this.body.select = this.select.bind( this );
  this.body.hovering = this.hovering.bind( this );


  this.controls.add( this.body );

  this.position = this.body.position;

  scene.add( this.body );


}


Stabable.prototype.addPin = function( type , position ){

  var m = G.theme.pinOutMat;
  if( type == "in" ){ m = G.theme.pinInMat }
 
  var p = new Pin( this , type , G.theme.pinGeo , m );

 // p.relativePosition.copy( );
  p.place( position );

  p.body.lookAt( this.position );

  if( type == "in" ){

    this.inPins.push( p );
    //p.body.rotation.z =  Math.PI / 2

  }else if( type == "out" ){

    this.outPins.push( p );
    //p.body.rotation.z =  Math.PI / 2

  }


}


Stabable.prototype.place = function(p){



}

Stabable.prototype.hovering = function(p){

  var i = this.controls.getSingleIntersection( this.body );
  if( i ){

    G.v1.copy( i.point );

    G.v1.applyMatrix4( this.iModelMat );

    //G.v1.sub( this.position );

    this.uniforms.hoverPoint.value.x = G.v1.x * 1.3;
    this.uniforms.hoverPoint.value.y = G.v1.y * 1.3;
    this.uniforms.hoverPoint.value.z = G.v1.z * 1.3;
    this.uniforms.hoverPoint.value.w = 1;

  }



}


Stabable.prototype.place = function(p){

  this.position.copy( p );

  this.updatePinPositions();

}

Stabable.prototype.move = function(){

 // this.position.copy( iPoint[0].point );

 // this.updatePinPositions();

 
}

Stabable.prototype.updatePinPositions = function(){
 
 for( var i = 0; i< this.outPins.length; i++  ){
    this.outPins[i].updatePosition();
  }

  for( var i = 0; i< this.inPins.length; i++  ){
    this.inPins[i].updatePosition();
  }


}


Stabable.prototype.updatePinPositions = function(){
 
}

Stabable.prototype.select = function(){


  var i = this.controls.getSingleIntersection( this.body );
  if( i ){

    console.log( 'yup')

    G.v1.copy( i.point );

    G.v1.applyMatrix4( this.iModelMat );

    //G.v1.sub( this.position );

    var v = new THREE.Vector4();

    v.x = G.v1.x * 1.3;
    v.y = G.v1.y * 1.3;
    v.z = G.v1.z * 1.3;
    v.w = 1;



    this.pins[ this.currentPin ].copy( v );


    G.v2.x = v.x;
    G.v2.y = v.y;
    G.v2.z = v.z;

    G.v2.applyMatrix4( this.body.matrixWorld );
    G.v2.sub( this.position );


    var r = Math.random();


    if( G.activeConnection ){

      if( G.activeConnection.type == "in" ){
        this.addPin( "out" , G.v2 );
      }else{
        this.addPin( "in" , G.v2 );
      }
      
    }else{
      this.addPin( "out", G.v2)
    }
    //this.addPin( r < .5 ? "in" : "out" , G.v2 );

    this.currentPin ++;

    if( this.currentPin > 19 ){
      this.currentPin = 0.;
    }

  }




}

Stabable.prototype.hoverOver = function(){

  for( var i = 0; i< this.inPins.length; i++ ){
    this.inPins[i].hoverOver();
  }

  for( var i = 0; i< this.outPins.length; i++ ){
    this.outPins[i].hoverOver();
  }


}

Stabable.prototype.hoverOut = function(){

  this.uniforms.hoverPoint.value.w = 0;

  for( var i = 0; i< this.inPins.length; i++ ){
    this.inPins[i].hoverOut();
  }

  for( var i = 0; i< this.outPins.length; i++ ){
    this.outPins[i].hoverOut();
  }



}

Stabable.prototype.update = function(){

  this.body.updateMatrixWorld();

  this.iModelMat.getInverse( this.body.matrixWorld );



}