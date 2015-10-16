uniform vec4 hoverPoint;
uniform sampler2D t_normal;
uniform sampler2D t_matcap;


varying vec3 vNorm;
varying vec3 vPos;
varying vec3 vTang;
varying vec2 vUv;

varying vec3 vMNorm;
varying vec3 vMPos;
varying vec3 vEye;

uniform mat4 modelViewMatrix;
uniform mat3 normalMatrix;

$uvNormalMap
$semLookup

void main(){

  vec3 fNorm = uvNormalMap( t_normal , vPos , vUv , vNorm , .6 , 1. );





  float l = length( hoverPoint.xyz - vPos ); 

  vec3 col = fNorm * .5 + .5;

  col =  texture2D( t_matcap , semLookup( vEye , fNorm , modelViewMatrix , normalMatrix ) ).xyz;

  //col = texture2D( t_normal , vUv ).xyz;
  gl_FragColor = vec4( col ,  1. );
}