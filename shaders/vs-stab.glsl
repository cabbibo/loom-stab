attribute vec3 tangent;
uniform vec4 hoverPoint;

uniform vec4 pins[20];

varying vec3 vNorm;
varying vec3 vPos;
varying vec3 vTang;

varying vec2 vUv;

varying vec3 vMNorm;
varying vec3 vMPos;
varying vec3 vEye;


vec3 getRepelerPos( vec3 position , vec3 repeler , float power ){

  vec3 pos = position;

  vec3 dif = pos - repeler;

  float l = length( dif );

  dif = normalize( dif );

  float a = min( l , .1 / ( l * 30. ) );
  pos -= power  * dif * a;

  return pos;

}


vec3 getNewPos( vec3 position ){

  vec3 p = getRepelerPos( position , hoverPoint.xyz , hoverPoint.w ) - position;

  float totalEffect = hoverPoint.w;

  for( int i = 0; i< 20; i++ ){

    p += getRepelerPos( position , pins[i].xyz , pins[i].w ) - position;
    totalEffect += pins[i].w;

  }

  if( totalEffect == 0. ){
    return position;
  }else{
    return position + p;
  }



}


// Calculates the normal by taking a very small distance,
// remapping the function, and getting normal for that
vec3 getNormal( vec3 oPos , vec3 pos, vec3 tang, vec3 bino ){
 
  vec3 upTan = getNewPos(oPos+tang * .01);
  vec3 upBin = getNewPos(oPos+bino * .01);

  vec3 v1 = upTan - pos;
  vec3 v2 = upBin - pos;

  vec3 nor = cross( v1 , v2 );



  return normalize(nor);
}


void main(){

  vTang = normalize( vec3( 1. , 1. , .5 ) );

  vec3 binormal = normalize(cross( vTang , normal ));
  vec3 tang = normalize(cross( binormal , normal ));

  vTang = tang;

  vPos = getNewPos( position );
  vNorm = getNormal( position , vPos , tang , binormal );

  vMNorm = normalMatrix * vNorm;

  vMPos = ( modelMatrix * vec4(vPos,1.)).xyz;

  vUv = uv;

  vEye = normalize(cameraPosition - vMPos );


  gl_Position = projectionMatrix * modelViewMatrix * vec4( vPos , 1. );

}