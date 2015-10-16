function Pin( transform, type , geo , mat ){

  this.id = Math.random();
  this.transform = transform;

  this.type = type

  this.body = new THREE.Mesh( geo , mat )

  this.body.select = this.select.bind( this );
  this.body.hoverOver = this.hoverOver.bind( this );
  this.body.hoverOut = this.hoverOut.bind( this );

  this.position = this.body.position;
  this.relativePosition = new THREE.Vector3();


  this.transform.controls.add( this.body );


  this.connections = [];


  scene.add( this.body );


}

Pin.prototype.place = function(p){


  this.relativePosition.copy( p );

  G.v1.copy( this.transform.position );
  G.v1.add( this.relativePosition );

  this.position.copy( G.v1 );
  this.updateConnectionPositions();

}

Pin.prototype.updatePosition = function(){
  console.log('111')
  console.log( this.relativePosition );
  this.place( this.relativePosition );
}




Pin.prototype.updateConnectionPositions = function(){

  for( var i = 0; i< this.connections.length; i++  ){

    if( this.type == "out" ){
      this.connections[i].startPoint.copy( this.position );
    }else{
     this.connections[i].endPoint.copy( this.position );
    }

  }


}

Pin.prototype.hoverOver = function(){

  G.hoveredPin = this;

  intersectionPlane.position.copy( this.position )

  var col = "#f00"
  if( this.type == "in" ){ col = "#0f0" }

  for( var i = 0; i< this.connections.length; i++  ){

    this.connections[i].setColor( col );

  }


}

Pin.prototype.hoverOut = function(){

  G.hoveredPin = null;

  for( var i = 0; i< this.connections.length; i++  ){

    this.connections[i].setColor( "#fff" )

  }

}

Pin.prototype.select = function(){


  if( !G.activeConnection ){
    
    var c;


    var dir = new THREE.Vector3();
    dir.copy( this.body.position );
    dir.sub( this.transform.body.position );
    dir.normalize();
    dir.multiplyScalar( .3 );


    if( this.type == "out" ){
      c = new Catenary( this.type , G.catenarySize , G.theme.catenaryShader.vs , G.theme.catenaryShader.fs , this.body.position.clone() , null , dir );
    }else{
      c = new Catenary( this.type ,  G.catenarySize  , G.theme.catenaryShader.vs , G.theme.catenaryShader.fs , null , this.body.position.clone() , null , dir );
    }

    this.connections.push( c );

    G.connections.push( c );
    c.active = true;
    G.activeConnection = c;
    G.activePin = this;

    scene.add( c.body );


  }else{

    if( this.type !== G.activePin.type ){

      console.log( G.activePin.type )
      
      this.connections.push( G.activeConnection );


       var dir = new THREE.Vector3();
      dir.copy( this.body.position );
      dir.sub( this.transform.body.position );
      dir.normalize();
      dir.multiplyScalar( .3 )

      if( this.type == "in" ){
        G.activeConnection.endPoint.copy( this.position );
        G.activeConnection.endDir.copy( dir );
      }else{
        G.activeConnection.startPoint.copy( this.position );
        G.activeConnection.startDir.copy( dir );
      }

      G.activeConnection.active = false;
      G.activeConnection = null;
      G.activePin = null;

    }else{

      console.log('hssl')
    }

  }



}

Pin.prototype.update = function(){


}