function Transform( objectControls  ){
  
  this.id = Math.random();

  this.inPins   = [];
  this.outPins  = [];

  this.controls = objectControls;

  this.body = new THREE.Mesh( G.theme.transformGeo , G.theme.transformMat );

  this.body.hoverOver = this.hoverOver.bind( this );
  this.body.hoverOut = this.hoverOut.bind( this );
  this.body.update = this.move.bind( this );


  this.controls.add( this.body );

  this.position = this.body.position;

  scene.add( this.body );


}


Transform.prototype.addPin = function( type , position ){

  var p = new Pin( this, type , G.theme.pinGeo , G.theme.pinMat );


  if( position ){
    p.place( position );
  }else{


    if( type == "in" ){

      G.v1.x = -.4
      G.v1.z = 0
      G.v1.y = (this.inPins.length * .1 ) - .15

      p.place( G.v1 );

    }else if( type == "out" ){

      G.v1.x = .4
      G.v1.z = 0
      G.v1.y = (this.outPins.length * .1 ) - .15


      console.log( G.v1 )

      p.place( G.v1 );

    }




  }

  p.body.lookAt( this.position );

  if( type == "in" ){

    this.inPins.push( p );
    p.body.rotation.z =  Math.PI / 2

  }else if( type == "out" ){

    this.outPins.push( p );
    p.body.rotation.z =  Math.PI / 2

  }


}


Transform.prototype.place = function(p){

  this.position.copy( p );

  this.updatePinPositions();

}

Transform.prototype.move = function(){

  this.position.copy( iPoint[0].point );

  this.updatePinPositions();

 
}

Transform.prototype.updatePinPositions = function(){
 
 for( var i = 0; i< this.outPins.length; i++  ){
    this.outPins[i].updatePosition();
  }

  for( var i = 0; i< this.inPins.length; i++  ){
    this.inPins[i].updatePosition();
  }


}

Transform.prototype.hoverOver = function(){

  G.activeTransform = this;
  intersectionPlane.position.copy( this.position )

  for( var i = 0; i< this.outPins.length; i++  ){

    this.outPins[i].hoverOver("out");

  }

  for( var i = 0; i< this.inPins.length; i++  ){

     this.inPins[i].hoverOver("in");

  }

}

Transform.prototype.hoverOut = function(){

  G.activeTransform = null;

  for( var i = 0; i< this.outPins.length; i++  ){

    this.outPins[i].hoverOut();

  }

  for( var i = 0; i< this.inPins.length; i++  ){

     this.inPins[i].hoverOut();

  }

}

/*
Transform.prototype.select = function(){


  if( !G.activeConnection ){

    var c = new Catenary( 16 , shaders.vs.catenary , shaders.fs.catenary , this.body.position.clone() );

    this.outConnections.push( c );

    G.connections.push( c );
    c.active = true;
    G.activeConnection = c;
    scene.add( c.body );

  }else{

    this.inConnections.push( G.activeConnection );
    G.activeConnection.endPoint.copy( this.body.position );
    G.activeConnection.active = false;
    G.activeConnection = null;

  }



}*/

Transform.prototype.update = function(){


}